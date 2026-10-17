# Earmark 耳记静态网站

Morning Glass 风格的英／简中双语官网。无构建步骤、无 npm、无框架、无外部 JavaScript。八个页面均包含完整静态内容，关闭 JavaScript 仍可使用导航、语言切换、目录和常见问题。

## 本地预览

在项目根目录运行：

```sh
python3 -m http.server -d web
```

访问 `http://localhost:8000/`，简体中文为 `http://localhost:8000/zh/`。也可指定端口，例如 `python3 -m http.server 8765 --bind 127.0.0.1 -d web`。

## 文件结构

```text
web/
  index.html             英文首页
  privacy.html           英文隐私政策
  terms.html             英文使用条款
  support.html           英文支持
  zh/
    index.html           简体中文首页
    privacy.html         简体中文隐私政策
    terms.html           简体中文使用条款
    support.html         简体中文支持
  assets/
    site.css             唯一共享样式表
    site.js              可选的滚动天色增强与 App Store 地址常量
    phone-days.webp      日子设计预览
    phone-ask.webp       问问设计预览
    app-icon.png         站内品牌图标
    social-icon.png      OG / Twitter 分享图标
    apple-touch-icon.png iOS 主屏图标
    favicon.ico          16 / 32 / 48 像素 favicon
  robots.txt
  sitemap.xml
  README.md
```

## 部署

将 `web/` **内部内容**发布到任意支持静态文件和 HTTPS 的托管服务，发布根目录设为 `web/`，无需构建命令。保留 `zh/` 与 `assets/` 的相对结构，并让 `/` 和 `/zh/` 分别提供各自的 `index.html`。静态 HTML 不需要 SPA 重写或服务器端渲染。

上线前完成下方 TODO，并在真实域名检查双语页面、canonical、hreflang、OG 图片、robots 和 sitemap。可对版本化图片设置长期缓存，对 HTML 设置较短缓存；更新当前未带指纹的 CSS / JS 时需刷新缓存。

本次仅生成网站，**未部署，也未替换现有 App Store 网址**。`../docs/privacy.html` 和 `../docs/support.html` 保持原样；将来要替换 App Store Connect 中的地址时，再分别切换到新站的 `/privacy.html`、`/support.html`。

## 上线前 TODO / 占位项（完整清单）

1. **App Store 链接**：唯一的目的地址常量为 `assets/site.js` 中的 `APP_STORE_URL = "#"`。两个首页按钮均使用 `href="#"`、`data-appstore-link` 和 HTML 注释 `TODO: App Store URL`。获得正式地址后，替换该常量；若要求禁用 JS 时也可跳往商店，请同时同步两个 HTML 的回退 `href`。按钮已按正常下载按钮呈现，没有“Coming soon”变体。
2. **适用法律与管辖**：`terms.html#law` 和 `zh/terms.html#law` 保留醒目的 `[TODO: governing law / jurisdiction]`。由开发者确定真实适用法律与管辖地后填写，并同步中英版本。没有推测或指定任何司法管辖区；Apple 标准 EULA 的自身规定另行适用。
3. **站点基础 URL**：当前占位为 `https://earmark.txxy.in`。确认域名后，统一检查八个 HTML 的 canonical、hreflang、OG URL / 图片、Twitter 图片，以及 `robots.txt` 和 `sitemap.xml`。如果最终仍采用此域名，确认 HTTPS、DNS 和发布目录即可。

其余内容没有 lorem、虚构用户评价、未提供的功能、虚构下载量或虚构联系地址。价格和首发地区按本次需求与 `../SPEC.md` 的计划表述，未声称已上架，也没有虚构上架时间。

## 设计与内容决定

- 背景按浏览进度由 09:00 晨光过渡到 13:00 正午，再到 19:30 傍晚，使用 `../design/DESIGN.md` 的天色关键帧。关闭 JS 时保留晨光背景；系统减弱动态效果开启时固定晨光，取消平滑滚动和过渡。
- 只有首页一个自定义 App Store 样式下载按钮使用实心 `accentInk`，导航和其余链接保持轻量。卡片为白色约 58%、26px 模糊、75% 白色边框及 24px 圆角。为让傍晚的次要文字达到 4.5:1，天色上叠加 24% 白色可读性层；长篇政策正文用 82% 白色底，维持强调链接的对比度。iPhone 内容与站点均为浅色。
- Figtree 通过 Google Fonts 加载，中文优先回退 PingFang SC；无网络时使用系统字体。Google Fonts 和静态托管连接信息在隐私政策的网站专节说明；App 本身无统计或追踪 SDK。
- `phone-days.webp` 与 `phone-ask.webp` 仅裁取 `../design/design-demos/A-morning-glass.png` 中已有的两幅界面，不使用参考产品的截图或尚未实现的记忆／周回顾等原型画面。两个 WebP 合计约 62 KB。英文页也保留原型原有中文，并标注设计预览、演示内容与界面语言。
- 品牌与 favicon 均缩放自 `../Branding/AppIcon-1024.png`。社交分享选择方形 App 图标，Twitter 使用 `summary` 卡片。
- HTML 之间复制同一套导航／页脚，各页面按文件位置使用相对链接，语言切换始终前往当前页面的另一语言版本；canonical 与 sitemap 使用部署根路径。
- 支持邮件为 `hello@txxy.in`，开发者为 `txxy`；没有添加未提供的法律实体或注册地址。

## 产品事实核对

内容以本次需求、`../README.md`、`../SPEC.md`、现有 `../docs/privacy.html`、`../docs/support.html` 及以下源码为依据。README 中旧的“iPhone 不申请麦克风权限”描述与当前语音提问实现不一致，本站采用当前代码与现有隐私页的表述。

| 事项 | 当前依据与网站表述 |
| --- | --- |
| AI 请求数据 | `../Earmark/AI/ChatEngine.swift`、`DailySummaryService.swift`、`HourSummaryPolicy.swift`：问题、会话上下文、转写片段／时间引用、处理指令，以及日期／时区／语言等有限上下文；日总结可能分批处理。没有原声或健康数据。 |
| 自动小时摘要 | `../Earmark/AI/HourSummaryPolicy.swift`、`AIProvider.swift`：首次配置服务商后默认开启；小时结束且转写完成才请求；可关闭。 |
| 健康 | `../Earmark/Health/HealthStore.swift` 与 iPhone Info.plist：可选只读心率、静息心率、体能训练、睡眠、步数；内存缓存供显示，不发送 AI。 |
| 麦克风／语音提问 | 两个 target 的 Info.plist、`../Earmark/Transcription/AskDictationService.swift`、`../Earmark/Views/Ask/ChatView.swift`、`AskVoiceHold.swift`：Watch 全天录音；iPhone 按住本机听写，不保存语音，松手发送、上滑取消，60 秒到限发送；VoiceOver 有开始／停止控件。 |
| 保留与删除 | `../Earmark/Storage/AudioRetention.swift`、`RetentionCleaner.swift`、`LibraryReset.swift`、`../Earmark/EarmarkApp.swift`：默认 30 天，可选 7/14/30/90 天或永久；按维护任务删除过期音频，文字等保留；完整删除默认保留 Key，可选移除；手表录音独立控制。 |
| Keychain 与卸载 | `../Earmark/AI/AIProvider.swift`：device-only、不同步 Keychain。为避免沿用旧隐私页“卸载会删除全部数据”的绝对表述，本站明确卸载删除本地资料库，但 Keychain 可能仍保留，需在完整删除时勾选移除。此为系统持久化边界，并非承诺已做卸载实测。 |
| 无 iCloud 同步 | `../Earmark/PhoneAppModel.swift` 使用 `cloudKitDatabase: .none`。本站没有扩大为“用户的系统备份绝不包含 App 文件”。 |
| 许可协议 | [Apple 官方标准 EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/)；补充条款没有擅自套用其中的管辖地作为 txxy 的管辖地。 |

没有未核实而新增的功能承诺。App Store 正式 URL、最终管辖条款、正式发布域名仍须按上述 TODO 确认；真实续航、服务商实时可用性和发行时间均未作保证。

## 验收

验收采用一次性内联命令与真实 Chrome，不添加测试套件，也不保留生成脚本。

```text
HTML: PASS — 8 documents; balanced tags, unique IDs, 1 h1/page, lang and image alt present.
HTML5: PASS — strict html5lib parser accepted 8 documents with 0 errors.
LINKS: PASS — 276 internal references, 16 unique targets; 2 intentional App Store # placeholders.
HTTP: PASS — 18/18 unique pages/assets returned 200.
SITEMAP: PASS — valid XML; 8 URLs with 3 language alternates each.
LANGUAGE + META: PASS — all 8 counterpart links and hreflang sets match.
SHARED MARKUP: PASS — headers and footers are consistent within each language.
COPY SCAN: 0 matches; rg exit=1 (1 = no matches).
JAVASCRIPT: node --check exit=0.
SKY JS: PASS — morning → noon → evening; reduced-motion change resets to morning; short pages stay stable.
APP STORE: PASS — single destination constant remains # and binds data-appstore-link.
CONTRAST: white / accentInk = 5.40:1
CONTRAST: sub / darkest sky with contrast wash = 4.63:1
CONTRAST: accentInk / prose = 4.93:1
UNCHANGED: docs/privacy.html SHA256 3983032997e16b10
UNCHANGED: docs/support.html SHA256 2307467bae92c74c
GIT STATUS: ?? web/
SCOPE: PASS — only untracked web/; no commits created.
```

浏览器实际读取 `window.innerWidth` 和 `document.documentElement.scrollWidth`，并逐页检查图片。通过普通视口预览调整尺寸，以浏览器实际报告的 CSS 像素为准，未修改用户的缩放设置。

| 实际 CSS 视口 | 页面数 | 横向溢出 | 坏图 |
| --- | --- | --- | --- |
| 360px | 8 | 0 | 0 |
| 375px | 8 | 0 | 0 |
| 1440px | 8 | 0 | 0 |

已查看桌面完整首页、手机首页及政策／支持页面，修复 375px 下手机模型的 intrinsic grid 宽度溢出。真实浏览器操作确认：FAQ 可以通过 Enter 展开／收起，键盘焦点可见；首页语言切换及隐私页对应语言切换正常；滚动到 FAQ 后读取到 noon = 1、evening ≈ 0.787；控制台 warn/error 返回 `[]`。

HTML Tidy 5.8.0 另报 **0 errors、16 warnings**：8 项为用于绘图的空装饰元素，8 项为旧版本 Tidy 不识别的标准 `fetchpriority`、`decoding`、`aria-current` 属性。严格 HTML5 解析器确认 0 错误，没有为了消除旧校验器警告删掉可访问性或性能属性。

减弱动态效果通过独立内联 Node VM 执行真实 `site.js`，验证偏好变化立即固定晨光；对应 CSS 媒体查询取消平滑滚动及过渡。没有修改用户的系统动态效果偏好。
