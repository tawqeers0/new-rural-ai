from fastapi.testclient import TestClient

from app.core.cache import cache
from app.main import app
from app.services.sms_service import sms_service


client = TestClient(app)


def test_assignment_alert_uses_mock_sms_without_provider_credentials():
    sms_service._mock_mode = True

    response = client.post(
        "/api/v1/connectivity/assignment-alert",
        json={
            "phone_number": "+919999999999",
            "school_name": "Kalinga Rural Primary School",
            "teacher_name": "Anita",
        },
    )

    body = response.json()

    assert response.status_code == 200
    assert body["status"] == "mock_sent"
    assert "Kalinga Rural Primary School" in body["message"]
    assert body["provider"] == "africas_talking"


def test_school_availability_is_cached_after_first_request():
    cache.delete("school:101:availability")

    first_response = client.get("/api/v1/connectivity/schools/101/availability")
    second_response = client.get("/api/v1/connectivity/schools/101/availability")

    assert first_response.status_code == 200
    assert second_response.status_code == 200
    assert first_response.json()["served_from_cache"] is False
    assert second_response.json()["served_from_cache"] is True
    assert second_response.json()["open_positions"] == 2


def test_ussd_teacher_status_menu_returns_plain_text_status():
    response = client.post(
        "/api/v1/connectivity/ussd",
        content="sessionId=abc&serviceCode=*123%23&phoneNumber=%2B919999999999&text=1*TCH-1001",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/plain")
    assert "END Status: matched" in response.text
    assert "Kalinga Rural Primary School" in response.text
