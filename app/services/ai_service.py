from __future__ import annotations

import math
import re
from hashlib import sha256
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from app.core.config import settings
from app.models.schemas import AITutorResponse, CurriculumSource

try:
    import chromadb
except Exception:
    chromadb = None

try:
    from langchain_openai import ChatOpenAI
except Exception:
    ChatOpenAI = None


@dataclass(frozen=True)
class CurriculumChunk:
    source_id: str
    title: str
    chapter: str
    board: str
    grade: int
    text: str


CURRICULUM_CHUNKS = [
    CurriculumChunk(
        source_id="ncert-math-g3-ch3-variables",
        title="NCERT Mathematics Grade 3",
        chapter="Chapter 3: Patterns and Variables",
        board="NCERT",
        grade=3,
        text=(
            "A variable is a symbol or empty place that can hold different values. "
            "Children can think of a variable as an empty basket. If the basket has "
            "mangoes today and guavas tomorrow, the basket stays the same but the "
            "number inside can change."
        ),
    ),
    CurriculumChunk(
        source_id="ncert-math-g3-ch4-division",
        title="NCERT Mathematics Grade 3",
        chapter="Chapter 4: Sharing and Division",
        board="NCERT",
        grade=3,
        text=(
            "Division means sharing equally. If 12 seeds are shared equally among "
            "3 farmers, each farmer gets 4 seeds. The same idea helps students check "
            "whether groups have the same number of objects."
        ),
    ),
    CurriculumChunk(
        source_id="state-evs-g4-water",
        title="State Board EVS Grade 4",
        chapter="Chapter 2: Water in Our Village",
        board="State Board",
        grade=4,
        text=(
            "Water is used for drinking, cooking, farming, and keeping animals healthy. "
            "Students should observe local wells, ponds, and hand pumps to understand "
            "why saving clean water matters."
        ),
    ),
    CurriculumChunk(
        source_id="ncert-science-g5-plants",
        title="NCERT Science Grade 5",
        chapter="Chapter 5: Seeds and Plants",
        board="NCERT",
        grade=5,
        text=(
            "A seed needs air, water, and warmth to grow into a plant. Farmers prepare "
            "soil carefully because healthy soil helps roots take in water and nutrients."
        ),
    ),
]


class SimpleEmbeddingFunction:
    """Small deterministic embedding function for offline Chroma demos."""

    def __init__(self, dimensions: int = 64):
        self.dimensions = dimensions

    def __call__(self, input: list[str]) -> list[list[float]]:
        return [self._embed(text) for text in input]

    def embed_query(self, input: list[str]) -> list[list[float]]:
        return self.__call__(input)

    @staticmethod
    def name() -> str:
        return "ruralai_simple_hash_v1"

    @staticmethod
    def build_from_config(config: dict[str, Any]) -> "SimpleEmbeddingFunction":
        return SimpleEmbeddingFunction(dimensions=int(config.get("dimensions", 64)))

    def get_config(self) -> dict[str, Any]:
        return {"dimensions": self.dimensions}

    def default_space(self) -> str:
        return "cosine"

    def supported_spaces(self) -> list[str]:
        return ["cosine", "l2", "ip"]

    def validate_config_update(
        self, old_config: dict[str, Any], new_config: dict[str, Any]
    ) -> None:
        return None

    @staticmethod
    def validate_config(config: dict[str, Any]) -> None:
        return None

    def is_legacy(self) -> bool:
        return False

    def _embed(self, text: str) -> list[float]:
        vector = [0.0] * self.dimensions
        for token in _tokens(text):
            bucket = int(sha256(token.encode("utf-8")).hexdigest(), 16) % self.dimensions
            vector[bucket] += 1.0
        length = math.sqrt(sum(value * value for value in vector)) or 1.0
        return [value / length for value in vector]


def _tokens(text: str) -> list[str]:
    return re.findall(r"[a-zA-Z0-9]+", text.lower())


def _score(query: str, chunk: CurriculumChunk) -> float:
    query_terms = Counter(_tokens(query))
    chunk_terms = Counter(_tokens(chunk.text + " " + chunk.chapter + " " + chunk.title))
    if not query_terms or not chunk_terms:
        return 0.0
    overlap = sum(min(query_terms[token], chunk_terms[token]) for token in query_terms)
    grade_bonus = 0.15 if f"grade {chunk.grade}" in query.lower() else 0.0
    return overlap / math.sqrt(sum(query_terms.values())) + grade_bonus


class BhashiniTranslator:
    """
    Mock Bhashini boundary.

    The live API can be placed here later without changing the tutor service
    contract. For now it marks the target locale and preserves meaning.
    """

    async def translate(self, text: str, locale: str) -> str:
        if locale.lower() in {"en", "en-in"}:
            return text
        language = {
            "hi-in": "Hindi",
            "mr-in": "Marathi",
            "or-in": "Odia",
            "raj-in": "Rajasthani",
        }.get(locale.lower(), locale)
        return f"[{language} support via Bhashini mock] {text}"


class AITutor:
    def __init__(self):
        self.translator = BhashiniTranslator()
        self.persist_directory = Path("./chroma_db_phase6")
        self.collection = None
        self.retrieval_mode = "local_fallback"
        self.llm = self._build_llm()
        self._initialize_vector_store()

    def _build_llm(self):
        if ChatOpenAI is None:
            return None
        if not settings.OPENAI_API_KEY or "placeholder" in settings.OPENAI_API_KEY:
            return None
        return ChatOpenAI(model="gpt-4-turbo", temperature=0.3)

    def _initialize_vector_store(self) -> None:
        if chromadb is None:
            return

        try:
            client = chromadb.PersistentClient(path=str(self.persist_directory))
            self.collection = client.get_or_create_collection(
                name="approved_curriculum_v2",
                embedding_function=SimpleEmbeddingFunction(),
                metadata={"description": "Approved textbook chunks for RuralAI RAG"},
            )
        except Exception:
            self.collection = None
            self.retrieval_mode = "local_fallback"
            return

        existing_ids = set(self.collection.get().get("ids", []))
        chunks_to_add = [
            chunk for chunk in CURRICULUM_CHUNKS if chunk.source_id not in existing_ids
        ]
        if chunks_to_add:
            self.collection.add(
                ids=[chunk.source_id for chunk in chunks_to_add],
                documents=[chunk.text for chunk in chunks_to_add],
                metadatas=[
                    {
                        "title": chunk.title,
                        "chapter": chunk.chapter,
                        "board": chunk.board,
                        "grade": chunk.grade,
                    }
                    for chunk in chunks_to_add
                ],
            )
        self.retrieval_mode = "chromadb"

    def _retrieve_local(self, question: str, grade: int, limit: int = 2) -> list[CurriculumChunk]:
        eligible = [
            chunk for chunk in CURRICULUM_CHUNKS if chunk.grade == grade
        ] or CURRICULUM_CHUNKS
        ranked = sorted(eligible, key=lambda chunk: _score(question, chunk), reverse=True)
        return ranked[:limit]

    def _retrieve_chroma(self, question: str, grade: int, limit: int = 2) -> list[CurriculumChunk]:
        if self.collection is None:
            return self._retrieve_local(question, grade, limit)

        results: dict[str, Any] = self.collection.query(
            query_texts=[question],
            n_results=limit,
            where={"grade": grade},
        )
        ids = results.get("ids", [[]])[0]
        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        chunks: list[CurriculumChunk] = []
        for source_id, document, metadata in zip(ids, documents, metadatas):
            chunks.append(
                CurriculumChunk(
                    source_id=source_id,
                    title=metadata["title"],
                    chapter=metadata["chapter"],
                    board=metadata["board"],
                    grade=int(metadata["grade"]),
                    text=document,
                )
            )
        return chunks or self._retrieve_local(question, grade, limit)

    def _human_warmth_prompt(self, question: str, locale: str, chunks: list[CurriculumChunk]) -> str:
        context = "\n".join(
            f"- {chunk.title}, {chunk.chapter}: {chunk.text}" for chunk in chunks
        )
        return (
            "You are a patient rural school teacher. Answer only from the approved "
            "textbook context. Use short sentences, a warm tone, and a local farming "
            "or village example when useful. If the context is not enough, say what "
            "is missing instead of guessing.\n"
            f"Locale: {locale}\n"
            f"Approved context:\n{context}\n"
            f"Student question: {question}"
        )

    async def _generate_answer(
        self, question: str, locale: str, chunks: list[CurriculumChunk]
    ) -> str:
        if not chunks:
            return "I could not find this in the approved textbook notes yet."

        prompt = self._human_warmth_prompt(question, locale, chunks)
        if self.llm is not None:
            response = await self.llm.ainvoke(prompt)
            return str(response.content)

        primary = chunks[0]
        answer = (
            f"According to {primary.chapter} of {primary.title}, "
            f"{primary.text} "
            "Think of it through a nearby village example, then try one small problem "
            "in your notebook."
        )
        return await self.translator.translate(answer, locale)

    async def ask_question(
        self, question: str, locale: str = "hi-IN", grade: int = 3
    ) -> AITutorResponse:
        chunks = (
            self._retrieve_chroma(question, grade)
            if self.retrieval_mode == "chromadb"
            else self._retrieve_local(question, grade)
        )
        answer = await self._generate_answer(question, locale, chunks)
        return AITutorResponse(
            answer=answer,
            locale=locale,
            retrieval_mode=self.retrieval_mode,
            sources=[
                CurriculumSource(
                    source_id=chunk.source_id,
                    title=chunk.title,
                    chapter=chunk.chapter,
                    board=chunk.board,
                    grade=chunk.grade,
                    snippet=chunk.text[:220],
                )
                for chunk in chunks
            ],
        )

    async def generate_tutoring_response(self, student_query: str, grade: int):
        response = await self.ask_question(student_query, locale="hi-IN", grade=grade)
        return response.model_dump()


ai_service = AITutor()
