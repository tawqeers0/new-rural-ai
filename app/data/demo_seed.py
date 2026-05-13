from __future__ import annotations

from typing import Any


DEMO_TEACHERS: list[dict[str, Any]] = [
    {
        "teacher_id": "SL-TCH-001",
        "name": "Aminata Kamara",
        "country": "Sierra Leone",
        "subjects": ["Mathematics", "Science"],
        "languages": ["English", "Krio"],
        "prefers_rural": True,
        "burnout_risk": 0.31,
    },
    {
        "teacher_id": "KE-TCH-014",
        "name": "Grace Wanjiku",
        "country": "Kenya",
        "subjects": ["English", "Social Studies"],
        "languages": ["English", "Swahili"],
        "prefers_rural": False,
        "burnout_risk": 0.18,
    },
    {
        "teacher_id": "KE-TCH-022",
        "name": "Daniel Otieno",
        "country": "Kenya",
        "subjects": ["Mathematics", "Agriculture"],
        "languages": ["English", "Swahili", "Dholuo"],
        "prefers_rural": True,
        "burnout_risk": 0.27,
    },
]


DEMO_SCHOOLS: list[dict[str, Any]] = [
    {
        "school_id": "SL-SCH-101",
        "name": "Kono Rural Junior Secondary",
        "country": "Sierra Leone",
        "district": "Kono",
        "subjects_needed": ["Mathematics", "Science"],
        "pqtr": 83,
        "hardship_index": 0.82,
        "internet_reliability": "2G intermittent",
    },
    {
        "school_id": "KE-SCH-202",
        "name": "Turkana Girls Learning Centre",
        "country": "Kenya",
        "district": "Turkana",
        "subjects_needed": ["Mathematics", "Agriculture"],
        "pqtr": 71,
        "hardship_index": 0.77,
        "internet_reliability": "SMS first",
    },
    {
        "school_id": "KE-SCH-303",
        "name": "Nakuru Township Primary",
        "country": "Kenya",
        "district": "Nakuru",
        "subjects_needed": ["English", "Social Studies"],
        "pqtr": 38,
        "hardship_index": 0.29,
        "internet_reliability": "4G",
    },
]
