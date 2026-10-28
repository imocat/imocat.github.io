# Between Frames 多语言官网

沿用 `DESIGN.md` 和已确认的 Darkroom 风格，语言范围与 `docs/PRD-between-frames-ios.md` A-16 一致。

每种语言提供独立的首页、隐私政策和使用条款，正文、标题、描述和无障碍标签已写入 HTML。关闭 JavaScript 或无法加载翻译文件时，仍可阅读对应语言；页脚语言链接可直接切换到同一页面的其他语言。

| 语言 | 首页 | 隐私政策 | 使用条款 |
| --- | --- | --- | --- |
| English | [en/index.html](en/index.html) | [en/privacy.html](en/privacy.html) | [en/terms.html](en/terms.html) |
| 简体中文 | [zh-Hans/index.html](zh-Hans/index.html) | [zh-Hans/privacy.html](zh-Hans/privacy.html) | [zh-Hans/terms.html](zh-Hans/terms.html) |
| 繁體中文 | [zh-Hant/index.html](zh-Hant/index.html) | [zh-Hant/privacy.html](zh-Hant/privacy.html) | [zh-Hant/terms.html](zh-Hant/terms.html) |
| 日本語 | [ja/index.html](ja/index.html) | [ja/privacy.html](ja/privacy.html) | [ja/terms.html](ja/terms.html) |
| 한국어 | [ko/index.html](ko/index.html) | [ko/privacy.html](ko/privacy.html) | [ko/terms.html](ko/terms.html) |

## 预览和部署

在项目根目录运行：

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory web
```

打开 `http://127.0.0.1:8000/zh-Hans/` 预览简体中文。部署时完整发布 `web/` 下的 HTML、`assets/`、五个语言目录及 `sitemap.xml`，无需服务端框架或运行时构建。

既有根目录 `index.html`、`privacy.html`、`terms.html` 保留浏览器语言匹配和 `?lang=` 切换，兼容 App 中已有的法律链接。独立语言路径优先于旧的浏览器偏好；在这些页面切换语言会跳转至对应路径，并保存选择，保留当前页面、查询参数和锚点。“跟随浏览器”匹配后也使用独立语言路径。页脚链接在禁用 JavaScript 时仍可用。

每页包含 canonical、五语 hreflang 和 x-default；`sitemap.xml` 列出 15 个独立页面。默认发布地址为 `https://www.txxy.in/between-frames/`。若域名或路径改变，同步修改 `generate_pages.py` 的 `SITE`、根 HTML 的 `language-metadata` 块以及首页 Open Graph 图片地址，再重新生成。

## 更新文案

英文基准来自根目录三份 HTML，其他四语来自 `assets/locales/*.json`。保留 `data-i18n` 键及 `language-metadata`、`language-links` 标记。更新源文件后运行：

```sh
PYTHONDONTWRITEBYTECODE=1 python3 web/generate_pages.py
PYTHONDONTWRITEBYTECODE=1 python3 web/generate_pages.py --check
python3 web/qa/check_localizations.py
node --check web/assets/i18n.js
```

生成器只使用 Python 标准库，写入五个语言目录和 `sitemap.xml`；不要手动编辑生成的 HTML。

## 浏览器验证

使用安装有 Playwright 的 Python 环境运行，可通过 `--executable-path` 指定本机 Chromium。默认打开可见窗口，macOS 优先将窗口放在内建屏幕，否则使用主屏幕；CI 可传 `--headless`。

```sh
PYTHONDONTWRITEBYTECODE=1 python3 web/qa/static_pages.py
PYTHONDONTWRITEBYTECODE=1 python3 web/qa/localization.py
```

`static_pages.py` 验证 15 页在三种宽度、JavaScript 开启和关闭时的正文、元信息、无障碍标签、链接、图片及溢出，也检查语言跳转、跟随浏览器、禁用存储和站点地图。`localization.py` 回归既有根页面的动态切换及英文回退。截图保存在忽略提交的 `qa/shots/`。
