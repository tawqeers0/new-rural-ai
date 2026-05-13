from __future__ import annotations

import json
import time
from dataclasses import dataclass
from datetime import date, datetime
from typing import Any, Callable

from app.core.config import settings

try:
    import redis
except Exception:
    redis = None


def _json_default(value: Any):
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    raise TypeError(f"Object of type {type(value).__name__} is not JSON serializable")


@dataclass
class CacheLookup:
    data: Any
    hit: bool
    backend: str


class CacheManager:
    def __init__(self):
        self._memory_cache: dict[str, tuple[float, str]] = {}
        self._redis_client = None
        self._redis_failed = False

    @property
    def backend(self) -> str:
        return "redis" if self._get_redis_client() is not None else "memory"

    def _get_redis_client(self):
        if redis is None or self._redis_failed:
            return None
        if self._redis_client is None:
            try:
                client = redis.from_url(
                    settings.REDIS_URL,
                    decode_responses=True,
                    socket_connect_timeout=0.2,
                    socket_timeout=0.2,
                )
                client.ping()
                self._redis_client = client
            except Exception:
                self._redis_failed = True
                self._redis_client = None
        return self._redis_client

    def get_json(self, key: str) -> Any | None:
        redis_client = self._get_redis_client()
        if redis_client is not None:
            try:
                raw = redis_client.get(key)
                return json.loads(raw) if raw else None
            except Exception:
                self._redis_failed = True

        cached = self._memory_cache.get(key)
        if not cached:
            return None

        expires_at, raw = cached
        if expires_at < time.time():
            self._memory_cache.pop(key, None)
            return None
        return json.loads(raw)

    def set_json(self, key: str, value: Any, ttl_seconds: int | None = None) -> None:
        ttl = ttl_seconds or settings.CACHE_TTL_SECONDS
        raw = json.dumps(value, default=_json_default)
        redis_client = self._get_redis_client()
        if redis_client is not None:
            try:
                redis_client.setex(key, ttl, raw)
                return
            except Exception:
                self._redis_failed = True

        self._memory_cache[key] = (time.time() + ttl, raw)

    def get_or_set(
        self, key: str, loader: Callable[[], Any], ttl_seconds: int | None = None
    ) -> CacheLookup:
        cached = self.get_json(key)
        if cached is not None:
            return CacheLookup(data=cached, hit=True, backend=self.backend)

        data = loader()
        self.set_json(key, data, ttl_seconds)
        return CacheLookup(data=data, hit=False, backend=self.backend)

    def delete(self, key: str) -> None:
        redis_client = self._get_redis_client()
        if redis_client is not None:
            try:
                redis_client.delete(key)
            except Exception:
                self._redis_failed = True
        self._memory_cache.pop(key, None)

    def health(self) -> dict[str, Any]:
        return {
            "backend": self.backend,
            "redis_available": self._get_redis_client() is not None,
            "memory_keys": len(self._memory_cache),
            "ttl_seconds": settings.CACHE_TTL_SECONDS,
        }


cache = CacheManager()
