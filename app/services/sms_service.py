import logging
from typing import Any

from app.core.config import settings
from app.models.schemas import SMSDeliveryResponse

try:
    import africastalking
except Exception:
    africastalking = None


logger = logging.getLogger(__name__)


class SMSService:
    def __init__(self):
        self._initialized = False
        self._mock_mode = (
            africastalking is None
            or not settings.AT_API_KEY
            or "placeholder" in settings.AT_API_KEY
        )

    def _initialize_provider(self):
        if self._mock_mode or self._initialized:
            return None

        africastalking.initialize(settings.AT_USERNAME, settings.AT_API_KEY)
        self._initialized = True
        return africastalking.SMS

    def send_assignment_alert(
        self,
        phone_number: str,
        school_name: str,
        teacher_name: str | None = None,
    ) -> SMSDeliveryResponse:
        greeting = f"Hi {teacher_name}, " if teacher_name else ""
        message = (
            f"{greeting}RuralEd Alert: You have been matched with {school_name}. "
            "Log in or use USSD to confirm."
        )

        if self._mock_mode:
            return SMSDeliveryResponse(
                status="mock_sent",
                message=message,
                phone_number=phone_number,
                provider_response={
                    "reason": "Africa's Talking is not configured; demo mode used.",
                },
            )

        try:
            sms = self._initialize_provider()
            provider_response: Any = sms.send(
                message,
                [phone_number],
                sender_id=settings.AT_SENDER_ID,
            )
            return SMSDeliveryResponse(
                status="sent",
                message=message,
                phone_number=phone_number,
                provider_response=provider_response,
            )
        except Exception as exc:
            logger.exception("Failed to send Africa's Talking SMS")
            return SMSDeliveryResponse(
                status="failed",
                message=message,
                phone_number=phone_number,
                provider_response={"error": str(exc)},
            )


sms_service = SMSService()
