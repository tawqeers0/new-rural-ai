from fastapi import APIRouter, HTTPException, Request

from app.core.config import settings
from app.core.rate_limit import limiter
from app.core.security import sanitize_identifier
from app.models.schemas import TeacherProfileRequest, TeacherProfileResponse
from app.services.teacher_profile_service import teacher_profile_service

router = APIRouter()


@router.post("/", response_model=TeacherProfileResponse)
@limiter.limit(settings.PROFILE_RATE_LIMIT)
async def upsert_teacher_profile(request: Request, profile: TeacherProfileRequest):
    return teacher_profile_service.upsert_profile(profile)


@router.get("/{teacher_id}", response_model=TeacherProfileResponse)
async def get_teacher_profile(teacher_id: str):
    profile = teacher_profile_service.get_profile(sanitize_identifier(teacher_id))
    if not profile:
        raise HTTPException(status_code=404, detail="Teacher profile not found")
    return profile
