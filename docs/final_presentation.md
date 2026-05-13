# Final Presentation

## Winning Narrative

RuralAI is not just a backend. It is a fairness engine for education access.

The demo should open with the problem: rural schools wait months for qualified teachers while learners lose continuity, confidence, and trust in the system. Then show how the platform turns that process into a transparent, seconds-level workflow.

## Demo Flow

1. Open Swagger UI and show the health endpoint.
2. Run `GET /api/v1/matching/demo`.
3. Show the PQTR-weighted explanation for the top match.
4. Ask the AI tutor a textbook question in `hi-IN`.
5. Send a mock SMS assignment alert.
6. Show the USSD placement lookup for a feature-phone user.
7. Show `PHASE8_REPORT.md` for tests, Safety, and Locust performance.

## Human Impact Pillars

Matching fairness:

- PQTR makes shortage visible.
- Rural hardship receives explicit weighting.
- Each match returns factors and explanations, reducing black-box decisions.

AI empathetic alliance:

- The tutor answers from approved textbook context.
- Responses use warm, simple language.
- The system can support both learners and teachers in low-resource settings.

Inclusive accessibility:

- SMS assignment alerts work without smartphones.
- USSD menus support basic phones.
- Gzip, Redis caching, and WebP media reduce low-bandwidth friction.

## Ethics And Sustainability

Data sovereignty:

- Teacher records are validated and sanitized.
- Secrets are environment-driven.
- Demo data can be restored from a cold standby seed.

Algorithmic transparency:

- Matching scores expose every factor and weight.
- Judges can inspect why one school was recommended over another.

Bias mitigation:

- Rural PQTR and hardship weighting prevent urban-first matching.
- Alternatives are visible so decisions can be reviewed.

## Impact Visualization

| Metric | Baseline | With RuralEd Platform |
| --- | --- | --- |
| Placement speed | Months, manual review | Seconds, transparent algorithm |
| Teacher attrition | 9.06% baseline | Projected 30% reduction through support |
| Content creation | Hours, manual | Minutes, AI-assisted |
| Access channel | Smartphone required | Web, SMS, and USSD |
