from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_matching_endpoint_explains_pqtr_weighted_decision():
    response = client.get("/api/v1/matching/teachers/SL-TCH-001")

    body = response.json()
    recommended = body["recommended_match"]

    assert response.status_code == 200
    assert body["teacher_id"] == "SL-TCH-001"
    assert recommended["pqtr"] >= 70
    assert recommended["factors"]
    assert "PQTR" in recommended["explanation"]
    assert "weighted sum" in body["transparency_note"]
    assert "urban placements" in body["bias_mitigation_note"]
