from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    PROJECT_NAME: str = "RuralAI-Learning-Engine"
    API_V1_STR: str = "/api/v1"
    SUPABASE_URL: str = "placeholder://supabase"
    SUPABASE_KEY: str = "placeholder"
    OPENAI_API_KEY: str = "placeholder"

    AT_USERNAME: str = "sandbox"
    AT_API_KEY: str = "placeholder"
    AT_SENDER_ID: str = "RuralEd"

    REDIS_URL: str = "redis://localhost:6379/0"
    CACHE_TTL_SECONDS: int = 300
    USSD_SESSION_TTL_SECONDS: int = 600
    IMAGE_CACHE_TTL_SECONDS: int = 86400
    AUTH_RATE_LIMIT: str = "5/minute"
    PROFILE_RATE_LIMIT: str = "20/minute"

    # Low-bandwidth optimization flag
    LOW_BANDWIDTH_MODE: bool = True

settings = Settings()
