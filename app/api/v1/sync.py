from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter

from app.models.schemas import (
    ActionType,
    StudentProgress,
    SyncAction,
    SyncActionResult,
    SyncConflict,
    SyncPullResponse,
    SyncPushRequest,
    SyncPushResponse,
)

router = APIRouter()

# In-memory mock storage for the demo
# In production, this would go to Supabase/PostgreSQL
sync_logs: list[SyncAction] = []
action_ids_seen: set[str] = set()
progress_state: dict[str, StudentProgress] = {}


def _progress_key(payload: dict[str, Any]) -> str | None:
    student_id = payload.get("student_id")
    lesson_id = payload.get("lesson_id")
    if not student_id or not lesson_id:
        return None
    return f"{student_id}:{lesson_id}"


def _progress_from_action(action: SyncAction) -> StudentProgress | None:
    if action.action_type not in {
        ActionType.LESSON_COMPLETE,
        ActionType.QUIZ_SUBMISSION,
        ActionType.PROGRESS_UPDATE,
    }:
        return None

    if not isinstance(action.payload, dict):
        return None

    student_id = action.payload.get("student_id")
    lesson_id = action.payload.get("lesson_id")
    if not student_id or not lesson_id:
        return None

    completed = bool(
        action.payload.get("completed")
        or action.payload.get("status") in {"completed", "complete"}
        or action.action_type == ActionType.LESSON_COMPLETE
    )

    return StudentProgress(
        student_id=str(student_id),
        lesson_id=str(lesson_id),
        score=action.payload.get("score"),
        completed=completed,
        last_updated=action.timestamp,
    )

@router.post("/push", response_model=SyncPushResponse)
async def push_sync_actions(request: SyncPushRequest):
    """
    Action Replay Sync: Accepts a queue of actions from the offline client.
    Implements idempotent replay and Last Write Wins based on the client-side
    timestamp so retries from low-connectivity devices are safe.
    """
    results: list[SyncActionResult] = []
    conflicts: list[SyncConflict] = []
    applied = 0
    duplicates = 0
    stale_actions = 0

    for action in request.actions:
        if action.id in action_ids_seen:
            duplicates += 1
            results.append(
                SyncActionResult(
                    action_id=action.id,
                    status="duplicate",
                    message="Action already replayed; no state change applied.",
                )
            )
            continue

        action_ids_seen.add(action.id)
        sync_logs.append(action)

        if not isinstance(action.payload, dict):
            results.append(
                SyncActionResult(
                    action_id=action.id,
                    status="ignored",
                    message="Action stored for audit but payload was not progress-shaped.",
                )
            )
            continue

        key = _progress_key(action.payload)
        next_progress = _progress_from_action(action)
        if not key or not next_progress:
            results.append(
                SyncActionResult(
                    action_id=action.id,
                    status="ignored",
                    message="Action stored for audit but no student progress fields were found.",
                )
            )
            continue

        current_progress = progress_state.get(key)
        if current_progress and action.timestamp < current_progress.last_updated:
            stale_actions += 1
            conflicts.append(
                SyncConflict(
                    action_id=action.id,
                    resource_id=key,
                    existing_timestamp=current_progress.last_updated,
                    incoming_timestamp=action.timestamp,
                    resolution="kept_existing",
                )
            )
            results.append(
                SyncActionResult(
                    action_id=action.id,
                    status="stale",
                    message="Older action kept for audit; latest progress state was preserved.",
                )
            )
            continue

        if current_progress:
            conflicts.append(
                SyncConflict(
                    action_id=action.id,
                    resource_id=key,
                    existing_timestamp=current_progress.last_updated,
                    incoming_timestamp=action.timestamp,
                    resolution="accepted_incoming",
                )
            )

        progress_state[key] = next_progress
        applied += 1
        results.append(
            SyncActionResult(
                action_id=action.id,
                status="applied",
                message="Action applied to the latest progress state.",
            )
        )

    sync_logs.sort(key=lambda x: x.timestamp)

    return SyncPushResponse(
        status="success" if stale_actions == 0 else "partial_success",
        actions_processed=len(request.actions),
        actions_applied=applied,
        duplicates=duplicates,
        stale_actions=stale_actions,
        conflicts=conflicts,
        results=results,
    )

@router.get("/status")
async def get_sync_status():
    return {
        "total_actions_synced": len(sync_logs),
        "unique_actions": len(action_ids_seen),
        "progress_records": len(progress_state),
    }


@router.get("/pull", response_model=SyncPullResponse)
async def pull_sync_checkpoint():
    """
    Returns the current server-side checkpoint that offline clients can cache
    after a successful replay.
    """
    server_time = datetime.now(timezone.utc)
    return SyncPullResponse(
        server_time=server_time,
        checkpoint=server_time.isoformat(),
        total_actions_synced=len(sync_logs),
        progress=list(progress_state.values()),
    )
