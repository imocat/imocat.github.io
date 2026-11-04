# Fasting 产品网站

无依赖静态站，支持简体中文、繁体中文和英文。包含产品单页、隐私政策、用户协议与健康免责声明。所有页面都已生成，可直接打开 `index.html`；关闭 JavaScript 后仍可阅读页面、切换语言和展开常见问题，作息演示显示明确标注的固定示例。

## 预览与校验

从项目根目录执行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory web
```

打开 `http://127.0.0.1:4173/`。首页根据浏览器语言或上次手动选择跳转；直接访问语言目录始终保留明确选择。

- 简体：`zh-Hans/index.html`
- 繁体：`zh-Hant/index.html`
- 英文：`en/index.html`

每个目录都包含 `privacy.html`、`terms.html`、`health.html`。协议页切换语言时保持当前文档，落地页切换时保持 URL 锚点。手动选择仅在浏览器本地存储 `fasting-language`，无 Cookie、埋点、表单或外部运行资源。

```sh
# 修改文案/模板后重新生成 HTML；Node 22，无需 npm install
node web/scripts/build.mjs
# 校验三语完整性、时间算法、默认语言、静态降级与本地链接
node web/scripts/check.mjs
```

## 文件职责

- `src/content.mjs`：三语页面文字。
- `src/legal.mjs`：三语正式协议。
- `src/render.mjs`：HTML 模板与语言路由。
- `assets/site.css`：品牌、响应式与减少动态效果。
- `assets/site.js`：语言偏好、作息交互与 FAQ。
- `assets/language.js`：仅根入口的语言检测。
- `assets/rhythm.js`：无存储、无网络的时间窗口计算。
- `assets/screens/sources.json`：全部项目原始截图的相对路径。
- `qa/`：浏览器检测、截图与审查记录。

页面已同步当前应用的断食橙色、进食亮绿和鼠尾草绿支持面板；完整展示记录页的周日期栏与连续打卡，并独立介绍健康页的摘要和趋势。三语文案同时说明免费版最近 30 天历史、7 天健康图表及 Pro 权益。

所有截图来自本项目当前源码运行的实际应用。今天、记录、健康与支持均提供三语截图；手表中文截图在简繁页面共用。原始 iPhone 截图保存在 `qa/app-current/`，网页使用等比例缩小的版本，原图对应关系见 `assets/screens/sources.json`。截图使用 DEBUG 演示夹具，未使用客户评价、效果证明或访客健康数据。没有使用外部照片、付费字体或库存图片。

`qa/capture/` 提供独立素材捕获脚本，不修改应用或既有测试目标。`scripts/browser-check.mjs` 可配合 CDP 驱动校验三语页面和交互，并将 1440／768／390px 网页截图写入 `qa/ui-sync/`；本轮同步记录见 `qa/2026-11-04-ui-sync.md`。

## 协议与联系

三语隐私政策、用户协议和健康免责声明均为正式文本，生效日期为 2026-11-02，最后更新日期为 2026-11-04。服务提供者表述为 Fasting 开发与维护方，支持和隐私联系方式统一为 `hello@txxy.in`。网页页脚和协议正文均提供邮件链接。主动发送邮件时的信息处理已在隐私政策中说明。

应用当前尚未上架，因此主要操作仍是体验作息演示，没有虚构下载链接。正式协议不表示应用已经发布或网站已经部署。源码与官方资料依据见 `LEGAL-SOURCES.md`；下载入口和实际托管设置随发布配置维护。

直接部署静态文件即可，无需服务端和 URL 重写。公开部署时建议仅发布根 `index.html`、三个语言目录和 `assets/`，不要公开 `src/`、`scripts/`、`qa/` 等维护资料。
