from __future__ import annotations

from app.data.demo_seed import DEMO_SCHOOLS, DEMO_TEACHERS
from app.models.schemas import MatchingFactor, SchoolMatch, TeacherMatchResponse


class MatchingService:
    weights = {
        "qualification": 0.30,
        "rural_need": 0.30,
        "language_context": 0.20,
        "teacher_preference": 0.10,
        "equity_boost": 0.10,
    }

    def match_teacher(self, teacher_id: str) -> TeacherMatchResponse:
        teacher = self._find_teacher(teacher_id)
        matches = sorted(
            [self._score_school(teacher, school) for school in DEMO_SCHOOLS],
            key=lambda match: match.score,
            reverse=True,
        )
        return TeacherMatchResponse(
            teacher_id=teacher["teacher_id"],
            teacher_name=teacher["name"],
            burnout_risk=teacher["burnout_risk"],
            recommended_match=matches[0],
            alternatives=matches[1:],
            transparency_note=(
                "The score is a visible weighted sum of qualification fit, PQTR rural "
                "shortage, language/context fit, teacher preference, and an equity boost."
            ),
            bias_mitigation_note=(
                "High-PQTR rural schools receive explicit weighting so urban placements "
                "do not silently dominate the matching queue."
            ),
        )

    def demo_matches(self) -> list[TeacherMatchResponse]:
        return [self.match_teacher(teacher["teacher_id"]) for teacher in DEMO_TEACHERS]

    def _find_teacher(self, teacher_id: str):
        normalized = teacher_id.strip().upper()
        for teacher in DEMO_TEACHERS:
            if teacher["teacher_id"].upper() == normalized:
                return teacher
        return DEMO_TEACHERS[0]

    def _score_school(self, teacher, school) -> SchoolMatch:
        teacher_subjects = set(teacher["subjects"])
        school_subjects = set(school["subjects_needed"])
        subject_overlap = len(teacher_subjects & school_subjects)
        qualification = subject_overlap / max(len(school_subjects), 1)
        rural_need = min(school["pqtr"] / 90, 1.0)
        language_context = 1.0 if teacher["country"] == school["country"] else 0.65
        teacher_preference = 1.0 if teacher["prefers_rural"] else 0.45
        equity_boost = school["hardship_index"]

        raw_factors = {
            "qualification": qualification,
            "rural_need": rural_need,
            "language_context": language_context,
            "teacher_preference": teacher_preference,
            "equity_boost": equity_boost,
        }
        factors = [
            MatchingFactor(
                name=name,
                weight=self.weights[name],
                value=round(value, 3),
                contribution=round(value * self.weights[name], 3),
            )
            for name, value in raw_factors.items()
        ]
        score = round(sum(factor.contribution for factor in factors) * 100, 2)
        explanation = (
            f"{teacher['name']} matches {school['name']} because the school has "
            f"PQTR {school['pqtr']}, needs {', '.join(school['subjects_needed'])}, "
            f"and the transparent score is {score}/100."
        )
        return SchoolMatch(
            school_id=school["school_id"],
            school_name=school["name"],
            country=school["country"],
            district=school["district"],
            score=score,
            pqtr=school["pqtr"],
            factors=factors,
            explanation=explanation,
        )


matching_service = MatchingService()
