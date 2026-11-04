import { content } from './content.mjs';
import { legal, legalLabels } from './legal.mjs';

export const locales = ['zh-Hans', 'zh-Hant', 'en'];
const languageNames = { 'zh-Hans': '简体', 'zh-Hant': '繁體', en: 'EN' };
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const e = escape;
const contactEmail = 'hello@txxy.in';
const bodyText = (value) => e(value).replaceAll(contactEmail, `<a class="email-link" href="mailto:${contactEmail}">${contactEmail}</a>`);

function header(lang, page, root) {
  const c = content[lang];
  const home = root ? `${lang}/index.html` : 'index.html';
  return `<a class="skip" href="#main">${e(c.skip)}</a>
  <header class="site-header frame" id="top">
    <a class="brand" href="${home}" aria-label="Fasting"><img src="${root ? '.' : '..'}/assets/icon.png" width="36" height="36" alt="">Fasting</a>
    <nav class="main-nav" aria-label="${e(lang === 'en' ? 'Explore Fasting' : lang === 'zh-Hant' ? '產品導覽' : '产品导航')}">
      ${Object.entries(c.nav).map(([key, label]) => `<a href="${page === 'index' ? '' : home}#${key}">${e(label)}</a>`).join('')}
    </nav>
    <nav class="languages" aria-label="${e(c.ui.language)}">${locales.map((code) => `<a href="${root ? '.' : '..'}/${code}/${page}.html" lang="${code}" hreflang="${code}" data-language="${code}" aria-label="${e(content[code].localeName)}"${code === lang ? ' aria-current="true"' : ''}>${languageNames[code]}</a>`).join('')}</nav>
  </header>`;
}

function documentShell(lang, page, title, description, body, root = false) {
  const prefix = root ? '.' : '..';
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f4f5f1">
  <meta name="description" content="${e(description)}">
  <title>${e(title)}</title>
  <link rel="icon" type="image/png" href="${prefix}/assets/icon.png">
  ${locales.map((code) => `<link rel="alternate" hreflang="${code}" href="${prefix}/${code}/${page}.html">`).join('\n  ')}
  <link rel="stylesheet" href="${prefix}/assets/site.css">
  ${root ? `<script src="./assets/language.js"></script>` : ''}
  <script src="${prefix}/assets/rhythm.js" defer></script>
  <script src="${prefix}/assets/site.js" defer></script>
</head>
<body data-page="${page}" data-locale="${lang}">
${header(lang, page, root)}
${body}
</body>
</html>\n`;
}

function image(lang, name, prefix, className = '', eager = false) {
  const tag = lang.toLowerCase();
  const file = name === 'watch' ? `watch-${lang === 'en' ? 'en' : 'zh'}.png` : `${name}-${tag}.png`;
  return `<img class="${className}" src="${prefix}/assets/screens/${file}" width="${name === 'watch' ? 374 : 690}" height="${name === 'watch' ? 446 : 1500}" alt="${e(content[lang].images[name])}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

function footer(lang, root, compact = false) {
  const c = content[lang];
  const base = root ? `${lang}/` : '';
  return `<footer class="site-footer${compact ? ' compact-footer' : ''}">
    <div class="frame">
      ${compact ? '' : `<p class="footer-wordmark" aria-hidden="true" data-reveal>Fasting</p>`}
      <div class="footer-columns">
        <div><h2${compact ? '' : ' data-reveal'}>${e(c.footer.title)}</h2><p>${e(c.footer.description)}</p></div>
        <nav class="legal-links" aria-label="${e(c.nav.privacy)}"><a href="${base}privacy.html">${e(c.footer.privacy)}</a><a href="${base}terms.html">${e(c.footer.terms)}</a><a href="${base}health.html">${e(c.footer.health)}</a><a href="mailto:${contactEmail}" aria-label="${e(c.footer.contact)}: ${contactEmail}">${contactEmail}</a></nav>
      </div>
      <div class="footer-bottom"><p>${e(c.footer.availability)}</p><p>${e(c.footer.copyright)}</p></div>
    </div>
  </footer>`;
}

function demo(lang) {
  const c = content[lang];
  const hours = lang === 'en' ? ['16 hours', '8 hours'] : lang === 'zh-Hant' ? ['16 小時', '8 小時'] : ['16 小时', '8 小时'];
  return `<div class="rhythm-demo" data-ui data-rhythm data-summary="${e(c.rhythm.summaryTemplate)}" data-next-day="${e(c.rhythm.nextDay)}">
    <div class="demo-controls">
      <fieldset disabled><legend>${e(c.rhythm.planLabel)}</legend><div class="plan-options">${[12, 14, 16].map((n) => `<label><input type="radio" name="duration" value="${n}"${n === 16 ? ' checked' : ''}><span>${n}:${24 - n}</span></label>`).join('')}</div></fieldset>
      <label class="time-control" for="start-time">${e(c.rhythm.startLabel)}<input id="start-time" name="start-time" type="time" value="20:00" required disabled aria-describedby="time-format time-error"></label>
    </div>
    <p class="caption demo-fallback" data-demo-fallback>${e(c.ui.demoFallback)}</p>
    <p class="time-error" id="time-error" role="alert" hidden>${e(c.ui.invalidTime)}</p>
    <div class="demo-output">
    <div class="demo-result" aria-live="polite" aria-atomic="true"><span>${e(c.rhythm.endLabel)}</span><p><time data-end>12:00</time><span class="next-day" data-day>${e(c.rhythm.nextDay)}</span></p></div>
    <div class="day-labels" aria-hidden="true"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
    <div class="day-track" role="img" aria-label="${e(c.rhythm.summaryTemplate.replace('{start}', '20:00').replace('{end}', c.rhythm.nextDay + ' 12:00'))}"><span class="window-segment fasting" style="--segment-left:0%;--segment-width:50%"></span><span class="window-segment eating" style="--segment-left:50%;--segment-width:33.3333%"></span><span class="window-segment fasting" style="--segment-left:83.3333%;--segment-width:16.6667%"></span></div>
    <div class="window-key"><p><span class="swatch fasting"></span>${e(c.rhythm.fastingLabel)}<strong data-fast-duration>${hours[0]}</strong></p><p><span class="swatch eating"></span>${e(c.rhythm.eatingLabel)}<strong data-eat-duration>${hours[1]}</strong></p></div>
    <p class="demo-summary" data-demo-summary>${e(c.rhythm.summaryTemplate.replace('{start}', '20:00').replace('{end}', c.rhythm.nextDay + ' 12:00'))}</p>
    </div>
    <p class="caption" id="time-format">${e(c.ui.timeFormatLabel)}</p>
  </div>`;
}

export function landing(lang, root = false) {
  const c = content[lang];
  const prefix = root ? '.' : '..';
  const privacyHref = root ? `${lang}/privacy.html` : 'privacy.html';
  const body = `<main id="main" tabindex="-1">
    <section class="hero frame" aria-labelledby="hero-title">
      <div class="hero-copy"><h1 id="hero-title">${c.hero.title.map((line, i) => `<span class="headline-line"><span style="--line:${i}">${e(line)}</span></span>`).join('')}</h1><p class="hero-description" data-reveal>${e(c.hero.description)}</p><a class="button" href="#rhythm" data-reveal>${e(c.action)}<span aria-hidden="true">↗</span></a><p class="caption platform" data-reveal>${e(c.hero.platform)}</p><p class="caption">${e(c.hero.availability)}</p></div>
      <div class="hero-stage" data-reveal><figure class="hero-product">${image(lang, 'today', prefix, 'hero-image', true)}</figure><div class="hero-plan" data-ui><span>${e(c.rhythm.startLabel)}</span><strong>20:00</strong><div class="mini-track" aria-hidden="true"><i></i><i></i></div><span>${e(c.rhythm.endLabel)}</span><strong>12:00 <small>${e(c.rhythm.nextDay)}</small></strong><a href="#rhythm">${e(c.action)}</a></div></div>
    </section>
    <section class="rhythm-section frame" id="rhythm" aria-labelledby="rhythm-title">
      <div class="section-intro"><h2 id="rhythm-title" data-reveal>${e(c.rhythm.title)}</h2><p data-reveal>${e(c.rhythm.description)}</p></div>
      ${demo(lang)}<p class="caption demo-note" data-reveal>${e(c.rhythm.demoNote)}</p>
    </section>
    <section class="support-section" id="support" aria-labelledby="support-title"><div class="support-layout frame">
      <div class="support-copy"><h2 id="support-title" data-reveal>${e(c.support.title)}</h2><p class="lead" data-reveal>${e(c.support.description)}</p></div>
      <figure class="support-product" data-reveal>${image(lang, 'support', prefix)}<figcaption>${e(c.support.caption)}</figcaption></figure>
      <div class="support-note" data-reveal><p>${e(c.support.body)}</p></div>
    </div></section>
    <section class="everyday-section" id="everyday" aria-labelledby="everyday-title">
      <div class="section-intro frame"><h2 id="everyday-title" data-reveal>${e(c.everyday.title)}</h2><p data-reveal>${e(c.everyday.description)}</p></div>
      <div class="everyday-pair">
        <div class="watch-field"><div class="everyday-copy"><h3 data-reveal>${e(c.everyday.watchTitle)}</h3><p data-reveal>${e(c.everyday.watchBody)}</p></div><figure data-reveal>${image(lang, 'watch', prefix)}<figcaption>${e(c.everyday.watchCaption)}</figcaption></figure></div>
        <div class="records-field"><div class="everyday-copy"><h3 data-reveal>${e(c.everyday.recordsTitle)}</h3><p data-reveal>${e(c.everyday.recordsBody)}</p></div><figure data-reveal>${image(lang, 'records', prefix)}<figcaption>${e(c.everyday.recordsCaption)}</figcaption></figure></div>
      </div>
    </section>
    <section class="health-section" id="health" aria-labelledby="health-title"><div class="health-layout frame">
      <div class="health-copy"><h2 id="health-title" data-reveal>${e(c.health.title)}</h2><p class="lead" data-reveal>${e(c.health.description)}</p><p data-reveal>${e(c.health.note)}</p></div>
      <figure class="health-product" data-reveal>${image(lang, 'health', prefix)}<figcaption>${e(c.health.caption)}</figcaption></figure>
    </div></section>
    <section class="privacy-section frame" id="privacy" aria-labelledby="privacy-title">
      <div class="privacy-heading"><h2 id="privacy-title" data-reveal>${e(c.privacy.title)}</h2><p class="lead" data-reveal>${e(c.privacy.description)}</p><a class="text-link" href="${privacyHref}" data-reveal>${e(c.privacy.link)}</a></div>
      <div class="privacy-facts">${c.privacy.items.map((item) => `<div data-reveal><h3>${e(item.title)}</h3><p>${e(item.body)}</p></div>`).join('')}</div>
    </section>
    <section class="faq-section frame" id="faq" aria-labelledby="faq-title"><h2 id="faq-title" data-reveal>${e(c.faq.title)}</h2><div class="faq-layout">${c.faq.items.map((item, i) => `<details class="faq-item" data-reveal${i === 0 ? ' open' : ''}><summary>${e(item.question)}<span aria-hidden="true" class="faq-symbol">+</span></summary><div class="faq-answer"><p>${e(item.answer)}</p></div></details>`).join('')}</div></section>
  </main>${footer(lang, root)}`;
  return documentShell(lang, 'index', c.pageTitle, c.description, body, root);
}

export function legalPage(lang, type) {
  const doc = legal[lang][type];
  const labels = legalLabels[lang];
  const sources = type === 'health' ? `<div class="document-sources"><a href="https://www.hopkinsmedicine.org/health/expert-qa/intermittent-fasting-what-is-it-and-how-does-it-work" rel="noreferrer">Johns Hopkins Medicine: Intermittent fasting</a></div>` : '';
  const body = `<main class="legal-main frame" id="main" tabindex="-1"><a class="back-link" href="index.html">${e(labels.back)}</a><div class="legal-intro"><h1>${e(doc.title)}</h1><p class="lead">${e(doc.summary)}</p><p class="effective-date">${e(labels.effective)}</p><p class="caption">${e(labels.updated)}</p></div><div class="legal-layout"><nav class="document-toc" aria-label="${e(labels.contents)}"><p>${e(labels.contents)}</p>${doc.sections.map((section, i) => `<a href="#section-${i + 1}">${e(section.title)}</a>`).join('')}</nav><article class="document-content">${doc.sections.map((section, i) => `<section id="section-${i + 1}"><h2>${e(section.title)}</h2>${section.paragraphs.map((p) => `<p>${bodyText(p)}</p>`).join('')}${section.list ? `<ul>${section.list.map((item) => `<li>${bodyText(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}${sources}</article></div></main>${footer(lang, false, true)}`;
  return documentShell(lang, type, `${doc.title} | Fasting`, doc.summary, body);
}
