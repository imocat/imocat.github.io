import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { legal, legalLabels } from '../src/legal.mjs';

const languages = ['en', 'zh-Hans', 'zh-Hant'];
const documentTypes = ['privacy', 'terms'];
const output = new URL('../../Resources/Legal/LegalDocuments.json', import.meta.url);
const arguments_ = process.argv.slice(2);
if (arguments_.some(argument => argument !== '--check')) {
  throw new Error('Usage: node web/scripts/build-app-legal.mjs [--check]');
}

function text(value, name) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${name} must be a non-empty string.`);
  return value;
}

function fields(value, allowed, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name} must be an object.`);
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) throw new Error(`${name}.${key} has no native renderer; update it before generating.`);
  }
}

function texts(values, name, required = false) {
  if (!Array.isArray(values) || (required && !values.length)) throw new Error(`${name} must be an array${required ? ' with content' : ''}.`);
  return values.map((value, index) => text(value, `${name}[${index}]`));
}

function references(values = [], name) {
  if (!Array.isArray(values)) throw new Error(`${name} must be an array.`);
  return values.map((reference, index) => {
    const path = `${name}[${index}]`;
    fields(reference, ['title', 'label', 'url', 'href'], path);
    const title = text(reference.title ?? reference.label, `${path}.title`);
    const url = text(reference.url ?? reference.href, `${path}.url`);
    if (!['https:', 'http:', 'mailto:'].includes(new URL(url).protocol)) {
      throw new Error(`${path}.url must be an existing web or email reference.`);
    }
    return { title, url };
  });
}

const documents = {};
for (const language of languages) {
  const labels = legalLabels[language];
  if (!labels) throw new Error(`Missing legal labels for ${language}.`);
  documents[language] = {};
  for (const type of documentTypes) {
    const path = `${language}.${type}`;
    const source = legal[language]?.[type];
    fields(source, ['title', 'summary', 'sections', 'refs'], path);
    if (!Array.isArray(source.sections) || !source.sections.length) throw new Error(`${path}.sections must contain the complete document.`);
    documents[language][type] = {
      title: text(source.title, `${path}.title`),
      summary: text(source.summary, `${path}.summary`),
      effective: text(labels.effective, `${language}.effective`),
      updated: text(labels.updated, `${language}.updated`),
      sections: source.sections.map((section, index) => {
        const name = `${path}.sections[${index}]`;
        fields(section, ['title', 'paragraphs', 'list', 'refs'], name);
        return {
          title: text(section.title, `${name}.title`),
          paragraphs: texts(section.paragraphs, `${name}.paragraphs`, true),
          list: texts(section.list ?? [], `${name}.list`),
          refs: references(section.refs, `${name}.refs`),
        };
      }),
      refs: references(source.refs, `${path}.refs`),
    };
  }
}

const generated = `${JSON.stringify({ version: 1, documents }, null, 2)}\n`;
if (arguments_.includes('--check')) {
  let existing;
  try { existing = await readFile(output, 'utf8'); }
  catch { throw new Error('Missing LegalDocuments.json. Run node web/scripts/build-app-legal.mjs.'); }
  if (existing !== generated) throw new Error('LegalDocuments.json is out of date. Run node web/scripts/build-app-legal.mjs.');
  console.log('App legal resources match all 6 source documents.');
} else {
  await mkdir(new URL('.', output), { recursive: true });
  await writeFile(output, generated);
  console.log('Generated 6 app legal documents in Resources/Legal/LegalDocuments.json.');
}
