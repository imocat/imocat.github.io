(() => {
  "use strict";

  // TODO: App Store URL — the only App Store destination constant.
  const APP_STORE_URL = "#";
  document.querySelectorAll("[data-appstore-link]").forEach((link) => {
    link.setAttribute("href", APP_STORE_URL);
  });

  const root = document.documentElement;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pending = false;

  function paintSky() {
    pending = false;
    const distance = root.scrollHeight - window.innerHeight;
    const progress = motion.matches || distance <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / distance));
    root.style.setProperty("--noon-opacity", String(Math.min(1, progress * 2.2)));
    root.style.setProperty("--evening-opacity", String(Math.max(0, (progress - 0.45) / 0.55)));
  }

  function queuePaint() {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(paintSky);
    }
  }

  if (document.body.hasAttribute("data-scroll-sky")) {
    window.addEventListener("scroll", queuePaint, { passive: true });
    window.addEventListener("resize", queuePaint, { passive: true });
    window.addEventListener("pageshow", queuePaint);
    motion.addEventListener("change", queuePaint);
    paintSky();
  }
})();
