// These documents describe the implementation reviewed on 2026-11-04.
// Contact is user-provided; the effective date is the date of this formal version.
const section = (title, paragraphs, list) => ({ title, paragraphs, ...(list ? { list } : {}) });

export const legalLabels = {
  'zh-Hans': {
    effective: '生效日期：2026年11月2日',
    updated: '最后更新：2026年11月4日',
    back: '返回产品页',
    contents: '本页内容',
  },
  'zh-Hant': {
    effective: '生效日期：2026年11月2日',
    updated: '最後更新：2026年11月4日',
    back: '返回產品頁',
    contents: '本頁內容',
  },
  en: {
    effective: 'Effective: November 2, 2026',
    updated: 'Last updated: November 4, 2026',
    back: 'Back to Fasting',
    contents: 'On this page',
  },
};

export const legal = {
  'zh-Hans': {
    privacy: {
      title: '隐私政策',
      summary: '断食记录留在你的设备。可选健康数据留在 iPhone。你可以查看记录、分享图片或删除数据。',
      sections: [
        section('适用范围', [
          '本政策自 2026年11月2日起生效，说明 Fasting 开发与维护方（以下简称“我们”）在提供 Fasting 应用及产品网站时如何处理信息。隐私问题可联系 hello@txxy.in。',
          'Fasting 不需要账号。当前应用没有广告、行为分析、第三方 AI 服务或自建数据服务器。我们不出售个人数据。你主动通过邮件联系时提供的信息，按本政策“更新与联系”一节处理。',
        ]),
        section('断食记录', [
          '应用在设备上保存你设置的计划、实际开始与结束时间、目标与调整、可选支持反馈、显示偏好以及同步所需状态。它们用于计时、历史记录、统计、提醒和跨设备一致性。',
          '记录保留到你主动删除。普通记录可能受设备的系统备份与恢复设置影响；Fasting 没有自己的云备份服务。下文所说的健康缓存另有备份限制。',
        ]),
        section('手机、手表与组件', [
          '同一设备的应用与组件通过系统 App Group 共享断食记录。配对的 iPhone 和 Apple Watch 通过 Apple Watch Connectivity 同步断食日志、计划、偏好与删除状态。没有开发者服务器接收这些日志。',
          '同步由系统与连接状态决定。离线时，设备可各自保存操作；连接恢复后再同步。健康数据不进入上述共享或同步通道。',
        ]),
        section('可选健康数据', [
          '只有在你分别启用并向系统授权后，iPhone 才读取 Apple 健康中的睡眠、体重或训练记录，以及显示来源和日期所需的信息，用于个人趋势与记录提示。不连接健康数据也能使用断食功能。',
          '应用不向 Apple 健康写入样本。健康缓存覆盖最近最多 30 天的可读取记录，保存于 iPhone 私有、受系统文件保护的目录，并排除在系统备份之外。健康记录与提示不会发送到开发者服务器、手表、组件、广告或分析服务。',
        ]),
        section('授权与删除', [
          '在应用的健康数据设置中关闭某一类别，会停止该类别查询并清除它的本地缓存与相关提示；这不会改变系统授权，也不会删除 Apple 健康里的原始记录。系统读取权限可在 Apple 健康或系统设置中管理。',
          '“清除本地健康缓存”只删除缓存；如果类别仍启用，后续刷新可能重新读取。“删除全部数据”会重置计划与应用记录，并清除健康设置、缓存和查询位置；重置在配对设备下次同步时传递。防止旧副本恢复的删除状态可能保留。',
        ]),
        section('图片分享', [
          '只有你主动保存或调用分享时，图片才交给你选择的接收位置。记录分享图包含断食统计；晨间打卡图还可包含你选择显示的睡眠、体重与训练事实。分享前可逐项隐藏健康内容，请检查实际预览。',
          '你可以删除可查看的单条断食记录或全部应用数据。已发送或保存在其他位置的副本不会随之删除，需要在相应位置自行管理。',
        ]),
        section('可选 Pro 购买', [
          'Pro 付款和商店交易由 Apple 处理。应用保存商店验证后的购买权益，并在配对设备之间同步用于解锁的状态；不会把断食或健康记录提交给购买服务。删除应用记录不会取消一次购买。恢复购买使用你的 Apple 账户，详情见 Apple 的相应条款和隐私说明。',
        ]),
        section('产品网站', [
          '本网站不接收你的应用记录，不使用 Cookie、行为分析、广告脚本或提交表单。页面字体和图片来自网站自身的静态文件。作息预览仅在当前页面计算，不上传输入。',
          '浏览器本地存储只用于记住你的语言选择，键名为 fasting-language；可在浏览器的网站数据设置中清除。通过网络访问网站时，页面传输及安全排障所需的 IP 地址、请求时间和浏览器请求信息由托管服务按实际配置处理。有关访问日志的保存期限、处理地区或具体服务，请联系 hello@txxy.in。',
          '点击外部资料链接后，目标网站按它自己的政策处理访问。Apple 的系统服务也受其相应条款与隐私说明约束。',
        ]),
        section('更新与联系', [
          '如果数据处理方式改变，这份说明会同步更新。涉及新增用途或权限时，会在相应功能中先说明并按需取得授权。',
          '你可以通过 hello@txxy.in 联系我们，询问数据处理方式或提出查阅、更正、删除等请求。应用不持有服务器端的断食或健康档案；你也可以直接在设备上查看记录、分享图片、关闭健康类别或删除数据。适用法律赋予你的权利不因本政策而减少。',
          '你主动发邮件时，我们会收到发件邮箱、邮件内容及你选择附上的资料，仅用于回复和处理请求，并只在处理请求所需期间保留。你可通过同一邮箱请求删除这些信息；法律要求保留的部分会按适用要求处理。请勿发送与请求无关的健康细节。',
        ]),
      ],
    },
    terms: {
      title: '用户协议',
      summary: 'Fasting 帮助你记录自己选择的作息。你的身体感受和实际需要，应始终先于计时目标。',
      sections: [
        section('适用范围与生效', [
          '本协议自 2026年11月2日起生效，适用于 Fasting 开发与维护方（以下简称“我们”）提供的 Fasting 应用及相关网站功能。联系邮箱为 hello@txxy.in。',
          '单纯浏览网站不视为接受应用使用条款。下载、安装或实际使用应用前，请阅读并同意本协议；若不同意，请勿使用应用，仍可查阅网站公开说明。',
        ]),
        section('提供的功能', [
          'Fasting 提供作息计划、断食计时、记录调整、历史统计、可选提醒、手表与组件、图片分享，以及可选的健康记录趋势。网站的作息预览用于了解界面，不会启动应用中的记录。',
          '当前应用最低要求为 iOS 18，手表应用最低要求为 watchOS 11。具体功能还取决于设备、系统版本和授权状态。应用目前尚未在 App Store 公开上架；网站预览不代表已经可以下载。',
        ]),
        section('自主选择', [
          '你决定是否开始、调整或结束一条记录。达到设定目标不会自动结束记录，也不表示应该继续断食。应用不评估你是否适合断食，不开具饮食或治疗方案。',
          '预设时长与网站示例是可选的时间设置，不是个体化健康建议。请同时阅读健康免责声明，并在改变饮食安排前向合格医疗专业人士咨询。',
        ]),
        section('计时与可用性', [
          '提醒、组件刷新、实时活动与跨设备传输由系统调度，可能受到通知设置、连接、电量或系统限制影响。不要把它们用作医疗监测或紧急提醒。',
          '记录与统计依据你输入的时间及可读取资料计算。请核对误记、重叠记录与设备间冲突；应用显示不替代对原始资料的核实。',
        ]),
        section('你的数据与内容', [
          '你保留自己输入记录的权利，并可使用应用中的图片分享和删除功能。请在分享前检查图片中的时间、日期与统计，保护自己及他人的隐私。',
          '应用界面、品牌和网站内容的权利归其各自权利人所有。除适用法律允许或另获授权外，请勿冒用品牌或将他人的内容当作自己的产品发布。',
        ]),
        section('版本与费用', [
          'Fasting 提供免费基础功能和可选 Pro 一次购买。免费版可查看最近30个日历日的断食记录；更早记录继续保存在设备上，可用 Pro 查看。Pro 还包含完整组件、30天健康图表与高级分享样式，不自动续费。购买前会展示商店返回的当地价格与权益范围；商品尚未在该商店提供时无法购买。',
          'Apple 处理付款和商店交易信息。可在应用中恢复购买，退款通过 Apple 的购买支持渠道处理。退款后的 Pro 权益会按商店核对结果更新，免费基础功能仍可使用。',
          '功能与支持的系统版本可能随更新调整。影响数据处理或用户权利的变更，会更新相关说明；需要另行授权的功能会在使用前请求。你可以随时停止使用。',
        ]),
        section('权利与联系', [
          '本协议不排除适用法律赋予你的消费者权利，也不免除法律不允许免除的责任。不能仅凭此页面认定产品获得医疗许可、平台审核通过或任何机构背书。',
          '如有服务或条款问题，请通过 hello@txxy.in 联系我们。有关权利与责任按适用法律处理；本协议不限制你依法投诉、寻求救济或向有权机构提出请求的权利。',
        ]),
      ],
    },
    health: {
      title: '健康免责声明',
      summary: '记录时间，不判断身体。Fasting 不提供诊断、治疗，也不承诺减重或其他健康结果。',
      sections: [
        section('记录工具', [
          'Fasting 记录你自己选择的饮食时间安排，并展示已授权的个人记录。计时、目标、图表和提示不是医疗建议，不能替代合格医疗专业人士的判断。',
        ]),
        section('先确认适合自己', [
          '改变饮食安排前，请先咨询医生。未满 18 岁、怀孕或哺乳、有进食障碍史的人不应尝试间歇性断食。使用胰岛素的 1 型糖尿病患者也不应自行尝试。其他疾病或用药情况请由医生评估。',
        ]),
        section('身体不适时', [
          '如果出现不适，停止当前断食安排并寻求医疗帮助。不要为完成计时而忽视身体信号；紧急情况请使用当地急救渠道。应用与网站不提供紧急救助。',
        ]),
        section('时长不是健康分数', [
          '更长的记录不代表更健康。预设时长、累计天数和里程碑只描述时间与记录，不证明燃脂、自噬、代谢变化或疾病改善。你随时可以调整目标或结束记录。',
        ]),
        section('趋势的边界', [
          '睡眠、体重和训练趋势取决于来源、授权范围与记录覆盖。没有读取到的资料不等于零，也不能据此推断身体状态。个人记录之间的比较不证明断食造成了变化。',
          '“我饿了”入口和可选的 60 秒暂停用于留出决定的时间，不是饥饿治疗、心理治疗或继续断食的建议；你可以直接调整或结束。',
        ]),
        section('资料与联系', [
          '健康风险提示参考 Johns Hopkins Medicine 的公开患者教育资料，不代表该机构认可 Fasting。请与自己的医生讨论个人情况。',
          '本说明由 Fasting 开发与维护方提供，自 2026年11月2日起生效，最后更新于 2026年11月4日。产品问题可联系 hello@txxy.in；医疗问题请咨询合格医疗专业人士。',
        ]),
      ],
    },
  },
  'zh-Hant': {
    privacy: {
      title: '隱私政策',
      summary: '斷食紀錄留在你的裝置。選用的健康資料留在 iPhone。你可以查看紀錄、分享圖片或刪除資料。',
      sections: [
        section('適用範圍', [
          '本政策自 2026年11月2日起生效，說明 Fasting 開發與維護方（以下簡稱「我們」）在提供 Fasting App 及產品網站時如何處理資訊。隱私問題可聯絡 hello@txxy.in。',
          'Fasting 不需要帳號。目前 App 沒有廣告、行為分析、第三方 AI 服務或自建資料伺服器。我們不出售個人資料。你主動透過電子郵件聯絡時提供的資訊，依本政策「更新與聯絡」一節處理。',
        ]),
        section('斷食紀錄', [
          'App 在裝置上儲存你設定的計畫、實際開始與結束時間、目標與調整、選用的支持回饋、顯示偏好及同步所需狀態。這些資料用於計時、歷史紀錄、統計、提醒和跨裝置一致性。',
          '紀錄保留至你主動刪除。一般紀錄可能受裝置的系統備份與回復設定影響；Fasting 沒有自己的雲端備份服務。下文所述的健康快取另有備份限制。',
        ]),
        section('手機、手錶與小工具', [
          '同一裝置的 App 與小工具透過系統 App Group 共用斷食紀錄。配對的 iPhone 和 Apple Watch 透過 Apple Watch Connectivity 同步斷食日誌、計畫、偏好與刪除狀態。沒有開發者伺服器接收這些日誌。',
          '同步由系統與連線狀態決定。離線時，裝置可各自儲存操作；恢復連線後再同步。健康資料不會進入上述共用或同步管道。',
        ]),
        section('選用的健康資料', [
          '只有在你分別啟用並向系統授權後，iPhone 才會讀取 Apple 健康中的睡眠、體重或訓練紀錄，以及顯示來源和日期所需的資訊，用於個人趨勢與紀錄提示。不連接健康資料也能使用斷食功能。',
          'App 不會向 Apple 健康寫入樣本。健康快取涵蓋最近最多 30 天可讀取的紀錄，儲存於 iPhone 私有、受系統檔案保護的目錄，並排除在系統備份之外。健康紀錄與提示不會傳送至開發者伺服器、手錶、小工具、廣告或分析服務。',
        ]),
        section('授權與刪除', [
          '在 App 的健康資料設定中關閉某個類別，會停止該類別查詢並清除其本機快取與相關提示；這不會變更系統授權，也不會刪除 Apple 健康中的原始紀錄。系統讀取權限可在 Apple 健康或系統設定中管理。',
          '「清除本機健康快取」只會刪除快取；若類別仍啟用，之後重新整理可能再次讀取。「刪除全部資料」會重設計畫與 App 紀錄，並清除健康設定、快取和查詢位置；重設會在配對裝置下次同步時傳遞。用於防止舊副本恢復的刪除狀態可能保留。',
        ]),
        section('圖片分享', [
          '只有你主動儲存或分享時，圖片才會交給你選擇的接收位置。紀錄分享圖包含斷食統計；晨間打卡圖還可包含你選擇顯示的睡眠、體重與訓練事實。分享前可逐項隱藏健康內容，請檢查實際預覽。',
          '你可以刪除可查看的單筆斷食紀錄或全部 App 資料。已傳送或儲存在其他位置的副本不會一併刪除，需在相應位置自行管理。',
        ]),
        section('可選 Pro 購買', [
          'Pro 付款和商店交易由 Apple 處理。應用程式儲存商店驗證後的購買權益，並在配對裝置之間同步用於解鎖的狀態；不會把斷食或健康記錄提交給購買服務。刪除應用程式記錄不會取消一次購買。回復購買使用你的 Apple 帳號，詳情見 Apple 的相關條款和隱私說明。',
        ]),
        section('產品網站', [
          '本網站不會接收你的 App 紀錄，不使用 Cookie、行為分析、廣告指令碼或提交表單。頁面字體和圖片來自網站本身的靜態檔案。作息預覽僅在目前頁面計算，不會上傳輸入。',
          '瀏覽器本機儲存空間只用於記住你的語言選擇，索引鍵為 fasting-language；可在瀏覽器的網站資料設定中清除。透過網路存取網站時，頁面傳輸及安全排查所需的 IP 位址、請求時間和瀏覽器請求資訊，由託管服務依實際設定處理。有關存取日誌的保存期限、處理地區或具體服務，請聯絡 hello@txxy.in。',
          '點選外部資料連結後，目標網站會依自己的政策處理存取。Apple 的系統服務亦受其相應條款與隱私說明約束。',
        ]),
        section('更新與聯絡', [
          '若資料處理方式改變，這份說明會同步更新。涉及新增用途或權限時，會在相應功能中先行說明，並視需要取得授權。',
          '你可以透過 hello@txxy.in 聯絡我們，詢問資料處理方式或提出查閱、更正、刪除等請求。App 不持有伺服器端的斷食或健康檔案；你也可以直接在裝置上查看紀錄、分享圖片、關閉健康類別或刪除資料。適用法律賦予你的權利不因本政策而減少。',
          '你主動寄送電子郵件時，我們會收到寄件信箱、郵件內容及你選擇附上的資料，僅用於回覆和處理請求，並只在處理請求所需期間保留。你可透過同一信箱請求刪除這些資訊；法律要求保留的部分會依適用要求處理。請勿寄送與請求無關的健康細節。',
        ]),
      ],
    },
    terms: {
      title: '使用者協議',
      summary: 'Fasting 協助你記錄自己選擇的作息。你的身體感受和實際需要，應始終先於計時目標。',
      sections: [
        section('適用範圍與生效', [
          '本協議自 2026年11月2日起生效，適用於 Fasting 開發與維護方（以下簡稱「我們」）提供的 Fasting App 及相關網站功能。聯絡信箱為 hello@txxy.in。',
          '單純瀏覽網站不視為接受 App 使用條款。下載、安裝或實際使用 App 前，請閱讀並同意本協議；若不同意，請勿使用 App，仍可查閱網站公開說明。',
        ]),
        section('提供的功能', [
          'Fasting 提供作息計畫、斷食計時、紀錄調整、歷史統計、選用提醒、手錶與小工具、圖片分享，以及選用的健康紀錄趨勢。網站的作息預覽用於了解介面，不會啟動 App 中的紀錄。',
          '目前 App 最低要求為 iOS 18，手錶 App 最低要求為 watchOS 11。實際功能亦取決於裝置、系統版本和授權狀態。App 目前尚未在 App Store 公開上架；網站預覽不代表已可下載。',
        ]),
        section('自主選擇', [
          '你決定是否開始、調整或結束一筆紀錄。達到設定目標不會自動結束紀錄，也不表示應繼續斷食。App 不會評估你是否適合斷食，也不提供飲食處方或治療計畫。',
          '預設時長與網站範例是可選的時間設定，並非個人化健康建議。請同時閱讀健康免責聲明，並在改變飲食安排前諮詢合格醫療專業人員。',
        ]),
        section('計時與可用性', [
          '提醒、小工具更新、即時動態與跨裝置傳輸由系統排程，可能受通知設定、連線、電量或系統限制影響。請勿將它們用於醫療監測或緊急提醒。',
          '紀錄與統計依你輸入的時間及可讀取資料計算。請查核誤記、重疊紀錄與裝置間的衝突；App 顯示不能取代對原始資料的確認。',
        ]),
        section('你的資料與內容', [
          '你保留自行輸入紀錄的權利，並可使用 App 中的圖片分享和刪除功能。分享前請檢查圖片中的時間、日期與統計，保護自己及他人的隱私。',
          'App 介面、品牌和網站內容的權利歸各自權利人所有。除適用法律允許或另獲授權外，請勿冒用品牌，或將他人的內容當成自己的產品發佈。',
        ]),
        section('版本與費用', [
          'Fasting 提供免費基本功能和可選 Pro 一次購買。免費版可查看最近30個日曆日的斷食紀錄；更早紀錄繼續儲存在裝置上，可用 Pro 查看。Pro 還包含完整小工具、30天健康圖表與進階分享樣式，不自動續費。購買前會顯示商店傳回的當地價格與權益範圍；商品尚未在該商店提供時無法購買。',
          'Apple 處理付款和商店交易資訊。可在應用程式中回復購買，退款透過 Apple 的購買支援管道處理。退款後的 Pro 權益會依商店核對結果更新，免費基本功能仍可使用。',
          '功能與支援的系統版本可能隨更新調整。影響資料處理或使用者權利的變更，會更新相關說明；需要另行授權的功能會在使用前請求。你可以隨時停止使用。',
        ]),
        section('權利與聯絡', [
          '本協議不排除適用法律賦予你的消費者權利，也不免除法律不允許免除的責任。不能僅憑此頁面認定產品取得醫療許可、通過平台審核或獲任何機構背書。',
          '若有服務或條款問題，請透過 hello@txxy.in 聯絡我們。有關權利與責任依適用法律處理；本協議不限制你依法申訴、尋求救濟或向有權機構提出請求的權利。',
        ]),
      ],
    },
    health: {
      title: '健康免責聲明',
      summary: '記錄時間，不判斷身體。Fasting 不提供診斷、治療，也不承諾減重或其他健康結果。',
      sections: [
        section('紀錄工具', [
          'Fasting 記錄你自行選擇的飲食時間安排，並顯示已授權的個人紀錄。計時、目標、圖表和提示並非醫療建議，不能取代合格醫療專業人員的判斷。',
        ]),
        section('先確認適合自己', [
          '改變飲食安排前，請先諮詢醫師。未滿 18 歲、懷孕或哺乳、有飲食失調病史的人不應嘗試間歇性斷食。使用胰島素的第一型糖尿病患者也不應自行嘗試。其他疾病或用藥情況請由醫師評估。',
        ]),
        section('身體不適時', [
          '若出現不適，停止目前的斷食安排並尋求醫療協助。不要為了完成計時而忽略身體訊號；緊急情況請使用當地急救管道。App 與網站不提供緊急救助。',
        ]),
        section('時長不是健康分數', [
          '更長的紀錄不代表更健康。預設時長、累積天數和里程碑只描述時間與紀錄，不證明燃脂、自噬、代謝變化或疾病改善。你隨時可以調整目標或結束紀錄。',
        ]),
        section('趨勢的界線', [
          '睡眠、體重和訓練趨勢取決於來源、授權範圍與紀錄涵蓋程度。未讀取到的資料不等於零，也不能據此推斷身體狀態。個人紀錄之間的比較不證明斷食造成了變化。',
          '「我餓了」入口和選用的 60 秒暫停用於留出決定的時間，並非飢餓治療、心理治療或繼續斷食的建議；你可以直接調整或結束。',
        ]),
        section('資料與聯絡', [
          '健康風險提示參考 Johns Hopkins Medicine 的公開病人教育資料，不代表該機構認可 Fasting。請與自己的醫師討論個人情況。',
          '本說明由 Fasting 開發與維護方提供，自 2026年11月2日起生效，最後更新於 2026年11月4日。產品問題可聯絡 hello@txxy.in；醫療問題請諮詢合格醫療專業人員。',
        ]),
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy policy',
      summary: 'Fasting records stay on your devices. Optional health data stays on your iPhone. You can view records, share images or delete data.',
      sections: [
        section('Scope', [
          'This policy takes effect on November 2, 2026. It describes how the developer and maintainer of Fasting (“we”) handles information when providing the Fasting app and product website. Contact hello@txxy.in about privacy.',
          'Fasting needs no account. The current app has no advertising, behavioral analytics, third-party AI service or developer-operated data server. We do not sell personal data. Information you send when contacting us by email is handled as described under Changes and contact.',
        ]),
        section('Fasting records', [
          'The app stores your plan, actual start and end times, goals and adjustments, optional support feedback, display preferences and synchronization state on your devices. These support timing, history, statistics, reminders and consistency between devices.',
          'Records remain until you delete them. Ordinary records may be affected by your device’s system backup and restore settings. Fasting has no cloud backup service of its own. The health cache described below has separate backup restrictions.',
        ]),
        section('Phone, Watch and widgets', [
          'The app and widgets on the same device share fasting records through a system App Group. A paired iPhone and Apple Watch synchronize the fasting journal, plan, preferences and deletion state through Apple Watch Connectivity. No developer server receives these journals.',
          'Synchronization depends on the system and connectivity. Devices can save actions offline and synchronize after reconnecting. Health data does not enter these sharing or synchronization channels.',
        ]),
        section('Optional health data', [
          'Only after you enable a category and grant system access does the iPhone read sleep, weight or workout records from Apple Health, including the information needed to show their sources and dates. These support personal trends and record-based hints. Fasting features work without health access.',
          'The app writes no samples to Apple Health. Its health cache covers up to 30 recent days of readable records in private, system-protected iPhone files excluded from system backups. Health records and hints are not sent to developer servers, Watch, widgets, advertising or analytics services.',
        ]),
        section('Permissions and deletion', [
          'Turning off a category in the app stops its queries and clears its local cache and related hints. This does not change system permissions or delete original records in Apple Health. Manage system read permissions in Apple Health or system Settings.',
          'Clear local health cache removes cached records only; enabled categories may be read again on a later refresh. Delete all data resets the plan and app records and clears health settings, caches and query positions. The reset reaches your paired device on its next synchronization. Deletion state that prevents old copies from returning may remain.',
        ]),
        section('Image sharing', [
          'Images go to a destination you select only when you choose to save or share them. Record-sharing images contain fasting statistics. Morning check-in cards can also include the sleep, weight and workout facts you choose to show. You can hide each health category before sharing; check the actual preview.',
          'You can delete individual fasting records within your viewing range or all app data. Copies already sent or saved elsewhere are not removed with them. Manage those copies at their destination.',
        ]),
        section('Optional Pro purchase', [
          'Apple handles Pro payments and store transactions. The app saves store-verified purchase access and synchronizes unlock status between paired devices. Fasting and health records are not submitted to the purchase service. Deleting app records does not cancel a one-time purchase. Restoring uses your Apple Account and is subject to Apple’s applicable terms and privacy notices.',
        ]),
        section('Product website', [
          'This website does not receive your app records. It uses no cookies, behavioral analytics, advertising scripts or submission forms. Fonts and images are local static files. The routine preview calculates within the current page and does not upload your input.',
          'Browser local storage remembers only your language choice under the key fasting-language. Clear it in your browser’s site-data settings. When you access the website over the network, the hosting service processes IP addresses, request times and browser request information needed to deliver pages and investigate security or technical issues, according to its actual configuration. Contact hello@txxy.in for information about access-log retention, processing locations or the service involved.',
          'Following an external resource link takes you to a website governed by its own policies. Apple’s system services are also governed by their applicable terms and privacy notices.',
        ]),
        section('Changes and contact', [
          'This notice will be updated if data handling changes. New uses or permissions will be explained in the relevant feature, with authorization requested where needed.',
          'Contact hello@txxy.in to ask about data handling or request access, correction or deletion. The app holds no fasting or health profile on a server. You can also view records, share images, delete data or turn off health categories directly on your device. This policy does not reduce rights provided by applicable law.',
          'When you email us, we receive your sender address, message and any information you choose to attach. We use these only to reply and handle your request, and retain them only for as long as that requires. You can request their deletion at the same address; any information that must legally be retained is handled as applicable law requires. Please do not email health details unrelated to your request.',
        ]),
      ],
    },
    terms: {
      title: 'Terms of use',
      summary: 'Fasting helps you record a routine you choose. How you feel and what you need should always come before a timer.',
      sections: [
        section('Scope and effective date', [
          'These terms take effect on November 2, 2026 and apply to the Fasting app and related website features provided by the developer and maintainer of Fasting (“we”). Our contact address is hello@txxy.in.',
          'Simply browsing the website does not constitute acceptance of the app’s terms of use. Read and agree to these terms before downloading, installing or using the app. If you do not agree, do not use the app; you may still read the website’s public information.',
        ]),
        section('What Fasting provides', [
          'Fasting offers routine planning, fasting timers, record adjustments, history, optional reminders, Watch and widgets, image sharing, and optional health-record trends. The website’s routine preview demonstrates the interface; it does not start a record in the app.',
          'The current app requires iOS 18 or later; the Watch app requires watchOS 11 or later. Feature availability also depends on your device, system version and permissions. The app is not yet publicly listed on the App Store; a website preview does not mean it is available to download.',
        ]),
        section('Your choice', [
          'You decide whether to start, adjust or end a record. Reaching your goal does not automatically end the record or mean you should keep fasting. The app does not assess whether fasting is suitable for you or prescribe a diet or treatment.',
          'Preset durations and website examples are optional time settings, not personalized health advice. Read the health disclaimer and consult a qualified healthcare professional before changing your eating routine.',
        ]),
        section('Timing and availability', [
          'Reminders, widget refreshes, Live Activities and transfers between devices are scheduled by the system. Notification settings, connectivity, battery and system limits may affect them. Do not use them for medical monitoring or emergency alerts.',
          'Records and statistics depend on entered times and available records. Review mistaken entries, overlapping records and conflicts between devices. App displays do not replace checking the underlying information.',
        ]),
        section('Your data and content', [
          'You retain your rights in the records you enter and can use the app’s image-sharing and deletion controls. Check dates, times and totals before sharing an image, and respect your own and others’ privacy.',
          'Rights in the app interface, brand and website content belong to their respective owners. Do not impersonate the brand or publish another person’s content as your own product, except as permitted by applicable law or authorization.',
        ]),
        section('Versions and pricing', [
          'Fasting has free basic features and an optional one-time Pro purchase. The free version shows the last 30 calendar days of fasting records. Earlier records stay on your device and can be viewed with Pro. Pro also includes the full widget collection, 30-day health charts and additional sharing styles, with no automatic renewal. The local store price and included features are shown before purchase. You cannot buy Pro where the store has not made the product available.',
          'Apple handles payment and store transaction information. You can restore purchases in the app and request a refund through Apple purchase support. Pro access updates when the store verifies a refund; free basic features remain available.',
          'Features and supported system versions may change with updates. Changes affecting data handling or user rights will update the relevant notices; features needing separate permission will ask before use. You may stop using the app at any time.',
        ]),
        section('Rights and contact', [
          'These terms do not exclude consumer rights under applicable law or remove liability that cannot lawfully be excluded. This page is not evidence of medical clearance, platform approval or endorsement by any organization.',
          'Contact hello@txxy.in with service or terms questions. Rights and responsibilities are governed by applicable law. These terms do not limit your right to make a complaint, seek a remedy or submit a request to a competent authority.',
        ]),
      ],
    },
    health: {
      title: 'Health disclaimer',
      summary: 'A timer records time, not your health. Fasting does not diagnose, treat or promise weight loss or other health outcomes.',
      sections: [
        section('A recording tool', [
          'Fasting records an eating schedule you choose and displays personal records you authorize. Timers, goals, charts and hints are not medical advice and do not replace a qualified healthcare professional’s judgment.',
        ]),
        section('Check suitability first', [
          'Consult a doctor before changing your eating routine. People under 18, those pregnant or breastfeeding, and those with a history of eating disorders should not try intermittent fasting. People with type 1 diabetes using insulin should not try it on their own. Discuss other conditions or medicines with your doctor.',
        ]),
        section('If you feel unwell', [
          'Stop the fasting routine and seek medical help if you feel unwell. Do not ignore symptoms to finish a timer. Use local emergency services in an emergency; the app and website do not provide emergency assistance.',
        ]),
        section('Time is not a health score', [
          'A longer record does not mean better health. Preset durations, accumulated days and milestones describe time and records. They do not establish fat burning, autophagy, metabolic changes or improvement in disease. You can adjust a goal or end a record at any time.',
        ]),
        section('Limits of trends', [
          'Sleep, weight and workout trends depend on their sources, permissions and record coverage. Missing records do not mean zero and cannot establish your physical condition. Comparisons between personal records do not show that fasting caused a change.',
          'The “I feel hungry” entry and optional 60-second pause leave time for a decision. They are not hunger treatment, mental-health treatment or advice to continue fasting. You can adjust or end directly.',
        ]),
        section('Sources and contact', [
          'Risk information draws on public patient-education material from Johns Hopkins Medicine. This does not imply its endorsement of Fasting. Discuss your individual circumstances with your doctor.',
          'This notice is provided by the developer and maintainer of Fasting. It takes effect on November 2, 2026 and was last updated on November 4, 2026. Contact hello@txxy.in about the product; consult a qualified healthcare professional about medical questions.',
        ]),
      ],
    },
  },
};
