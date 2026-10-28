/* Root pages fall back to English; standalone language pages keep their pretranslated HTML. */
(() => {
  'use strict';

  const catalogRoot = new URL('locales/', document.currentScript.src);
  const siteRoot = new URL('../../', catalogRoot);
  const supported = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'];
  const preferenceKey = 'betweenFrames.webLanguage';
  const select = document.getElementById('language-select');
  const cache = new Map();
  let revision = 0;

  const isSelection = value => value === 'system' || supported.includes(value);

  function storedSelection() {
    try {
      const value = localStorage.getItem(preferenceKey);
      return isSelection(value) ? value : 'system';
    } catch {
      return 'system';
    }
  }

  function saveSelection(value) {
    try {
      if (value === 'system') localStorage.removeItem(preferenceKey);
      else localStorage.setItem(preferenceKey, value);
    } catch {
      // The URL also carries the selection when browser storage is unavailable.
    }
  }

  function urlSelection() {
    const value = new URL(location.href).searchParams.get('lang');
    return isSelection(value) ? value : null;
  }

  function browserLanguage() {
    for (const preference of navigator.languages || [navigator.language]) {
      const parts = preference.toLowerCase().replaceAll('_', '-').split('-');
      if (parts[0] === 'zh') {
        if (parts.includes('hant')) return 'zh-Hant';
        if (parts.includes('hans')) return 'zh-Hans';
        return parts.some(part => ['tw', 'hk', 'mo'].includes(part)) ? 'zh-Hant' : 'zh-Hans';
      }
      if (['en', 'ja', 'ko'].includes(parts[0])) return parts[0];
    }
    return 'en';
  }

  // Standalone pages already contain their language. Switch by navigating to another
  // generated document so the URL, metadata and no-JavaScript content stay consistent.
  const staticLanguage = document.documentElement.dataset.staticLanguage;
  if (supported.includes(staticLanguage)) {
    const page = location.pathname.split('/').pop() || 'index.html';
    const selection = urlSelection() || staticLanguage;
    const language = value => value === 'system' ? browserLanguage() : value;
    const destination = value => {
      const url = new URL(`${language(value)}/${page}`, siteRoot);
      url.search = location.search;
      url.searchParams.set('lang', value);
      url.hash = location.hash;
      return url;
    };
    const navigate = (value, replace = false) => {
      saveSelection(value);
      if (replace) location.replace(destination(value));
      else location.assign(destination(value));
    };
    if (language(selection) !== staticLanguage) {
      navigate(selection, true);
      return;
    }
    saveSelection(selection);
    select.value = selection;
    select.setAttribute('aria-busy', 'false');
    select.closest('.language-switcher').hidden = false;
    for (const link of document.querySelectorAll('a[href]')) {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin !== location.origin || !url.pathname.startsWith(siteRoot.pathname)) continue;
      if (link.closest('.language-links')) {
        const value = link.hreflang;
        link.href = destination(value).href;
      } else if (!link.getAttribute('href').startsWith('#') &&
                 ['index.html', 'privacy.html', 'terms.html'].includes(url.pathname.split('/').pop())) {
        url.searchParams.set('lang', selection);
        link.href = url.href;
      }
    }
    select.addEventListener('change', () => {
      if (isSelection(select.value)) navigate(select.value);
    });
    addEventListener('languagechange', () => {
      if (selection === 'system' && browserLanguage() !== staticLanguage) navigate('system', true);
    });
    addEventListener('storage', event => {
      if (event.key !== preferenceKey && event.key !== null) return;
      const value = storedSelection();
      if (value !== selection) navigate(value, true);
    });
    return;
  }

  // Keep whole sentences together, retaining emphasis and links in trusted local catalogs.
  const bindings = [];
  for (const element of document.querySelectorAll('[data-i18n]')) {
    bindings.push({element, key: element.dataset.i18n, fallback: element.innerHTML});
  }
  for (const attribute of ['alt', 'aria-label', 'content']) {
    for (const element of document.querySelectorAll(`[data-i18n-${attribute}]`)) {
      bindings.push({element, attribute, key: element.getAttribute(`data-i18n-${attribute}`),
        fallback: element.getAttribute(attribute)});
    }
  }

  let selection = urlSelection() || storedSelection();
  if (urlSelection()) saveSelection(selection);

  function updateLinks() {
    for (const link of document.querySelectorAll('a[href]')) {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin !== location.origin || !url.pathname.startsWith(siteRoot.pathname)) continue;
      const page = url.pathname.slice(siteRoot.pathname.length);
      if (!['index.html', 'privacy.html', 'terms.html'].includes(page)) continue;
      // Leave in-page anchors alone to preserve native scrolling and focus behavior.
      if (link.getAttribute('href').startsWith('#')) continue;
      url.searchParams.set('lang', selection);
      link.href = url.href;
    }
  }

  function updateURL() {
    const url = new URL(location.href);
    url.searchParams.set('lang', selection);
    try {
      history.replaceState(history.state, '', url);
    } catch {
      // Embedded browsers can restrict history; links and local storage still work.
    }
  }

  async function catalog(language) {
    if (language === 'en') return {};
    if (!cache.has(language)) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const request = fetch(new URL(`${language}.json`, catalogRoot), {signal: controller.signal})
        .then(response => {
          if (!response.ok) throw new Error('Translation catalog unavailable');
          return response.json();
        })
        .then(messages => {
          if (!messages || typeof messages !== 'object' || Array.isArray(messages)) {
            throw new Error('Invalid translation catalog');
          }
          return messages;
        })
        .catch(error => {
          cache.delete(language);
          throw error;
        })
        .finally(() => clearTimeout(timeout));
      cache.set(language, request);
    }
    return cache.get(language);
  }

  async function render() {
    const current = ++revision;
    select.value = selection;
    select.setAttribute('aria-busy', 'true');
    select.closest('.language-switcher').hidden = false;
    updateLinks();
    let language = selection === 'system' ? browserLanguage() : selection;
    let messages;
    try {
      messages = await catalog(language);
    } catch {
      language = 'en';
      messages = {};
    }
    // A slow earlier fetch must never overwrite the most recent choice.
    if (current !== revision) return;

    for (const {element, key, attribute, fallback} of bindings) {
      const translated = Object.hasOwn(messages, key) && typeof messages[key] === 'string' && messages[key].trim();
      const value = translated ? messages[key] : fallback;
      if (attribute) element.setAttribute(attribute, value);
      else {
        element.innerHTML = value;
        if (!translated && language !== 'en') element.lang = 'en';
        else element.removeAttribute('lang');
      }
    }
    document.documentElement.lang = language;
    updateLinks();
    select.setAttribute('aria-busy', 'false');
  }

  select.addEventListener('change', () => {
    if (!isSelection(select.value)) return;
    selection = select.value;
    saveSelection(selection);
    updateURL();
    render();
  });
  addEventListener('languagechange', () => {
    if (selection === 'system') render();
  });
  addEventListener('popstate', () => {
    selection = urlSelection() || storedSelection();
    render();
  });
  addEventListener('storage', event => {
    if (event.key !== preferenceKey && event.key !== null) return;
    selection = storedSelection();
    updateURL();
    render();
  });
  render();
})();
