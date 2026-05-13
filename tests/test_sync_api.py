from fastapi.testclient import TestClient

from app.api.v1 import sync
from app.main import app


client = TestClient(app)


def setup_function():
    sync.sync_logs.clear()
    sync.action_ids_seen.clear()
    sync.progress_state.clear()


def test_push_sync_actions_is_idempotent_for_retries():
    action = {
        "id": "action-1",
        "action_type": "lesson_complete",
        "payload": {
            "student_id": "student-1",
            "lesson_id": "lesson-1",
            "status": "completed",
            "score": 82,
        },
        "timestamp": "2026-05-12T08:00:00Z",
        "device_id": "device-a",
    }

    first_response = client.post("/api/v1/sync/push", json={"actions": [action]})
    retry_response = client.post("/api/v1/sync/push", json={"actions": [action]})

    assert first_response.status_code == 200
    assert first_response.json()["actions_applied"] == 1
    assert retry_response.status_code == 200
    assert retry_response.json()["duplicates"] == 1
    assert retry_response.json()["actions_applied"] == 0

    status_response = client.get("/api/v1/sync/status")
    assert status_response.json() == {
        "total_actions_synced": 1,
        "unique_actions": 1,
        "progress_records": 1,
    }


def test_push_sync_actions_keeps_newest_progress_state():
    newest_action = {
        "id": "action-new",
        "action_type": "quiz_submission",
        "payload": {
            "student_id": "student-1",
            "lesson_id": "lesson-1",
            "score": 91,
        },
        "timestamp": "2026-05-12T09:00:00Z",
        "device_id": "device-a",
    }
    stale_action = {
        "id": "action-old",
        "action_type": "quiz_submission",
        "payload": {
            "student_id": "student-1",
            "lesson_id": "lesson-1",
            "score": 43,
        },
        "timestamp": "2026-05-12T08:00:00Z",
        "device_id": "device-b",
    }

    client.post("/api/v1/sync/push", json={"actions": [newest_action]})
    stale_response = client.post("/api/v1/sync/push", json={"actions": [stale_action]})

    body = stale_response.json()
    assert stale_response.status_code == 200
    assert body["status"] == "partial_success"
    assert body["stale_actions"] == 1
    assert body["conflicts"][0]["resolution"] == "kept_existing"

    checkpoint_response = client.get("/api/v1/sync/pull")
    progress = checkpoint_response.json()["progress"]
    assert progress[0]["score"] == 91
    assert progress[0]["student_id"] == "student-1"
    assert progress[0]["lesson_id"] == "lesson-1"
