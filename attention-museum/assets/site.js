(() => {
  'use strict';
  const supported = ['zh-Hans', 'zh-Hant', 'en', 'ja', 'ko', 'fr', 'de', 'it'];
  const preferenceKey = 'attentionMuseum.language';
  const root = document.documentElement;
  const siteRoot = new URL(`${root.dataset.siteRoot}/`, location.href);
  const pageName = root.dataset.page;
  const resolveLanguage = (preferences) => {
    for (const identifier of preferences) {
      const parts = String(identifier).replaceAll('_', '-').toLowerCase().split('-');
      if (parts[0] === 'zh') {
        if (parts.includes('hant')) return 'zh-Hant';
        if (parts.includes('hans')) return 'zh-Hans';
        return parts.some(part => ['tw', 'hk', 'mo'].includes(part)) ? 'zh-Hant' : 'zh-Hans';
      }
      if (supported.includes(parts[0])) return parts[0];
    }
    return 'en';
  };
  const readPreference = () => {
    try { return localStorage.getItem(preferenceKey); } catch { return null; }
  };
  const savePreference = value => {
    try { localStorage.setItem(preferenceKey, value); } catch { /* URL navigation also works without storage. */ }
  };
  const browserLanguage = () => resolveLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
  const languageURL = language => {
    const target = new URL(`${language}/${pageName}`, siteRoot);
    target.search = location.search;
    target.searchParams.delete('lang');
    target.hash = location.hash;
    return target;
  };
  const requested = new URL(location.href).searchParams.get('lang');
  if (supported.includes(requested)) {
    savePreference(requested);
    location.replace(languageURL(requested));
    return;
  }
  if (root.dataset.siteRoot === '.') {
    const preference = readPreference();
    const language = supported.includes(preference) ? preference : browserLanguage();
    location.replace(languageURL(language));
    return;
  }
  root.classList.add('interactive');
  const selector = document.getElementById('site-language');
  if (selector) {
    selector.value = readPreference() === 'system' && browserLanguage() === root.lang ? 'system' : root.lang;
    selector.addEventListener('change', () => {
      if (selector.value !== 'system' && !supported.includes(selector.value)) return;
      savePreference(selector.value);
      location.assign(languageURL(selector.value === 'system' ? browserLanguage() : selector.value));
    });
  }

  // Without JavaScript all content remains visible. Animate only after setup succeeds.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    root.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }

  const copyElement = document.getElementById('demo-copy');
  if (!copyElement) return;
  const copy = JSON.parse(copyElement.textContent);
  const time = document.getElementById('demo-time');
  const status = document.getElementById('demo-status');
  const button = document.getElementById('demo-toggle');
  button.disabled = false;
  const duration = 60, grace = 30;
  let state = 'idle', remaining = duration, timer = null, hiddenAt = null;
  const text = (key, seconds) => copy[key].replace('{seconds}', String(seconds));
  const render = () => {
    time.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    button.textContent = state === 'done' ? copy.again : ['focus', 'paused'].includes(state) ? copy.end : copy.start;
    button.dataset.state = state;
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const tick = () => {
    remaining = Math.max(0, remaining - 1);
    if (!remaining) { stop(); state = 'done'; status.textContent = copy.done; }
    render();
  };
  const reset = message => {
    stop(); state = 'idle'; remaining = duration; hiddenAt = null;
    status.textContent = message; render();
  };
  button.addEventListener('click', () => {
    if (['focus', 'paused'].includes(state)) { reset(copy.ended); return; }
    stop(); state = 'focus'; remaining = duration;
    status.textContent = copy.focus; render(); timer = setInterval(tick, 1000);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state === 'focus') {
      stop(); hiddenAt = Date.now(); state = 'paused'; status.textContent = copy.paused; render();
    } else if (!document.hidden && state === 'paused') {
      const away = (Date.now() - hiddenAt) / 1000;
      if (away > grace) reset(text('interrupted', Math.round(away)));
      else {
        state = 'focus'; hiddenAt = null; status.textContent = text('resumed', Math.round(away));
        render(); timer = setInterval(tick, 1000);
      }
    }
  });
  render();
})();
