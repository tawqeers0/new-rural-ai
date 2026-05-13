from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_ask_ai_returns_warm_rag_answer_with_sources():
    response = client.post(
        "/api/v1/ai_tutor/ask-ai",
        json={
            "question": "What is a variable?",
            "grade": 3,
            "locale": "hi-IN",
        },
    )

    body = response.json()

    assert response.status_code == 200
    assert "According to" in body["answer"]
    assert body["locale"] == "hi-IN"
    assert body["retrieval_mode"] in {"chromadb", "local_fallback"}
    assert body["bhashini_mode"] == "mock"
    assert body["sources"]
    assert body["sources"][0]["board"] in {"NCERT", "State Board"}
