from pydantic import BaseModel

class LessonSchema(BaseModel):
    id: int
    title: str
    content_url: str
    grade: int
