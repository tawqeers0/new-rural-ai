from datetime import datetime, timezone

from app.models.schemas import TeacherProfileRequest, TeacherProfileResponse


teacher_profiles: dict[str, TeacherProfileResponse] = {}


class TeacherProfileService:
    def upsert_profile(self, profile: TeacherProfileRequest) -> TeacherProfileResponse:
        response = TeacherProfileResponse(
            **profile.model_dump(),
            saved_at=datetime.now(timezone.utc),
        )
        teacher_profiles[profile.teacher_id] = response
        return response

    def get_profile(self, teacher_id: str) -> TeacherProfileResponse | None:
        return teacher_profiles.get(teacher_id.strip().upper())


teacher_profile_service = TeacherProfileService()
