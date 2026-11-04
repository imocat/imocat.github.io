(() => {
  document.querySelectorAll('[data-language]').forEach((link) => {
    link.addEventListener('click', () => {
      try { localStorage.setItem('fasting-language', link.dataset.language); } catch { /* Links also work without storage. */ }
      // Keep a visitor at the same section when changing the landing-page language.
      if (document.body.dataset.page === 'index') {
        const url = new URL(link.href);
        url.hash = location.hash;
        link.href = url.href;
      }
    });
  });

  const demo = document.querySelector('[data-rhythm]');
  if (demo) {
    const locale = document.documentElement.lang;
    const start = demo.querySelector('input[type="time"]');
    const formatTime = (minutes) => new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(2026, 0, 1, Math.floor(minutes / 60), minutes % 60));
    const hoursFormat = new Intl.NumberFormat(locale, { style: 'unit', unit: 'hour', unitDisplay: 'long' });
    const refresh = () => {
      const selected = demo.querySelector('input[name="duration"]:checked');
      const result = globalThis.FastingRoutine.routine(start.value, Number(selected.value));
      const output = demo.querySelector('.demo-output');
      const error = demo.querySelector('#time-error');
      if (!result) {
        start.setAttribute('aria-invalid', 'true');
        error.hidden = false;
        output.hidden = true;
        return;
      }
      error.hidden = true;
      output.hidden = false;
      start.removeAttribute('aria-invalid');
      const end = formatTime(result.endMinutes);
      const next = result.nextDay ? demo.dataset.nextDay : '';
      demo.querySelector('[data-end]').textContent = end;
      demo.querySelector('[data-day]').textContent = next;
      demo.querySelector('[data-fast-duration]').textContent = hoursFormat.format(result.hours);
      demo.querySelector('[data-eat-duration]').textContent = hoursFormat.format(24 - result.hours);
      const summary = demo.dataset.summary.replace('{start}', formatTime(result.startMinutes)).replace('{end}', [next, end].filter(Boolean).join(' '));
      demo.querySelector('[data-demo-summary]').textContent = summary;
      const track = demo.querySelector('.day-track');
      track.setAttribute('aria-label', summary);
      track.replaceChildren(...result.segments.map((segment) => {
        const bar = document.createElement('span');
        bar.className = `window-segment ${segment.fasting ? 'fasting' : 'eating'}`;
        bar.style.setProperty('--segment-left', `${segment.left / 14.4}%`);
        bar.style.setProperty('--segment-width', `${segment.width / 14.4}%`);
        return bar;
      }));
    };
    refresh();
    demo.querySelectorAll('[disabled]').forEach((element) => { element.disabled = false; });
    demo.querySelector('[data-demo-fallback]').hidden = true;
    demo.addEventListener('input', refresh);
    demo.addEventListener('change', refresh);
  }

  // Content is present by default; animations run once only after the observer exists.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Transforming a details element would temporarily re-anchor its absolute answer pane.
        const frames = entry.target.matches('.faq-item')
          ? [{ opacity: 0.35 }, { opacity: 1 }]
          : [{ opacity: 0.35, transform: entry.target.tagName === 'FIGURE' ? 'scale(.97)' : 'translateY(22px)' }, { opacity: 1, transform: 'none' }];
        entry.target.animate(frames, { duration: 760, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'none' });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    reduced.addEventListener('change', (event) => {
      if (event.matches) { observer.disconnect(); document.getAnimations().forEach((animation) => animation.finish()); }
    });
  }

  // Native details remains the no-script FAQ. Wide screens enhance it to an index and answer pane.
  const faq = document.querySelector('.faq-layout');
  if (faq) {
    const entries = [...faq.querySelectorAll('details')];
    const wide = window.matchMedia('(min-width: 900px)');
    const activate = (entry) => {
      if (!wide.matches) return;
      entries.forEach((other) => { other.open = other === entry; });
    };
    const enhance = () => {
      faq.classList.toggle('faq-index', wide.matches);
      if (wide.matches) activate(entries.find((entry) => entry.open) || entries[0]);
    };
    entries.forEach((entry) => {
      const summary = entry.querySelector('summary');
      summary.addEventListener('click', (event) => {
        if (wide.matches) { event.preventDefault(); activate(entry); }
      });
      summary.addEventListener('focus', () => activate(entry));
      summary.addEventListener('pointerenter', () => activate(entry));
    });
    wide.addEventListener('change', enhance);
    enhance();
  }
})();
