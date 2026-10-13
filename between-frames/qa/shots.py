"""Screenshot web pages (desktop 1440x900 and mobile 390x844) and report errors, broken images, overflow."""
import pathlib, sys
from playwright.sync_api import sync_playwright
WEB = pathlib.Path(__file__).resolve().parent.parent
EXE = pathlib.Path.home() / "Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
pages = sys.argv[1:]
out = WEB / "qa" / "shots"; out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=str(EXE) if EXE.exists() else None)
    for rel in pages:
        name = rel.replace("/", "_").removesuffix(".html")
        for tag, vp in (("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})):
            pg = b.new_page(viewport=vp)
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto((WEB / rel).as_uri()); pg.wait_for_timeout(700)
            pg.screenshot(path=str(out / f"{name}-{tag}.png"))
            # Scroll through the page so lazy images load and reveal animations finish.
            h = pg.evaluate("document.body.scrollHeight")
            for y in range(0, h, 400):
                pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(40)
            pg.wait_for_timeout(1200); pg.evaluate("scrollTo(0,0)"); pg.wait_for_timeout(300)
            pg.screenshot(path=str(out / f"{name}-{tag}-full.png"), full_page=True)
            broken = pg.evaluate("[...document.images].filter(i=>i.complete && !i.naturalWidth).map(i=>i.src)")
            ow = pg.evaluate("document.documentElement.scrollWidth - innerWidth")
            print(rel, tag, "errors", errs, "broken", broken, "overflow", ow)
            pg.close()
    b.close()
