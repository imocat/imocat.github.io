(() => {
  "use strict";

  const config = window.NIUM_SITE || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const iconPath = (name) => `#i-${name}`;
  const dialog = $("#adopt-dialog");

  $$('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
  $$('[data-operator]').forEach((element) => {
    element.textContent = config.operatorName ? `· ${config.operatorName}` : "";
  });
  $$('[data-contact-email]').forEach((link) => {
    if (!config.contactEmail) return;
    link.href = `mailto:${config.contactEmail}`;
    link.textContent = config.contactEmail;
    link.hidden = false;
  });

  function storeURL() {
    try {
      const url = new URL(config.appStoreUrl);
      return url.protocol === "https:" && url.hostname === "apps.apple.com" ? url.href : null;
    } catch {
      return null;
    }
  }

  const downloadURL = storeURL();
  $$('[data-download]').forEach((link) => {
    if (downloadURL) {
      link.href = downloadURL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return;
    }
    // 无商店地址时，提供可关闭的上线说明。没有预约、追踪或表单提交。
    link.addEventListener("click", (event) => {
      if (!dialog) return;
      event.preventDefault();
      if (!dialog.open) dialog.showModal();
    });
  });
  if (downloadURL) {
    $$('[data-availability]').forEach((element) => {
      element.textContent = "前往 App Store 下载 · iOS 17 及以上";
    });
    $$('[data-release-answer]').forEach((element) => {
      element.textContent = "点击页面上的“认领阿牛”，可前往 App Store 查看下载与地区可用情况。";
    });
  }
  if (dialog) {
    $$('[data-close-dialog]', dialog).forEach((button) => {
      button.addEventListener("click", () => dialog.close());
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const controls = $$('a[href], button:not([disabled]), [tabindex="0"]', dialog);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    dialog.addEventListener("click", (event) => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) {
        dialog.close();
      }
    });
  }

  const menuButton = $(".mobile-menu-button");
  const mobileNav = $("#mobile-nav");
  function setMenu(open) {
    if (!menuButton || !mobileNav) return;
    mobileNav.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    $("use", menuButton).setAttribute("href", iconPath(open ? "close" : "menu"));
  }
  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
    $$("a", mobileNav).forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !mobileNav.hidden) {
        setMenu(false);
        menuButton.focus();
      }
    });
    window.matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  }

  const demoImage = $("#demo-image");
  if (demoImage) {
    const states = {
      work: { image: "scene-work.webp", alt: "阿牛坐在工位，托着脸等待下班", status: "工位在线", speech: ["人还在，", "心已下班。"], label: "距离下班", hours: "02", minutes: "18", progress: 71, wage: "356.25" },
      break: { image: "scene-break.webp", alt: "阿牛戴着耳机在沙发上喝咖啡，旁边是小鱼池", status: "灵魂充电中", speech: ["歇一会儿，", "马上回来。"], label: "这次休息", hours: "00", minutes: "10", progress: 71, wage: "356.25" },
      meeting: { image: "scene-meeting.webp", alt: "阿牛坐在会议室，认真地放空眼神", status: "正在开会", speech: ["收到，好的，", "明白。"], label: "会议已进行", hours: "00", minutes: "26", progress: 71, wage: "356.25" },
      offwork: { image: "scene-offwork.webp", alt: "阿牛背好书包，开心地离开办公室", status: "今日已收工", speech: ["今天的班，", "就到这儿！"], label: "距离下班", hours: "00", minutes: "00", progress: 100, wage: "500.00" }
    };
    let currentState = "work";
    let wageVisible = false;
    const wageButton = $("#wage-toggle");

    function renderWage() {
      $("#demo-wage-value").textContent = wageVisible ? `¥ ${states[currentState].wage}` : "¥ ••••";
      wageButton.setAttribute("aria-pressed", String(wageVisible));
      wageButton.setAttribute("aria-label", wageVisible ? "隐藏演示金额" : "显示演示金额");
      $("use", wageButton).setAttribute("href", iconPath(wageVisible ? "eye" : "eye-off"));
    }

    function setState(name) {
      const state = states[name];
      if (!state) return;
      currentState = name;
      demoImage.src = `assets/${state.image}`;
      demoImage.alt = state.alt;
      $("#demo-status").textContent = state.status;
      const speech = $("#demo-speech");
      speech.replaceChildren(document.createTextNode(state.speech[0]), document.createElement("br"), document.createTextNode(state.speech[1]));
      $("#demo-timer-label").textContent = state.label;
      $("#demo-hours").textContent = state.hours;
      $("#demo-minutes").textContent = state.minutes;
      $("#demo-percent").textContent = `${state.progress}%`;
      $("#demo-progress").style.width = `${state.progress}%`;
      $$("[data-state]").forEach((button) => {
        const selected = button.dataset.state === name;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      renderWage();
      $("#demo-announcement").textContent = `演示：${state.status}。${state.speech.join("")} ${state.label} ${state.hours} 小时 ${state.minutes} 分钟。`;
    }
    $$("[data-state]").forEach((button) => button.addEventListener("click", () => setState(button.dataset.state)));
    wageButton.addEventListener("click", () => {
      wageVisible = !wageVisible;
      renderWage();
    });
  }

  const receiptHeadline = $("#receipt-headline");
  if (receiptHeadline) {
    const templates = {
      warm: { title: ["今天也有", "好好生活。"], quote: "辛苦啦，接下来的时间属于你。" },
      tough: { title: ["工作已读，", "明天再回。"], quote: "别问，问就是今天的电量用完了。" },
      wild: { title: ["打工到此，", "本牛退朝。"], quote: "工牌一摘，谁也别想拦住我的快乐。" }
    };
    $$("[data-receipt]").forEach((button) => {
      button.addEventListener("click", () => {
        const template = templates[button.dataset.receipt];
        if (!template) return;
        receiptHeadline.replaceChildren(document.createTextNode(template.title[0]), document.createElement("br"), document.createTextNode(template.title[1]));
        $("#receipt-quote").textContent = template.quote;
        $$("[data-receipt]").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-active", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
      });
    });
  }

  $$('[data-print]').forEach((button) => button.addEventListener("click", () => window.print()));
})();
