"""
Generate a soft, low-saturation, bright looping background video.
Drifting blurred color blobs (sage / clay / dusty blue / soft gold) over a warm cream base.
Output: public/hero.mp4 (H.264, yuv420p, faststart, seamless loop)
"""
import numpy as np
from PIL import Image, ImageFilter
import os

W, H = 1600, 900
FPS = 25
SECONDS = 8
FRAMES = FPS * SECONDS

# warm cream base (low saturation, bright)
BASE = np.array([246, 244, 239], dtype=np.float32)

# muted accent colors (R,G,B)
COLORS = [
    np.array([140, 155, 126], dtype=np.float32),  # sage
    np.array([196, 154, 130], dtype=np.float32),  # clay
    np.array([146, 167, 176], dtype=np.float32),  # dusty blue
    np.array([214, 196, 150], dtype=np.float32),  # soft gold
    np.array([176, 168, 186], dtype=np.float32),  # muted lavender
]

# blob params: center base (fraction), orbit radius (fraction), sigma (fraction of min dim), strength
np.random.seed(7)
BLOBS = []
for c in COLORS:
    BLOBS.append({
        "color": c,
        "cx0": np.random.uniform(0.15, 0.85),
        "cy0": np.random.uniform(0.15, 0.85),
        "rx": np.random.uniform(0.10, 0.28),
        "ry": np.random.uniform(0.10, 0.28),
        "sigma": np.random.uniform(0.22, 0.34),
        "strength": np.random.uniform(0.30, 0.50),
        "phase": np.random.uniform(0, 2 * np.pi),
        "speed": float(np.random.choice([1, 2])),  # integer -> seamless loop
    })

yg, xg = np.mgrid[0:H, 0:W]
xg = xg / W
yg = yg / H
min_dim = min(W, H)

def render_frame(t):
    img = BASE.copy()
    for b in BLOBS:
        ang = b["phase"] + 2 * np.pi * (t / FRAMES) * b["speed"]
        cx = b["cx0"] + b["rx"] * np.cos(ang)
        cy = b["cy0"] + b["ry"] * np.sin(ang * 1.3 + b["phase"])
        dx = (xg - cx)
        dy = (yg - cy)
        d2 = dx * dx + dy * dy
        sigma = b["sigma"]
        infl = np.exp(-d2 / (2 * sigma * sigma))
        img = img + b["color"] * infl[..., None] * b["strength"]
    img = np.clip(img, 0, 255).astype(np.uint8)
    pil = Image.fromarray(img, "RGB")
    pil = pil.filter(ImageFilter.GaussianBlur(radius=18))
    # subtle film grain for a refined, non-flat texture
    noise = np.random.normal(0, 3.0, (H, W, 1)).astype(np.float32)
    arr = np.clip(np.array(pil).astype(np.float32) + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")

os.makedirs("public", exist_ok=True)
tmp = "public/_frames"
os.makedirs(tmp, exist_ok=True)

for f in range(FRAMES):
    im = render_frame(f)
    im.save(f"{tmp}/f{int(f):04d}.png")

print("frames rendered:", FRAMES)
