const languages = {
  'zh-CN': {
    title: 'HotMyKey - 全局快捷键工具',
    nav: {
      features: '核心功能',
      howItWorks: '使用方法',
      testimonials: '用户评价',
      contact: '联系我们'
    },
    hero: {
      title: '提升你的 Mac 工作效率',
      description: 'HotMyKey 是一款全局快捷键工具，让你通过简单的快捷键操作完成复杂的任务',
      systemRequirements: '系统要求：MacOS 10.15 或更高版本'
    },
    features: {
      title: '核心功能',
      record: {
        title: '录制按键',
        description: '轻松录制复杂的按键组合，无需记忆复杂的快捷键'
      },
      execute: {
        title: '执行命令',
        description: '通过快捷键执行系统命令，自动化你的日常工作流程'
      },
      app: {
        title: '打开应用',
        description: '快速启动任何已安装的应用程序，告别鼠标点击'
      },
      web: {
        title: '打开网页',
        description: '一键打开常用网站，提高信息获取效率'
      },
      simulate: {
        title: '模拟按键',
        description: '模拟任何按键组合，实现复杂的操作自动化'
      }
    },
    howItWorks: {
      title: '如何使用',
      step1: {
        title: '设置快捷键',
        description: '为每个功能分配一个独特的全局快捷键'
      },
      step2: {
        title: '录制操作',
        description: '录制你想要自动化的按键或操作序列'
      },
      step3: {
        title: '一键执行',
        description: '按下快捷键，立即执行复杂的操作'
      }
    },
    testimonials: {
      title: '用户评价',
      review1: {
        text: '"HotMyKey 彻底改变了我使用 Mac 的方式。现在我可以通过快捷键一键启动所有常用应用，工作效率提升了至少 30%！"',
        author: '张伟',
        role: '软件工程师'
      },
      review2: {
        text: '"作为一个设计师，我经常需要在多个软件之间切换。HotMyKey 让我能够快速在 Photoshop、Illustrator 和 Figma 之间切换，节省了大量时间。"',
        author: '李娜',
        role: 'UI/UX 设计师'
      },
      review3: {
        text: '"这款工具的按键录制功能非常强大，我可以轻松创建复杂的快捷键组合来执行日常任务。强烈推荐给所有 Mac 用户！"',
        author: '王强',
        role: '产品经理'
      }
    },
    contact: {
      title: '联系我们',
      heading: '有任何问题吗？',
      description: '我们的团队随时准备帮助您解答任何关于 HotMyKey 的问题。',
      email: '📧 电子邮件',
      emailValue: 'support@hotmykey.com',
    },
    footer: {
      copyright: '© 2025 HotMyKey. 保留所有权利。'
    }
  },
  'en': {
    title: 'HotMyKey - Global Hotkey Tool',
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      testimonials: 'Testimonials',
      contact: 'Contact Us'
    },
    hero: {
      title: 'Boost Your Mac Productivity',
      description: 'HotMyKey is a global hotkey tool that lets you accomplish complex tasks with simple keyboard shortcuts',
      systemRequirements: 'System Requirements: MacOS 10.15 or higher'
    },
    features: {
      title: 'Features',
      record: {
        title: 'Record Keystrokes',
        description: 'Easily record complex key combinations without memorizing complicated shortcuts'
      },
      execute: {
        title: 'Execute Commands',
        description: 'Execute system commands through hotkeys to automate your daily workflows'
      },
      app: {
        title: 'Open Applications',
        description: 'Quickly launch any installed application, goodbye mouse clicks'
      },
      web: {
        title: 'Open Websites',
        description: 'Open frequently visited websites with one click to improve information access efficiency'
      },
      simulate: {
        title: 'Simulate Keystrokes',
        description: 'Simulate any key combination to achieve complex automation operations'
      }
    },
    howItWorks: {
      title: 'How to Use',
      step1: {
        title: 'Set Hotkeys',
        description: 'Assign a unique global hotkey to each function'
      },
      step2: {
        title: 'Record Operations',
        description: 'Record the key presses or operation sequences you want to automate'
      },
      step3: {
        title: 'Execute with One Click',
        description: 'Press the hotkey to immediately execute complex operations'
      }
    },
    testimonials: {
      title: 'User Testimonials',
      review1: {
        text: '"HotMyKey has completely changed the way I use my Mac. I can now launch all my frequently used apps with hotkeys, improving my work efficiency by at least 30%!"',
        author: 'Zhang Wei',
        role: 'Software Engineer'
      },
      review2: {
        text: '"As a designer, I often need to switch between multiple software. HotMyKey allows me to quickly switch between Photoshop, Illustrator, and Figma, saving me a lot of time."',
        author: 'Li Na',
        role: 'UI/UX Designer'
      },
      review3: {
        text: '"The keystroke recording feature of this tool is very powerful. I can easily create complex hotkey combinations to execute daily tasks. Highly recommended to all Mac users!"',
        author: 'Wang Qiang',
        role: 'Product Manager'
      }
    },
    contact: {
      title: 'Contact Us',
      heading: 'Have Any Questions?',
      description: 'Our team is ready to help you with any questions about HotMyKey.',
      email: '📧 Email',
      emailValue: 'support@hotmykey.com',
    },
    footer: {
      copyright: '© 2025 HotMyKey. All rights reserved.'
    }
  }
};

// 语言切换函数
function switchLanguage(lang) {
  // 更新页面语言属性
  document.documentElement.lang = lang;
  
  // 更新页面标题
  document.title = languages[lang].title;
  
  // 更新导航栏
  document.querySelector('nav ul li:nth-child(1) a').textContent = languages[lang].nav.features;
  document.querySelector('nav ul li:nth-child(2) a').textContent = languages[lang].nav.howItWorks;
  document.querySelector('nav ul li:nth-child(3) a').textContent = languages[lang].nav.testimonials;
  document.querySelector('nav ul li:nth-child(4) a').textContent = languages[lang].nav.contact;
  
  // 更新英雄区域
  document.querySelector('.hero-content h1').textContent = languages[lang].hero.title;
  document.querySelector('.hero-content p').textContent = languages[lang].hero.description;
  document.querySelector('.system-requirements').textContent = languages[lang].hero.systemRequirements;
  
  // 更新功能区域
  document.querySelector('#features h2').textContent = languages[lang].features.title;
  document.querySelector('.feature-card:nth-child(1) h3').textContent = languages[lang].features.record.title;
  document.querySelector('.feature-card:nth-child(1) p').textContent = languages[lang].features.record.description;
  document.querySelector('.feature-card:nth-child(2) h3').textContent = languages[lang].features.execute.title;
  document.querySelector('.feature-card:nth-child(2) p').textContent = languages[lang].features.execute.description;
  document.querySelector('.feature-card:nth-child(3) h3').textContent = languages[lang].features.app.title;
  document.querySelector('.feature-card:nth-child(3) p').textContent = languages[lang].features.app.description;
  document.querySelector('.feature-card:nth-child(4) h3').textContent = languages[lang].features.web.title;
  document.querySelector('.feature-card:nth-child(4) p').textContent = languages[lang].features.web.description;
  document.querySelector('.feature-card:nth-child(5) h3').textContent = languages[lang].features.simulate.title;
  document.querySelector('.feature-card:nth-child(5) p').textContent = languages[lang].features.simulate.description;
  
  // 更新使用方法区域
  document.querySelector('#how-it-works h2').textContent = languages[lang].howItWorks.title;
  document.querySelector('.step:nth-child(1) h3').textContent = languages[lang].howItWorks.step1.title;
  document.querySelector('.step:nth-child(1) p').textContent = languages[lang].howItWorks.step1.description;
  document.querySelector('.step:nth-child(2) h3').textContent = languages[lang].howItWorks.step2.title;
  document.querySelector('.step:nth-child(2) p').textContent = languages[lang].howItWorks.step2.description;
  document.querySelector('.step:nth-child(3) h3').textContent = languages[lang].howItWorks.step3.title;
  document.querySelector('.step:nth-child(3) p').textContent = languages[lang].howItWorks.step3.description;
  
  // 更新用户评价区域
  document.querySelector('#testimonials h2').textContent = languages[lang].testimonials.title;
  document.querySelector('.testimonial-card:nth-child(1) .testimonial-content p').textContent = languages[lang].testimonials.review1.text;
  document.querySelector('.testimonial-card:nth-child(1) .author-info h4').textContent = languages[lang].testimonials.review1.author;
  document.querySelector('.testimonial-card:nth-child(1) .author-info p').textContent = languages[lang].testimonials.review1.role;
  document.querySelector('.testimonial-card:nth-child(2) .testimonial-content p').textContent = languages[lang].testimonials.review2.text;
  document.querySelector('.testimonial-card:nth-child(2) .author-info h4').textContent = languages[lang].testimonials.review2.author;
  document.querySelector('.testimonial-card:nth-child(2) .author-info p').textContent = languages[lang].testimonials.review2.role;
  document.querySelector('.testimonial-card:nth-child(3) .testimonial-content p').textContent = languages[lang].testimonials.review3.text;
  document.querySelector('.testimonial-card:nth-child(3) .author-info h4').textContent = languages[lang].testimonials.review3.author;
  document.querySelector('.testimonial-card:nth-child(3) .author-info p').textContent = languages[lang].testimonials.review3.role;
  
  // 更新联系我们区域
  document.querySelector('#contact h2').textContent = languages[lang].contact.title;
  document.querySelector('.contact-info h3').textContent = languages[lang].contact.heading;
  document.querySelector('.contact-info p').textContent = languages[lang].contact.description;
  document.querySelector('.contact-item:nth-child(1) h4').textContent = languages[lang].contact.email;
  document.querySelector('.contact-item:nth-child(1) p').textContent = languages[lang].contact.emailValue;
  
  // 更新页脚
  document.querySelector('footer .container p').textContent = languages[lang].footer.copyright;
  
  // 保存用户选择的语言到本地存储
  localStorage.setItem('language', lang);
  
  // 更新语言切换按钮的显示
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    if (lang === 'zh-CN') {
      langSwitcher.innerHTML = '🌍 English';
    } else {
      langSwitcher.innerHTML = '🌍 简体中文';
    }
  }
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', function() {
  // 检查用户之前选择的语言
  const savedLanguage = localStorage.getItem('language') || 'zh-CN';
  switchLanguage(savedLanguage);
});