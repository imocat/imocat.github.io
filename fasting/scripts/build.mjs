import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { landing, legalPage, locales } from '../src/render.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
for (const locale of locales) {
  await mkdir(resolve(root, locale), { recursive: true });
  await writeFile(resolve(root, locale, 'index.html'), landing(locale));
  for (const type of ['privacy', 'terms', 'health']) {
    await writeFile(resolve(root, locale, `${type}.html`), legalPage(locale, type));
  }
}
await writeFile(resolve(root, 'index.html'), landing('zh-Hans', true));
console.log('Built 3 localized landing pages, 9 legal documents, and the language entry page.');
