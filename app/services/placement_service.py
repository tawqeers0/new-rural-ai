from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from app.core.cache import CacheLookup, cache
from app.core.config import settings


SCHOOL_AVAILABILITY: dict[int, dict[str, Any]] = {
    101: {
        "school_id": 101,
        "school_name": "Kalinga Rural Primary School",
        "district": "Mayurbhanj",
        "state": "Odisha",
        "open_positions": 2,
        "subjects_needed": ["Mathematics", "EVS"],
        "last_updated": datetime(2026, 5, 12, 8, 30, tzinfo=timezone.utc),
    },
    202: {
        "school_id": 202,
        "school_name": "Thar Learning Centre",
        "district": "Barmer",
        "state": "Rajasthan",
        "open_positions": 1,
        "subjects_needed": ["Hindi"],
        "last_updated": datetime(2026, 5, 12, 8, 45, tzinfo=timezone.utc),
    },
}

TEACHER_STATUS: dict[str, dict[str, Any]] = {
    "TCH-1001": {
        "teacher_id": "TCH-1001",
        "teacher_name": "Anita Sharma",
        "status": "matched",
        "matched_school": "Kalinga Rural Primary School",
        "district": "Mayurbhanj",
        "next_step": "Reply through the app or USSD to confirm placement.",
        "last_updated": datetime(2026, 5, 12, 9, 0, tzinfo=timezone.utc),
    },
    "TCH-2002": {
        "teacher_id": "TCH-2002",
        "teacher_name": "Ramesh Patil",
        "status": "travel_scheduled",
        "matched_school": "Thar Learning Centre",
        "district": "Barmer",
        "next_step": "Travel schedule has been shared by SMS.",
        "last_updated": datetime(2026, 5, 12, 9, 10, tzinfo=timezone.utc),
    },
}


class PlacementService:
    def get_school_availability(self, school_id: int) -> CacheLookup:
        return cache.get_or_set(
            f"school:{school_id}:availability",
            lambda: self._load_school_availability(school_id),
            settings.CACHE_TTL_SECONDS,
        )

    def get_teacher_status(self, teacher_id: str) -> CacheLookup:
        normalized_id = teacher_id.strip().upper()
        return cache.get_or_set(
            f"teacher:{normalized_id}:status",
            lambda: self._load_teacher_status(normalized_id),
            settings.CACHE_TTL_SECONDS,
        )

    def _load_school_availability(self, school_id: int) -> dict[str, Any]:
        school = SCHOOL_AVAILABILITY.get(school_id)
        if school:
            return school
        return {
            "school_id": school_id,
            "school_name": "Unknown School",
            "district": "Not available",
            "state": "Not available",
            "open_positions": 0,
            "subjects_needed": [],
            "last_updated": datetime.now(timezone.utc),
        }

    def _load_teacher_status(self, teacher_id: str) -> dict[str, Any]:
        status = TEACHER_STATUS.get(teacher_id)
        if status:
            return status
        return {
            "teacher_id": teacher_id,
            "teacher_name": "Unknown Teacher",
            "status": "pending",
            "matched_school": None,
            "district": None,
            "next_step": "No placement match is available yet. Please check again later.",
            "last_updated": datetime.now(timezone.utc),
        }

    def build_ussd_response(self, text: str) -> str:
        parts = [part for part in text.split("*") if part]
        if not parts:
            return (
                "CON RuralEd Services\n"
                "1. Teacher placement status\n"
                "2. School availability"
            )

        if parts[0] == "1":
            if len(parts) == 1:
                return "CON Enter your teacher ID"
            status = self.get_teacher_status(parts[1]).data
            return (
                f"END Status: {status['status']}\n"
                f"School: {status.get('matched_school') or 'Not matched yet'}\n"
                f"Next: {status['next_step']}"
            )

        if parts[0] == "2":
            if len(parts) == 1:
                return "CON Enter school ID"
            try:
                school_id = int(parts[1])
            except ValueError:
                return "END Invalid school ID. Please try again with numbers only."
            school = self.get_school_availability(school_id).data
            subjects = ", ".join(school["subjects_needed"]) or "None"
            return (
                f"END {school['school_name']}\n"
                f"Open positions: {school['open_positions']}\n"
                f"Subjects: {subjects}"
            )

        return "END Invalid option. Please dial again and choose 1 or 2."


placement_service = PlacementService()
