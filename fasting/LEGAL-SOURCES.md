# 协议依据与运维核对

首次资料核对日期：2026-11-02；产品文案更新日期：2026-11-04。本文供项目维护者核查，不是面向访客的产品文案。`src/legal.mjs` 提供简体中文、繁体中文、英文的隐私政策、用户协议与健康免责声明。

九篇协议均为正式文本，生效日期为 2026-11-02，最后更新日期为 2026-11-04。主体采用“Fasting 开发与维护方”，联系邮箱为用户明确提供的 `hello@txxy.in`。未推断或虚构公司注册信息、自然人姓名或地址。

内容以当前实现为依据，不因采用正式文本就宣称适用于所有地区的完整法律合规。应用上架状态、托管运维与真机行为仍需以实际情况持续核对；本文件记录这些事实边界，不为用户增加审批步骤。

## 源码证据

| 文案事实 | 实际来源 |
| --- | --- |
| 应用名 Fasting，iOS 18 / watchOS 11 | `../project.yml`、`../README.md` |
| 当前无账号、广告、分析、AI 或自建服务器；Pro 为可选一次购买，商店商品待正式配置；尚未上架 | `../README.md`，并检索 Fasting、Shared、FastingWatch 中网络/SDK 调用 |
| 断食日志、计划及偏好在 App Group 共享 | `../Shared/SharedContainer.swift`、`../Shared/Platform/FastingModel.swift` |
| 配对手机和手表通过 WCSession 同步普通日志 | `../Shared/Platform/ConnectivityBridge.swift` |
| 删除全部数据、重置下次同步、已保存或分享的图片副本不受影响 | `../Fasting/Settings/SettingsView.swift`、`../Shared/Platform/FastingModel.swift` |
| 健康仅按类别读睡眠/体重/训练，不写样本 | `../Fasting/Health/HealthKitReader.swift` 的 `requestAuthorization(toShare: [], read: ...)` |
| 健康缓存最近最多 30 天 | `../Fasting/Health/HealthDataModel.swift`：从当天往前 29 天的零点开始，过滤窗口外记录；`../Fasting/Health/HealthSettingsView.swift` |
| 健康缓存在 iPhone 私有目录、完整文件保护、排除系统备份 | `../Fasting/Health/HealthCacheStore.swift` |
| 关闭类别、清缓存、全部删除的区别 | `../Fasting/Health/HealthDataModel.swift`、`../Fasting/Health/HealthSettingsView.swift` |
| 健康信息不进入 Watch、组件或记录分享图；晨间打卡只分享用户选定的健康项目 | `../Fasting/Health/HealthSettingsView.swift`、`../Fasting/Sharing/ShareProgressView.swift`、`../Fasting/Sharing/MorningCheckInView.swift`；普通同步只编码 Journal |
| 达标不自动结束，不承诺医疗效果 | `../DESIGN.md`、`../Fasting/Settings/HelpAndWidgetsView.swift` |
| 当前隐私清单不声明跟踪或收集数据类型 | `../Resources/PrivacyInfo.xcprivacy`；仅作为与源码相互核对的清单，不能单独证明实际行为 |
| 联系方式、正式稿要求与日期 | 用户提供 `hello@txxy.in` 并要求生成正式稿；生效日期为 2026-11-02，产品文案最后更新日期为 2026-11-04 |
| 主动联系带来的邮件信息 | 新增公开联系渠道会让维护方收到发件邮箱、正文和主动附上的资料；隐私政策已独立说明处理用途、保留与删除请求，不再把应用无服务器等同于任何渠道不处理信息 |

普通断食存储未作与健康缓存相同的“排除备份”声明，因此隐私政策没有把“健康缓存排除系统备份”扩大为“全部应用数据不会备份”。

## 外部第一手来源

以下来源于核对日实际读取；协议未复制其大段文字，也未把参考来源写成产品背书。本轮正式稿沿用此前已核对的医疗风险表述，没有新增效果或疾病治疗主张。

- [Apple App Review Guidelines，5.1.1 / 5.1.2 / 5.1.3](https://developer.apple.com/app-store/review/guidelines/#privacy)：核对隐私说明应覆盖的数据用途、保留/删除与撤权，以及健康数据的特定保护要求。政策的具体行为仍以上方源码为证据。
- [Johns Hopkins Medicine：Intermittent Fasting: What Is It, And How Does It Work?](https://www.hopkinsmedicine.org/health/expert-qa/intermittent-fasting-what-is-it-and-how-does-it-work)：页面标记更新于 2026-04-07。仅用于确认改变饮食前咨询医生、不适宜人群与不适时寻求帮助的保守表述，未采用效果宣传。

网络路线：按 agent-reach 的 Web / Jina Reader 路由尝试获取 Apple 页面，返回空内容；随后以 `web__run` 读取上述官方页面并定位原文。Apple HealthKit “Protecting user privacy” 页面本次只返回 JavaScript 壳，因此未将其列为已读实质来源。

## 网站实施约定

以下内容是与主实现者约定的静态站行为，交付检查必须重新核实：

- 本地静态字体/图片，无外部统计、广告、提交表单或 Cookie。
- localStorage 仅写入 `fasting-language`，不保存作息预览输入或健康信息。
- 作息预览只在浏览器内计算；网站不能读取应用数据，也不能启动应用中的记录。
- 外部资料通过普通链接打开，不嵌入外部脚本或资源。
- 邮箱通过普通联系链接提供，不在网站上代发邮件，也不增加收集资料的网页表单。
- 网络访问所需的 IP、请求时间、浏览器请求信息用于页面传输、安全排查与技术排障，由托管服务按实际配置处理。协议未声称固定供应商、保存天数或处理地区；访客可通过 `hello@txxy.in` 询问。具体托管配置仍需在部署时据实核对。

## 持续维护事项

- 维护公开联系邮箱 `hello@txxy.in` 的收件、回复与删除请求处理流程。本次未代发邮件，也未验证邮箱的实际送达或服务商配置。
- 协议公开网址与 App 内隐私政策入口随部署和发版保持一致。
- 实际上架地区、年龄/受众与商店年龄分级按发布安排核实，不将最低系统版本误写为年龄限制。
- 当前没有真实商店下载地址，应用尚未公开上架。上架状态和链接应随实际上架更新；价格以商店实际展示与购买前说明为准，不承诺永久免费。
- 托管/CDN/邮件服务的日志、保存期限、处理地区和跨境情况按实际配置处理；配置变化应及时反映到隐私说明与答复中。
- 三语协议在实际运营安排下持续保持含义一致，不预设某一语言优先。
- HealthKit 权限、文件保护、缓存、删除及离线配对设备同步的真机核对。

协议没有指定缺乏事实依据的管辖地或争议机构，也没有排除强制性消费者权利。采用正式文稿不代表已通过 App Store 审核、获得医疗许可或取得外部法律审核结论。
