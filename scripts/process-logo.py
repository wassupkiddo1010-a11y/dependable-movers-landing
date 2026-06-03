#!/usr/bin/env python3
"""Remove black background from logo and export transparent PNG + favicon."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
LOGO_IN = ASSETS / "logo.png"
LOGO_OUT = ASSETS / "logo.png"
FAVICON_OUT = ASSETS / "favicon.png"

# Pixels this close to black become transparent
BLACK_THRESHOLD = 40


def remove_black_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r <= BLACK_THRESHOLD and g <= BLACK_THRESHOLD and b <= BLACK_THRESHOLD:
                pixels[x, y] = (r, g, b, 0)

    return img


def crop_to_content(img: Image.Image, padding: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    return img.crop((left, top, right, bottom))


def make_favicon(img: Image.Image, size: int = 64) -> Image.Image:
    fav = img.copy()
    fav.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - fav.width) // 2
    y = (size - fav.height) // 2
    canvas.paste(fav, (x, y), fav)
    return canvas


def main() -> None:
    img = Image.open(LOGO_IN)
    img = remove_black_bg(img)
    img = crop_to_content(img, padding=4)
    img.save(LOGO_OUT, "PNG", optimize=True)

    favicon = make_favicon(img, 64)
    favicon.save(FAVICON_OUT, "PNG", optimize=True)
    print(f"Saved transparent logo ({img.size[0]}x{img.size[1]}) and favicon")


if __name__ == "__main__":
    main()
