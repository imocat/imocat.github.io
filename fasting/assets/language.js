// Only the language-neutral entry redirects. Explicit language URLs always win.
(() => {
  const supported = ['zh-Hans', 'zh-Hant', 'en'];
  let saved;
  try { saved = localStorage.getItem('fasting-language'); } catch { /* Storage can be unavailable. */ }
  const match = (tag) => {
    if (/^zh(?:-|$)/i.test(tag)) {
      if (/(?:^|-)hans(?:-|$)/i.test(tag)) return 'zh-Hans';
      if (/(?:^|-)hant(?:-|$)/i.test(tag)) return 'zh-Hant';
      return /(?:^|-)(?:tw|hk|mo)(?:-|$)/i.test(tag) ? 'zh-Hant' : 'zh-Hans';
    }
    return /^en(?:-|$)/i.test(tag) ? 'en' : null;
  };
  const locale = supported.includes(saved) ? saved : (navigator.languages || [navigator.language]).map(match).find(Boolean) || 'en';
  const destination = new URL(`./${locale}/index.html`, location.href);
  destination.search = location.search;
  destination.hash = location.hash;
  location.replace(destination.href);
})();
