from fastapi import APIRouter

from app.models.schemas import AITutorRequest, AITutorResponse
from app.services.ai_service import ai_service

router = APIRouter()

@router.post("/ask")
async def ask_tutor(query: str, grade: int = 3):
    return await ai_service.generate_tutoring_response(query, grade)

@router.post("/ask-ai", response_model=AITutorResponse)
async def ask_ai_tutor(request: AITutorRequest):
    return await ai_service.ask_question(
        question=request.question,
        locale=request.locale,
        grade=request.grade,
    )
