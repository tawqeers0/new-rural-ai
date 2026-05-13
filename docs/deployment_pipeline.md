# Deployment Pipeline

## Local Container Run

```bash
docker compose up --build
```

The API is then available at:

```text
http://localhost:8000
```

## CI/CD

GitHub Actions workflow:

```text
.github/workflows/ci-cd.yml
```

Pipeline behavior:

- Runs `pytest -q` on pull requests and pushes to `main`.
- Runs `safety check -r requirements.txt --full-report`.
- Builds a Docker image for every successful pipeline.
- Publishes a GHCR image on version tags such as `v1.0.0`.
- Runs the Terraform deployment job only when `ENABLE_CLOUD_DEPLOY=true`.

## Blue-Green Deployment

The Kubernetes manifests keep two deployment colors:

- `blue`: current production slot.
- `green`: next release slot.

Traffic is switched by changing the service selector in:

```text
infra/k8s/service.yaml
```

Rollback is the same operation in reverse: point the service selector back to the previous color.

## Cold Standby Database

For the hackathon demo:

- Keep a read-only backup dataset ready in Supabase/Postgres.
- Run the seed script before the demo to restore known teacher/school shortages.
- Treat Redis and ChromaDB as disposable caches; persistent recovery comes from Postgres/Supabase data.

## Live URL

This workspace does not include cloud credentials, so the live production URL is assigned by the chosen provider after the tag deploy. Record it in the `live_url` Terraform variable/output once provisioned.
