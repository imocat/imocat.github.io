import { mkdir, writeFile } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const [driverPath, baseArgument = 'http://127.0.0.1:4173/'] = process.argv.slice(2);
if (!driverPath || !isAbsolute(driverPath)) {
  console.error('Usage: node web/scripts/browser-check.mjs /absolute/path/to/cdp.mjs [baseURL]');
  process.exit(2);
}

const { Browser } = await import(pathToFileURL(driverPath).href);
const webRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = resolve(webRoot, 'qa/browser-check.json');
const temporaryRoot = process.env.TASTE_SKILL_TMP || resolve(webRoot, 'qa/tmp');
await mkdir(temporaryRoot, { recursive: true });
process.env.TASTE_SKILL_TMP = temporaryRoot;
const base = new URL(baseArgument.endsWith('/') ? baseArgument : `${baseArgument}/`);
const locales = ['zh-Hans', 'zh-Hant', 'en'];
const types = ['index', 'privacy', 'terms', 'health'];
const widths = [1440, 768, 390];
const report = {
  startedAt: new Date().toISOString(),
  baseURL: base.href,
  driver: driverPath,
  pageChecks: [],
  checks: [],
  screenshots: [],
  network: { requests: 0, externalRequests: [], failedResponses: [], loadingFailures: [] },
};
const pause = (milliseconds) => new Promise((done) => setTimeout(done, milliseconds));
const record = (name, pass, detail) => {
  report.checks.push({ name, pass: Boolean(pass), detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`);
};
const pageURL = (locale, type = 'index') => new URL(`${locale}/${type}.html`, base).href;

let browser;
try {
  browser = await Browser.launch();
  const trackNetwork = async (page) => {
    await page.send('Network.enable');
    browser.on(page.sessionId, 'Network.requestWillBeSent', ({ request }) => {
      report.network.requests++;
      const url = new URL(request.url);
      if (!['file:', 'data:', 'blob:'].includes(url.protocol) && url.origin !== base.origin) {
        report.network.externalRequests.push(request.url);
      }
    });
    browser.on(page.sessionId, 'Network.responseReceived', ({ response }) => {
      if (response.status >= 400) report.network.failedResponses.push({ url: response.url, status: response.status });
    });
    browser.on(page.sessionId, 'Network.loadingFailed', (event) => {
      if (!event.canceled) report.network.loadingFailures.push({ type: event.type, error: event.errorText });
    });
  };
  const ready = (page) => page.eval(async () => {
    for (const image of document.images) image.loading = 'eager';
    await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
    await document.fonts.ready;
    return document.readyState;
  });
  const navigate = async (page, url) => {
    page.consoleErrors.length = 0;
    await page.goto(url, { settleMs: 140 });
    await ready(page);
  };
  const waitForURL = async (page, suffix) => {
    for (let attempt = 0; attempt < 80; attempt++) {
      try {
        if (await page.eval((expected) => location.pathname.endsWith(expected), suffix)) return true;
      } catch { /* A click can replace the execution context. */ }
      await pause(25);
    }
    return false;
  };
  const pressSpace = async (page) => {
    await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
  };

  const page = await browser.newPage();
  await trackNetwork(page);
  for (const locale of locales) {
    for (const width of widths) {
      await page.setViewport({ width, height: 900, mobile: width === 390 });
      for (const type of types) {
        await navigate(page, pageURL(locale, type));
        const result = await page.eval(() => ({
          lang: document.documentElement.lang,
          viewport: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          titleCount: document.querySelectorAll('h1').length,
          imageCount: document.images.length,
          brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
        }));
        const errors = [...page.consoleErrors];
        const pass = result.lang === locale && result.documentWidth <= result.viewport + 1 && result.bodyWidth <= result.viewport + 1 && result.titleCount === 1 && result.brokenImages.length === 0 && errors.length === 0;
        report.pageChecks.push({ locale, type, width, pass, ...result, errors });
        console.log(`${pass ? 'PASS' : 'FAIL'} ${locale}/${type} at ${width}px`);
        if (type === 'index') {
          const screenshot = `qa/ui-sync/${locale}-${width}.jpg`;
          await mkdir(resolve(webRoot, 'qa/ui-sync'), { recursive: true });
          await page.eval(() => {
            const style = document.createElement('style');
            style.id = 'qa-still';
            style.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
            document.head.append(style);
            document.getAnimations().forEach((animation) => animation.cancel());
          });
          await page.screenshot({ path: resolve(webRoot, screenshot), format: 'jpeg', quality: 80, fullPage: true });
          await page.eval(() => document.querySelector('#qa-still').remove());
          report.screenshots.push(screenshot);
        }
        if (type === 'privacy' && ['zh-Hans', 'en'].includes(locale) && [1440, 390].includes(width)) {
          const screenshot = `qa/legal-${locale}-${width === 1440 ? 'desktop' : 'phone'}.png`;
          await page.screenshot({ path: resolve(webRoot, screenshot), format: 'png', fullPage: true });
          report.screenshots.push(screenshot);
        }
      }
    }
  }

  await page.setViewport({ width: 900, height: 900 });
  await navigate(page, pageURL('en'));
  const faqFit = await page.eval(() => {
    const faq = document.querySelector('.faq-layout');
    const pro = [...faq.querySelectorAll('details')].find((item) => item.textContent.includes('one-time purchase'));
    pro.querySelector('summary').click();
    const container = faq.getBoundingClientRect();
    const answer = pro.querySelector('.faq-answer').getBoundingClientRect();
    return { containerBottom: container.bottom, answerBottom: answer.bottom, width: document.documentElement.scrollWidth, viewport: innerWidth };
  });
  record('English Pro answer fits the FAQ at 900px', faqFit.answerBottom <= faqFit.containerBottom && faqFit.width <= faqFit.viewport + 1, faqFit);

  for (const locale of locales) {
    await page.setViewport({ width: 390, height: 900, mobile: true });
    await navigate(page, pageURL(locale));
    const initialization = await page.eval(() => ({
      inputEnabled: !document.querySelector('#start-time').disabled,
      fieldsetEnabled: !document.querySelector('[data-rhythm] fieldset').disabled,
      fallbackHidden: document.querySelector('[data-demo-fallback]').hidden,
    }));
    record(`${locale}: progressive enhancement enabled`, Object.values(initialization).every(Boolean), initialization);

    const invalid = await page.eval(() => {
      const input = document.querySelector('#start-time');
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      const error = document.querySelector('#time-error');
      return {
        invalid: input.getAttribute('aria-invalid') === 'true',
        outputHidden: document.querySelector('.demo-output').hidden,
        errorVisible: !error.hidden && getComputedStyle(error).display !== 'none' && error.getAttribute('role') === 'alert',
      };
    });
    record(`${locale}: empty time hides stale output`, Object.values(invalid).every(Boolean), invalid);

    for (const sample of [
      { start: '20:00', duration: 12, hour: 8, nextDay: true },
      { start: '20:00', duration: 14, hour: 10, nextDay: true },
      { start: '20:00', duration: 16, hour: 12, nextDay: true },
      { start: '08:00', duration: 16, hour: 0, nextDay: true },
      { start: '00:00', duration: 12, hour: 12, nextDay: false },
    ]) {
      const result = await page.eval((test) => {
        const input = document.querySelector('#start-time');
        input.value = test.start;
        document.querySelector(`input[name="duration"][value="${test.duration}"]`).checked = true;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const expected = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(2026, 0, 1, test.hour, 0));
        return {
          outputVisible: !document.querySelector('.demo-output').hidden,
          errorHidden: document.querySelector('#time-error').hidden,
          noInvalidMarker: !input.hasAttribute('aria-invalid'),
          endCorrect: document.querySelector('[data-end]').textContent === expected,
          dayCorrect: Boolean(document.querySelector('[data-day]').textContent) === test.nextDay,
          durationCorrect: document.querySelector('[data-fast-duration]').textContent === new Intl.NumberFormat(document.documentElement.lang, { style: 'unit', unit: 'hour', unitDisplay: 'long' }).format(test.duration),
        };
      }, sample);
      record(`${locale}: ${sample.start} + ${sample.duration}h`, Object.values(result).every(Boolean), result);
    }

    await page.eval(() => {
      const radio = document.querySelector('input[name="duration"][value="12"]');
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));
      radio.focus();
    });
    await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
    const keyboard = await page.eval(() => ({ value: document.querySelector('input[name="duration"]:checked').value, focused: document.activeElement.name }));
    record(`${locale}: duration radio works from keyboard`, keyboard.value === '14' && keyboard.focused === 'duration', keyboard);
  }

  // Transforming a details ancestor temporarily changes its absolute answer's containing block.
  // Sample while reveals are running, when a settled screenshot would miss the regression.
  for (const locale of locales) {
    await page.setViewport({ width: 1440, height: 900, mobile: false });
    await navigate(page, pageURL(locale));
    await page.eval(() => document.querySelector('#faq').scrollIntoView({ behavior: 'instant', block: 'start' }));
    await pause(200);
    const geometry = await page.eval(() => {
      const layout = document.querySelector('.faq-layout');
      const entry = layout.querySelector('details[open]');
      const answer = entry.querySelector('.faq-answer');
      return {
        layoutWidth: layout.getBoundingClientRect().width,
        answerWidth: answer.getBoundingClientRect().width,
        parentIsLayout: answer.offsetParent === layout,
        offsetParent: `${answer.offsetParent?.tagName}.${answer.offsetParent?.className}`,
        entryTransform: getComputedStyle(entry).transform,
        runningReveals: entry.getAnimations().filter((animation) => animation.playState === 'running').length,
      };
    });
    record(`${locale}: FAQ answer keeps its width during reveal`, geometry.parentIsLayout && geometry.answerWidth >= geometry.layoutWidth * 0.4, geometry);
  }

  for (const type of ['privacy', 'terms', 'health']) {
    for (let index = 0; index < locales.length; index++) {
      const source = locales[index];
      const destination = locales[(index + 1) % locales.length];
      await navigate(page, pageURL(source, type));
      await page.eval((locale) => document.querySelector(`[data-language="${locale}"]`).click(), destination);
      const arrived = await waitForURL(page, `/${destination}/${type}.html`);
      record(`${source}/${type}: language switch keeps document`, arrived && await page.eval((locale) => document.documentElement.lang === locale, destination));
    }
  }

  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
    const conflicting = locales[(index + 1) % locales.length];
    await page.eval((saved) => localStorage.setItem('fasting-language', saved), conflicting);
    await navigate(page, pageURL(locale));
    record(`${locale}: explicit URL beats saved language`, await page.eval((expected) => document.documentElement.lang === expected && location.pathname.includes(`/${expected}/`), locale));
  }

  await navigate(page, pageURL('zh-Hans'));
  await page.eval(() => { localStorage.clear(); location.hash = '#privacy'; document.querySelector('[data-language="en"]').click(); });
  const switched = await waitForURL(page, '/en/index.html');
  const storage = await page.eval(() => ({ keys: Object.keys(localStorage), value: localStorage.getItem('fasting-language'), hash: location.hash }));
  record('Manual language switch stores only its language preference', switched && storage.keys.length === 1 && storage.keys[0] === 'fasting-language' && storage.value === 'en' && storage.hash === '#privacy', storage);

  for (const test of [
    { tag: 'zh-CN', locale: 'zh-Hans' },
    { tag: 'zh-TW', locale: 'zh-Hant' },
    { tag: 'zh-Hans-HK', locale: 'zh-Hans' },
    { tag: 'zh-Hant-CN', locale: 'zh-Hant' },
    { tag: 'en-US', locale: 'en' },
    { tag: 'ja-JP', locale: 'en' },
  ]) {
    await page.eval(() => localStorage.clear());
    const { identifier } = await page.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `Object.defineProperty(navigator, 'languages', { get: () => [${JSON.stringify(test.tag)}] });`,
    });
    await navigate(page, new URL('index.html', base).href);
    const arrived = await waitForURL(page, `/${test.locale}/index.html`);
    record(`Language-neutral entry selects ${test.tag}`, arrived && await page.eval((expected) => document.documentElement.lang === expected, test.locale));
    await page.send('Page.removeScriptToEvaluateOnNewDocument', { identifier });
  }

  const noScript = await browser.newPage({ width: 390, height: 900, mobile: true });
  await trackNetwork(noScript);
  await noScript.send('Emulation.setScriptExecutionDisabled', { value: true });
  for (const locale of locales) {
    await navigate(noScript, pageURL(locale));
    const fallback = await noScript.eval(() => ({
      inputDisabled: document.querySelector('#start-time').matches(':disabled'),
      radioDisabled: [...document.querySelectorAll('input[name="duration"]')].every((input) => input.matches(':disabled')),
      fieldsetDisabled: document.querySelector('[data-rhythm] fieldset').disabled,
      explanationVisible: !document.querySelector('[data-demo-fallback]').hidden && document.querySelector('[data-demo-fallback]').getBoundingClientRect().height > 0,
      outputVisible: !document.querySelector('.demo-output').hidden,
    }));
    record(`${locale}: no-script routine is an honest static example`, Object.values(fallback).every(Boolean), fallback);
    await noScript.eval(() => document.querySelectorAll('.faq-item summary')[1].focus());
    await pressSpace(noScript);
    record(`${locale}: no-script FAQ opens from keyboard`, await noScript.eval(() => document.querySelectorAll('.faq-item')[1].open));
  }
  await noScript.close();

  const reduced = await browser.newPage({ width: 390, height: 900, mobile: true, reducedMotion: true });
  await trackNetwork(reduced);
  for (const locale of locales) {
    await navigate(reduced, pageURL(locale));
    const visibility = await reduced.eval(() => ({
      reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      hiddenContent: [...document.querySelectorAll('[data-reveal]')].filter((element) => {
        const style = getComputedStyle(element);
        return style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0;
      }).map((element) => element.tagName),
      animations: document.getAnimations().filter((animation) => animation.playState === 'running').length,
    }));
    record(`${locale}: reduced motion keeps the content visible`, visibility.reduced && visibility.hiddenContent.length === 0 && visibility.animations === 0, visibility);
  }
  await reduced.close();

  await navigate(page, pathToFileURL(resolve(webRoot, 'en/index.html')).href);
  const directFile = await page.eval(() => ({
    protocol: location.protocol,
    lang: document.documentElement.lang,
    images: document.images.length,
    brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length,
    styled: getComputedStyle(document.body).backgroundColor === 'rgb(244, 245, 241)',
    demoEnabled: !document.querySelector('#start-time').disabled,
  }));
  record('Direct file opening loads local styles, images, and interaction', directFile.protocol === 'file:' && directFile.lang === 'en' && directFile.images >= 4 && directFile.brokenImages === 0 && directFile.styled && directFile.demoEnabled && page.consoleErrors.length === 0, directFile);
  record('Runtime resources stay on the site origin', report.network.externalRequests.length === 0, report.network.externalRequests);
  record('Runtime resource requests succeed', report.network.failedResponses.length === 0 && report.network.loadingFailures.length === 0, { responses: report.network.failedResponses, failures: report.network.loadingFailures });
  await page.close();
} catch (error) {
  record('Browser regression runner completes', false, error.stack || String(error));
} finally {
  if (browser) await browser.close();
  report.finishedAt = new Date().toISOString();
  report.summary = {
    pageChecks: report.pageChecks.length,
    checks: report.checks.length,
    failures: report.pageChecks.filter((check) => !check.pass).length + report.checks.filter((check) => !check.pass).length,
  };
  await mkdir(resolve(webRoot, 'qa'), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report.summary));
  console.log(`Report: ${reportPath}`);
  if (report.summary.failures) process.exitCode = 1;
}
