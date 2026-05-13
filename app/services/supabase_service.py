from supabase import create_client, Client
from app.core.config import settings

class SupabaseManager:
    def __init__(self):
        try:
            self.client: Client = create_client(
                settings.SUPABASE_URL, 
                settings.SUPABASE_KEY
            )
        except Exception:
            self.client = None

    async def fetch_lessons(self, grade: int):
        # Mock data fallback for demonstration if Supabase is not configured
        if not self.client or "placeholder" in str(settings.SUPABASE_URL):
            return type('obj', (object,), {
                'data': [
                    {"id": 1, "title": f"Math Grade {grade}: Intro to Division", "content_url": "https://example.com/math1.mp4", "grade": grade},
                    {"id": 2, "title": f"Reading Grade {grade}: Short Stories", "content_url": "https://example.com/read1.mp4", "grade": grade}
                ]
            })
            
        # Optimized query to reduce data transfer
        return self.client.table("lessons")\
           .select("id, title, content_url")\
           .eq("grade", grade)\
           .execute()

db_manager = SupabaseManager()
