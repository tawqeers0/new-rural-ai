from uuid import uuid4

from fastapi.testclient import TestClient

from app.core.rate_limit import SLOWAPI_AVAILABLE
from app.main import app


client = TestClient(app)


def test_teacher_profile_escapes_xss_payloads():
    response = client.post(
        "/api/v1/teacher-profiles/",
        json={
            "teacher_id": "tch-sec-1",
            "full_name": "Meena Rao",
            "phone_number": "+919999999998",
            "district": "Mayurbhanj",
            "subjects": ["Math"],
            "bio": "<script>alert('xss')</script> Patient rural educator",
        },
    )

    body = response.json()

    assert response.status_code == 200
    assert body["teacher_id"] == "TCH-SEC-1"
    assert "<script>" not in body["bio"]
    assert "&lt;script&gt;" in body["bio"]
    assert body["sanitized"] is True


def test_teacher_profile_rejects_sql_injection_payloads():
    response = client.post(
        "/api/v1/teacher-profiles/",
        json={
            "teacher_id": "tch-sec-2",
            "full_name": "Robert'); DROP TABLE teachers;--",
            "phone_number": "+919999999997",
            "district": "Barmer",
            "subjects": ["Hindi"],
            "bio": "Teacher",
        },
    )

    assert response.status_code == 422


def test_auth_login_rate_limit_blocks_brute_force_attempts():
    if not SLOWAPI_AVAILABLE:
        return

    headers = {"x-forwarded-for": f"test-client-{uuid4()}"}
    payload = {"email": "teacher@example.com", "password": "wrong-pass"}

    for _ in range(5):
        response = client.post("/api/v1/auth/login", json=payload, headers=headers)
        assert response.status_code == 401

    limited_response = client.post("/api/v1/auth/login", json=payload, headers=headers)

    assert limited_response.status_code == 429
