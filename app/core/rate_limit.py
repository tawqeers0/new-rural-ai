from fastapi.responses import JSONResponse

try:
    from slowapi import Limiter, _rate_limit_exceeded_handler
    from slowapi.errors import RateLimitExceeded
    from slowapi.util import get_remote_address

    SLOWAPI_AVAILABLE = True
except Exception:
    Limiter = None
    RateLimitExceeded = None
    _rate_limit_exceeded_handler = None
    get_remote_address = None
    SLOWAPI_AVAILABLE = False


def _rate_limit_key(request):
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return get_remote_address(request)


class NoOpLimiter:
    def limit(self, *_args, **_kwargs):
        def decorator(func):
            return func

        return decorator


limiter = Limiter(key_func=_rate_limit_key) if SLOWAPI_AVAILABLE else NoOpLimiter()


async def fallback_rate_limit_handler(_request, _exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded. Please try again later."},
    )


rate_limit_exceeded_handler = (
    _rate_limit_exceeded_handler if SLOWAPI_AVAILABLE else fallback_rate_limit_handler
)
