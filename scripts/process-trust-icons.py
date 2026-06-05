#!/usr/bin/env python3
"""Normalize trust section icons: transparent bg, centered on a square canvas."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
BLACK_THRESHOLD = 45
TARGET_SIZE = 512
# Match visual weight of the trusted shield inside the card circle
CONTENT_FILL = 0.88

ICONS = [
    "trust-trusted.png",
    "trust-secure.png",
    "trust-affordable.png",
]


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


def crop_to_content(img: Image.Image, padding: int = 4) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    return img.crop((left, top, right, bottom))


def center_visible_pixels(img: Image.Image) -> Image.Image:
    """Shift layer so the opaque bounding box sits in the canvas center."""
    bbox = img.getbbox()
    if not bbox:
        return img

    left, top, right, bottom = bbox
    bw = right - left
    bh = bottom - top
    dx = (img.width - bw) // 2 - left
    dy = (img.height - bh) // 2 - top
    if dx == 0 and dy == 0:
        return img

    centered = Image.new("RGBA", img.size, (0, 0, 0, 0))
    centered.paste(img, (dx, dy), img)
    return centered


def normalize_icon(img: Image.Image) -> Image.Image:
    """Center artwork on a square transparent canvas at consistent scale."""
    img = remove_black_bg(img)
    img = crop_to_content(img)

    w, h = img.size
    if w == 0 or h == 0:
        return img

    content_max = int(TARGET_SIZE * CONTENT_FILL)
    scale = content_max / max(w, h)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    x = (TARGET_SIZE - nw) // 2
    y = (TARGET_SIZE - nh) // 2
    canvas.paste(img, (x, y), img)
    return center_visible_pixels(canvas)


def main() -> None:
    for name in ICONS:
        path = ASSETS / name
        if not path.exists():
            print(f"Skip (missing): {name}")
            continue
        img = Image.open(path)
        img = normalize_icon(img)
        img.save(path, "PNG", optimize=True)
        print(f"Processed {name} -> {img.size[0]}x{img.size[1]} (normalized)")


if __name__ == "__main__":
    main()
