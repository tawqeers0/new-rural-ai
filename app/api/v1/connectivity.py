from urllib.parse import parse_qs

from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse

from app.core.cache import cache
from app.models.schemas import (
    AssignmentAlertRequest,
    CacheHealthResponse,
    SchoolAvailabilityResponse,
    SMSDeliveryResponse,
    TeacherStatusResponse,
)
from app.services.placement_service import placement_service
from app.services.sms_service import sms_service

router = APIRouter()


@router.post("/assignment-alert", response_model=SMSDeliveryResponse)
async def send_assignment_alert(request: AssignmentAlertRequest):
    return sms_service.send_assignment_alert(
        phone_number=request.phone_number,
        school_name=request.school_name,
        teacher_name=request.teacher_name,
    )


@router.post("/ussd", response_class=PlainTextResponse)
async def handle_ussd_callback(request: Request):
    raw_body = (await request.body()).decode()
    form_data = {
        key: values[0] for key, values in parse_qs(raw_body, keep_blank_values=True).items()
    }
    text = form_data.get("text") or request.query_params.get("text") or ""
    return PlainTextResponse(placement_service.build_ussd_response(text))


@router.get(
    "/schools/{school_id}/availability",
    response_model=SchoolAvailabilityResponse,
)
async def get_school_availability(school_id: int):
    lookup = placement_service.get_school_availability(school_id)
    return {
        **lookup.data,
        "served_from_cache": lookup.hit,
        "cache_backend": lookup.backend,
    }


@router.get(
    "/teachers/{teacher_id}/status",
    response_model=TeacherStatusResponse,
)
async def get_teacher_status(teacher_id: str):
    lookup = placement_service.get_teacher_status(teacher_id)
    return {
        **lookup.data,
        "served_from_cache": lookup.hit,
        "cache_backend": lookup.backend,
    }


@router.get("/cache/status", response_model=CacheHealthResponse)
async def get_cache_status():
    return cache.health()
