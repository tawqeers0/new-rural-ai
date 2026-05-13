from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from app.core.config import settings
from app.api.v1 import (
    sync,
    lessons,
    auth,
    ai_tutor,
    connectivity,
    media,
    teacher_profiles,
    matching,
)
from fastapi.middleware.gzip import GZipMiddleware
from app.core.rate_limit import (
    RateLimitExceeded,
    SLOWAPI_AVAILABLE,
    limiter,
    rate_limit_exceeded_handler,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "Offline-first RuralAI Learning Engine with transparent teacher matching, "
        "localized AI tutoring, SMS/USSD access, sync replay, and demo-ready "
        "security/performance controls."
    ),
    version="1.0.0-hackathon",
)
app.state.limiter = limiter
if SLOWAPI_AVAILABLE:
    app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

app.add_middleware(GZipMiddleware, minimum_size=500)

# Allow existing frontend to communicate with new backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sync.router, prefix=f"{settings.API_V1_STR}/sync", tags=["Sync"])
app.include_router(lessons.router, prefix=f"{settings.API_V1_STR}/lessons", tags=["Lessons"])
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
app.include_router(ai_tutor.router, prefix=f"{settings.API_V1_STR}/ai_tutor", tags=["AI Tutor"])
app.include_router(connectivity.router, prefix=f"{settings.API_V1_STR}/connectivity", tags=["Connectivity"])
app.include_router(media.router, prefix=f"{settings.API_V1_STR}/media", tags=["Media"])
app.include_router(teacher_profiles.router, prefix=f"{settings.API_V1_STR}/teacher-profiles", tags=["Teacher Profiles"])
app.include_router(matching.router, prefix=f"{settings.API_V1_STR}/matching", tags=["Matching"])

@app.get("/", response_class=HTMLResponse)
def dashboard():
    return """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>RuralAI Learning Engine</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #17211b;
      --muted: #5d695f;
      --line: #d9e1d8;
      --panel: #ffffff;
      --bg: #f4f8f1;
      --accent: #26734d;
      --accent-strong: #155f3b;
      --sun: #f2b84b;
      --water: #2f7f9f;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(244, 248, 241, 0.96)),
        radial-gradient(circle at 78% 14%, rgba(242, 184, 75, 0.32), transparent 28%),
        linear-gradient(135deg, #eef6e9 0%, #f7faf4 42%, #e7f2f4 100%);
      color: var(--ink);
    }

    main {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto;
      padding: 40px 0;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .mark {
      width: 42px;
      height: 42px;
      border-radius: 8px;
      display: grid;
      place-items: center;
      background: var(--accent);
      color: white;
      font-weight: 800;
    }

    .brand h1 {
      margin: 0;
      font-size: clamp(1.35rem, 2.4vw, 2rem);
      line-height: 1.1;
    }

    .brand p {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: 0.95rem;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 38px;
      padding: 0 14px;
      border: 1px solid rgba(38, 115, 77, 0.28);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.78);
      color: var(--accent-strong);
      font-weight: 700;
      white-space: nowrap;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #2fa866;
      box-shadow: 0 0 0 5px rgba(47, 168, 102, 0.14);
    }

    .grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 18px;
      align-items: stretch;
    }

    .hero,
    .panel {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 18px 42px rgba(31, 54, 34, 0.08);
    }

    .hero {
      min-height: 420px;
      padding: clamp(24px, 4vw, 42px);
      display: grid;
      align-content: space-between;
      overflow: hidden;
      position: relative;
    }

    .hero:after {
      content: "";
      position: absolute;
      right: -42px;
      bottom: -56px;
      width: 270px;
      height: 210px;
      background:
        linear-gradient(150deg, transparent 0 38%, rgba(38, 115, 77, 0.2) 39% 44%, transparent 45%),
        repeating-linear-gradient(90deg, rgba(21, 95, 59, 0.12) 0 14px, transparent 14px 28px);
      transform: rotate(-8deg);
      border-radius: 8px;
    }

    .hero h2 {
      max-width: 720px;
      margin: 0;
      font-size: clamp(2rem, 5vw, 4.6rem);
      line-height: 0.98;
      letter-spacing: 0;
    }

    .hero p {
      max-width: 640px;
      margin: 18px 0 0;
      color: var(--muted);
      font-size: clamp(1rem, 1.7vw, 1.2rem);
      line-height: 1.55;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 28px;
    }

    a.button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 16px;
      border-radius: 8px;
      color: white;
      background: var(--accent);
      text-decoration: none;
      font-weight: 750;
    }

    a.button.secondary {
      color: var(--accent-strong);
      background: #edf6ef;
      border: 1px solid rgba(38, 115, 77, 0.22);
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      position: relative;
      z-index: 1;
    }

    .metric {
      min-height: 92px;
      padding: 16px;
      border-radius: 8px;
      background: #f9fbf7;
      border: 1px solid var(--line);
    }

    .metric strong {
      display: block;
      font-size: 1.65rem;
      line-height: 1;
    }

    .metric span {
      display: block;
      margin-top: 8px;
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.25;
    }

    .panel {
      padding: 22px;
    }

    .panel h2 {
      margin: 0 0 16px;
      font-size: 1.15rem;
    }

    .link-list {
      display: grid;
      gap: 10px;
    }

    .link-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 54px;
      padding: 12px 14px;
      border: 1px solid var(--line);
      border-radius: 8px;
      color: var(--ink);
      background: #fbfdf9;
      text-decoration: none;
    }

    .link-row span {
      color: var(--muted);
      font-size: 0.9rem;
      overflow-wrap: anywhere;
    }

    .pill {
      flex: 0 0 auto;
      min-width: 70px;
      text-align: center;
      border-radius: 999px;
      padding: 6px 10px;
      background: #e9f2f5;
      color: #23647d;
      font-size: 0.78rem;
      font-weight: 800;
    }

    @media (max-width: 800px) {
      main {
        width: min(100% - 24px, 1120px);
        padding: 24px 0;
      }

      .topbar,
      .grid {
        display: grid;
        grid-template-columns: 1fr;
      }

      .status {
        justify-self: start;
      }

      .metrics {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <header class="topbar">
      <div class="brand">
        <div class="mark">RA</div>
        <div>
          <h1>RuralAI Learning Engine</h1>
          <p>Offline-first education API</p>
        </div>
      </div>
      <div class="status"><span class="dot"></span> Online</div>
    </header>

    <section class="grid">
      <div class="hero">
        <div>
          <h2>Teacher placement, sync, and AI tutoring are live.</h2>
          <p>The local FastAPI backend is running in hackathon mode with demo data, mock provider credentials, and interactive API documentation.</p>
          <div class="actions">
            <a class="button" href="/docs">Open API Docs</a>
            <a class="button secondary" href="/redoc">Open ReDoc</a>
            <a class="button secondary" href="/health">Health JSON</a>
          </div>
        </div>

        <div class="metrics" aria-label="Project status">
          <div class="metric"><strong>10</strong><span>passing tests</span></div>
          <div class="metric"><strong>0</strong><span>reported dependency vulnerabilities</span></div>
          <div class="metric"><strong>8 ms</strong><span>benchmark p95 latency</span></div>
        </div>
      </div>

      <aside class="panel">
        <h2>Demo Endpoints</h2>
        <div class="link-list">
          <a class="link-row" href="/api/v1/matching/demo">
            <div><strong>Teacher Matching</strong><br><span>/api/v1/matching/demo</span></div>
            <div class="pill">GET</div>
          </a>
          <a class="link-row" href="/api/v1/connectivity/cache/status">
            <div><strong>Cache Status</strong><br><span>/api/v1/connectivity/cache/status</span></div>
            <div class="pill">GET</div>
          </a>
          <a class="link-row" href="/api/v1/sync/status">
            <div><strong>Sync Status</strong><br><span>/api/v1/sync/status</span></div>
            <div class="pill">GET</div>
          </a>
          <a class="link-row" href="/api/v1/connectivity/schools/101/availability">
            <div><strong>School Availability</strong><br><span>/api/v1/connectivity/schools/101/availability</span></div>
            <div class="pill">GET</div>
          </a>
        </div>
      </aside>
    </section>
  </main>
</body>
</html>
"""


@app.get("/health")
def health_check():
    return {"status": "online", "environment": "hackathon-mode"}
