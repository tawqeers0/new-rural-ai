from __future__ import annotations

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.core.config import settings
from app.data.demo_seed import DEMO_SCHOOLS, DEMO_TEACHERS
from app.services.supabase_service import db_manager


def main():
    if not db_manager.client or "placeholder" in settings.SUPABASE_URL:
        print("Demo mode: Supabase is not configured.")
        print(f"Teachers ready: {len(DEMO_TEACHERS)}")
        print(f"Schools ready: {len(DEMO_SCHOOLS)}")
        print("Sample teacher:", DEMO_TEACHERS[0])
        print("Sample school:", DEMO_SCHOOLS[0])
        return

    db_manager.client.table("demo_teachers").upsert(DEMO_TEACHERS).execute()
    db_manager.client.table("demo_schools").upsert(DEMO_SCHOOLS).execute()
    print("Seeded demo_teachers and demo_schools in Supabase.")


if __name__ == "__main__":
    main()
