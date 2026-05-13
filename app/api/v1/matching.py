from fastapi import APIRouter

from app.models.schemas import TeacherMatchResponse
from app.services.matching_service import matching_service

router = APIRouter()


@router.get(
    "/demo",
    response_model=list[TeacherMatchResponse],
    summary="Run transparent PQTR-weighted demo matching",
)
async def get_demo_matches():
    return matching_service.demo_matches()


@router.get(
    "/teachers/{teacher_id}",
    response_model=TeacherMatchResponse,
    summary="Explain the best school match for one teacher",
)
async def get_teacher_match(teacher_id: str):
    return matching_service.match_teacher(teacher_id)
