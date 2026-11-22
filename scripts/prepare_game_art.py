#!/usr/bin/env python3
"""Bundle three Steam-supplied screenshots per public game for offline My Games cards.

This runs at APK build time. It never touches the user's local Genesis data.
HELIX is an original project and intentionally has no invented Steam listing.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode
import json

OUT = Path("app/src/main/assets/game-art")
GAMES = {
    "ark": 2399830,
    "7d2d": 251570,
    "gta": 271590,
    "rdr2": 1174180,
    "fs22": 1248130,
}
HEADERS = {"User-Agent": "GenesisOfflineAssetBuilder/0.6 (game art cache)"}

def fetch(url, limit=2_500_000):
    request = Request(url, headers=HEADERS)
    with urlopen(request, timeout=16) as response:
        content_type = response.headers.get("Content-Type", "")
        data = response.read(limit + 1)
    if len(data) > limit:
        raise ValueError("asset too large")
    return data, content_type

def get_screenshots(app_id):
    params = urlencode({"appids": app_id, "filters": "screenshots"})
    url = "https://store.steampowered.com/api/appdetails?" + params
    data, _ = fetch(url, 400_000)
    record = json.loads(data).get(str(app_id), {})
    if not record.get("success"):
        raise ValueError("Steam API did not return an app")
    return [row["path_full"] for row in record["data"].get("screenshots", []) if row.get("path_full")]

def write_image(key, slot, sources):
    for url in sources:
        try:
            data, kind = fetch(url)
            if not data.startswith(b"\xff\xd8\xff") and not data.startswith(b"\x89PNG"):
                raise ValueError("not a JPEG/PNG image: " + kind)
            # WebView decodes by content sniffing even if Steam supplies PNG.
            dest = OUT / f"{key}-{slot}.jpg"
            dest.write_bytes(data)
            print(f"{key} artwork {slot}: {len(data)} bytes")
            return True
        except Exception as exc:
            print(f"Artwork fallback for {key}/{slot}: {exc}")
    return False

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for key, app in GAMES.items():
        try:
            screenshots = get_screenshots(app)
        except Exception as exc:
            screenshots = []
            print(f"Steam screenshots unavailable for {key}: {exc}")
        for slot in range(1, 4):
            fallback = [
                f"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{app}/{name}"
                for name in ("header.jpg", "library_hero.jpg", "capsule_616x353.jpg")
            ]
            preferred = screenshots[slot - 1:slot] if len(screenshots) >= slot else []
            if write_image(key, slot, preferred + fallback[slot-1:] + fallback[:slot-1]):
                total += 1
    print(f"Bundled {total}/15 official game images for offline display")
    if total < 15:
        print("WARNING: Some artwork was unavailable; online fallback and game title will remain usable.")

if __name__ == "__main__":
    main()
