import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { content } from '../src/content.mjs';
import { legal } from '../src/legal.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const locales = ['zh-Hans', 'zh-Hant', 'en'];
const shape = (value) => Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)])) : typeof value;
for (const lang of locales) {
  assert.deepEqual(shape(content[lang]), shape(content.en), `${lang}: landing translations`);
  assert.deepEqual(shape(legal[lang]), shape(legal.en), `${lang}: legal translations`);
  assert.match(content[lang].rhythm.summaryTemplate, /\{start\}/);
  assert.match(content[lang].rhythm.summaryTemplate, /\{end\}/);
}

const context = vm.createContext({});
vm.runInContext(read('assets/rhythm.js'), context);
const { routine } = context.FastingRoutine;
// Check all starts at minute precision, including exact midnight and windows on either side of it.
for (let minute = 0; minute < 1440; minute++) {
  const start = `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
  for (const duration of [12, 14, 16]) {
    const result = routine(start, duration);
    assert.equal(result.endMinutes, (minute + duration * 60) % 1440);
    assert.equal(result.nextDay, minute + duration * 60 >= 1440);
    assert.equal(result.segments.reduce((sum, segment) => sum + segment.width, 0), 1440);
    assert.equal(result.segments.filter((segment) => segment.fasting).reduce((sum, segment) => sum + segment.width, 0), duration * 60);
  }
}
for (const value of ['', '24:00', '08:61', 'noon', '8:00']) assert.equal(routine(value, 16), null);

function detect(languages, preference, blocked = false) {
  let redirected;
  vm.runInNewContext(read('assets/language.js'), {
    URL, navigator: { languages },
    localStorage: { getItem: () => { if (blocked) throw Error('storage blocked'); return preference; } },
    location: { href: 'https://example.test/sub/index.html?ref=preview#rhythm', search: '?ref=preview', hash: '#rhythm', replace: (value) => { redirected = value; } },
  });
  return new URL(redirected);
}
for (const [languages, expected] of [
  [['zh-Hans-HK'], 'zh-Hans'], [['zh-Hant-CN'], 'zh-Hant'], [['zh-TW'], 'zh-Hant'],
  [['zh-HK'], 'zh-Hant'], [['zh-MO'], 'zh-Hant'], [['zh-CN'], 'zh-Hans'],
  [['ja-JP', 'zh-Hant'], 'zh-Hant'], [['fr-FR'], 'en'], [['en-GB'], 'en'],
]) {
  const url = detect(languages);
  assert.equal(url.pathname, `/sub/${expected}/index.html`);
  assert.equal(url.search, '?ref=preview');
  assert.equal(url.hash, '#rhythm');
}
assert.equal(detect(['en'], 'zh-Hant').pathname, '/sub/zh-Hant/index.html');
assert.equal(detect(['en'], 'unsupported').pathname, '/sub/en/index.html');
assert.equal(detect(['zh-Hant'], null, true).pathname, '/sub/zh-Hant/index.html');

const pages = ['index.html', ...locales.flatMap((lang) => ['index', 'privacy', 'terms', 'health'].map((page) => `${lang}/${page}.html`))];
let checkedLinks = 0;
for (const path of pages) {
  const html = read(path);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one h1`);
  assert.equal((html.match(/data-language=/g) || []).length, 3, `${path}: three language links`);
  assert.match(html, /href="mailto:hello@txxy\.in"/, `${path}: support contact`);
  if (!path.endsWith('index.html')) {
    assert.match(html, /class="effective-date"/, `${path}: effective date`);
    assert.doesNotMatch(html, /预发布草案|發佈前草案|尚未生效|pre-release draft|not yet in effect|will be added before launch/i, `${path}: final legal copy`);
  }
  if (path.endsWith('index.html')) {
    assert.match(html, /<fieldset disabled>/, `${path}: no-script controls disabled`);
    assert.match(html, /type="time"[^>]*disabled/, `${path}: no-script time disabled`);
    assert.match(html, /data-demo-fallback/, `${path}: visible static explanation`);
  }
  const assets = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of assets) {
    if (/^https?:/.test(reference)) continue;
    if (reference.startsWith('mailto:')) {
      assert.equal(reference, 'mailto:hello@txxy.in', `${path}: contact email`);
      continue;
    }
    const [file, fragment] = reference.split('#');
    const target = file ? resolve(root, dirname(path), file) : resolve(root, path);
    assert.ok(existsSync(target), `${path}: missing ${reference}`);
    if (fragment) assert.ok(readFileSync(target, 'utf8').includes(`id="${fragment}"`), `${path}: missing #${fragment}`);
    checkedLinks++;
  }
  for (const match of html.matchAll(/<(?:script|img|link)[^>]+(?:src|href)="([^"]+)"[^>]*>/g)) {
    if (match[0].includes('rel="alternate"')) continue;
    assert.ok(!/^https?:/.test(match[1]), `${path}: external runtime resource`);
  }
}
console.log(`PASS: 3 language trees, 9 legal documents, 4,320 routine cases, 12 language cases, no-script controls, ${checkedLinks} local links and assets.`);
