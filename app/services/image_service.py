from io import BytesIO

import httpx

try:
    from PIL import Image
except Exception:
    Image = None


class ImageOptimizationService:
    async def fetch_as_webp(
        self,
        source_url: str,
        width: int = 480,
        quality: int = 72,
    ) -> bytes:
        if Image is None:
            raise RuntimeError("Pillow is required for adaptive image serving.")

        async with httpx.AsyncClient(timeout=8.0, follow_redirects=True) as client:
            response = await client.get(source_url)
            response.raise_for_status()

        image = Image.open(BytesIO(response.content))
        image.thumbnail((width, width * 4))

        output = BytesIO()
        image.save(output, format="WEBP", quality=quality, method=6)
        return output.getvalue()


image_service = ImageOptimizationService()
