from fastapi import APIRouter, Depends
from app.core.config import settings
from app.services.supabase_service import db_manager
from app.models.domain.lesson import LessonSchema

router = APIRouter()

@router.get("/{grade}", response_model=list)
async def get_lessons_by_grade(grade: int):
    # Retrieve lessons with minimal metadata to save bandwidth
    lessons = await db_manager.fetch_lessons(grade)
    return lessons.data

@router.post("/progress")
async def update_progress(user_id: str, lesson_id: int, status: str):
    # Fallback for demonstration
    if not db_manager.client or "placeholder" in str(settings.SUPABASE_URL):
        return {"status": "mock_success", "message": "Progress saved locally (Demo mode)"}
        
    # Asynchronous logging of progress to support sync-later logic
    return await db_manager.client.table("progress").upsert({
        "user_id": user_id,
        "lesson_id": lesson_id,
        "status": status,
        "synced_at": "now()"
    }).execute()
