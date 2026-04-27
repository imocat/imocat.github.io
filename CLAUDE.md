# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a GitHub Pages site (domain: `www.txxy.in`) that serves two purposes:
1. A Jekyll-powered personal blog (based on the "Nice Blog" theme)
2. Static landing pages for macOS apps/products

## Build & Development Commands

### Jekyll Site
The root site uses Jekyll. Helper scripts exist in the repo root:

- **Build**: `jekyll b` (or run `./b.sh` which installs jekyll if missing)
- **Serve locally**: `jekyll s` (or run `./s.sh`)

### Product Pages

Product subdirectories are mostly static HTML/CSS/JS and do not go through Jekyll:

- `/mindmap-studio/` — Static HTML landing page. Has a `vite.config.mjs` for local dev server. Run with `npx vite` from within the `mindmap-studio/` directory.
- `/keyaura/` — Static HTML with multi-language support (`languages.js`)
- `/HotMyKey/` — Static HTML with multi-language support (`languages.js`)
- `/launcheros/` — Static HTML landing page
- `/products/` — Static HTML product directory page

There is no package.json, test suite, or linting configuration in this repository.

## Architecture

### Jekyll Blog Structure
- `_config.yml` — Site config. Uses `baseurl: ""` and `url: "https://imocat.github.io"`
- `_layouts/` — `default.html`, `page.html`, `post.html`
- `_includes/` — `head.html`, `header.html`, `footer.html`, `foot.html`, `skillstree.html`
- `_posts/` — Blog posts
- `_sass/` — SCSS partials
- `css/main.css` — Main stylesheet

Front matter in pages uses `layout: default` or `layout: page`. The `page` layout includes a post-header with title/subtitle; `default` does not.

### Product Landing Pages
Product pages are **self-contained static HTML files** that do not use Jekyll layouts. They include their own `<head>`, styles, and scripts inline or via relative paths. This means:

- Editing a product page does not affect the Jekyll blog structure.
- Product pages must maintain their own navigation, meta tags, and responsive design.
- `mindmap-studio/` is the only product page with a build tool (Vite); the rest are hand-written static files.

### Key Files by Product
- **Mindmap Studio**: `index.html`, `privacy.html`, `styles.css`, `main.js`, `vite.config.mjs`
- **KeyAura**: `index.html` (React SPA via CDN-built assets in `assets/`), `support.html`, `privacy.html`, plus zh-hans/zh-hant variants
- **HotMyKey**: `index.html`, `style.css`, `script.js`, `languages.js`
- **LauncherOS**: `index.html`, `privacy-policy.html`

## GitHub Pages Deployment

The site deploys automatically from the `master` branch via GitHub Pages. The `CNAME` file contains `www.txxy.in`. No CI/CD configuration exists; deployment is handled natively by GitHub Pages.
