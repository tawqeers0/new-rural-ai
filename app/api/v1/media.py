from fastapi import APIRouter, HTTPException, Query, Response

from app.core.config import settings
from app.services.image_service import image_service

router = APIRouter()


@router.get("/adaptive-image")
async def get_adaptive_image(
    source_url: str = Query(..., description="Original image URL"),
    width: int = Query(480, ge=120, le=1280),
    quality: int = Query(72, ge=35, le=90),
):
    try:
        image_bytes = await image_service.fetch_as_webp(
            source_url=source_url,
            width=width,
            quality=quality,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Unable to optimize source image") from exc

    return Response(
        content=image_bytes,
        media_type="image/webp",
        headers={
            "Cache-Control": f"public, max-age={settings.IMAGE_CACHE_TTL_SECONDS}",
        },
    )
