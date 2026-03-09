/* ═══════════════════════════════════════════════════════
   GetFitByTania — Main JavaScript
   i18n · Theme · Navigation · Scroll Animations
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── TRANSLATIONS (loaded from /locales/*.json) ── */
  var translations = {};
  var SUPPORTED_LANGS = ['es', 'en', 'pt'];
  var FALLBACK_LANG = 'es';

  /**
   * Detect the base path to locales/ relative to the current page.
   * Pages at root use 'locales/', sub-folder pages use '../locales/'.
   */
  function getLocalesBase() {
    var path = window.location.pathname;
    // If we're inside a sub-folder (about/, events/, contact/, etc.)
    if (/\/[^/]+\/(?:index\.html)?$/i.test(path) && !/^\/(?:index\.html)?$/i.test(path)) {
      return '../locales/';
    }
    return 'locales/';
  }

  /**
   * Fetch a single locale JSON file and cache it.
   * Returns a promise that resolves to the translations object (or null on failure).
   */
  function loadLocale(lang) {
    if (translations[lang]) return Promise.resolve(translations[lang]);
    var base = getLocalesBase();
    return fetch(base + lang + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        translations[lang] = data;
        return data;
      })
      .catch(function (err) {
        console.error('Failed to load locale ' + lang + ':', err);
        return null;
      });
  }

  /**
   * Resolve a dot-notated key against a translations object.
   * e.g. t('nav.home') → translations[currentLang].nav.home
   * Falls back to the fallback language, then returns the key itself.
   */
  function t(key, lang) {
    lang = lang || currentLang;
    var val = resolveDotKey(translations[lang], key);
    if (val !== undefined) return val;
    // Fallback
    if (lang !== FALLBACK_LANG) {
      val = resolveDotKey(translations[FALLBACK_LANG], key);
      if (val !== undefined) return val;
    }
    return key;
  }

  function resolveDotKey(obj, key) {
    if (!obj) return undefined;
    var parts = key.split('.');
    var val = obj;
    for (var i = 0; i < parts.length; i++) {
      if (val && typeof val === 'object' && parts[i] in val) {
        val = val[parts[i]];
      } else {
        return undefined;
      }
    }
    return val;
  }


  /* ── STATE ── */
  let currentLang = localStorage.getItem('gfbt-lang') || 'es';
  let currentTheme = localStorage.getItem('gfbt-theme') || null;


  /* ── i18n ENGINE ── */
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('gfbt-lang', lang);
    document.documentElement.lang = lang;

    // Update text content (dot-notation keys)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      if (val !== key) {
        el.textContent = val;
      }
    });

    // Update aria-label attributes
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      var val = t(key, lang);
      if (val !== key) {
        el.setAttribute('aria-label', val);
      }
    });

    // Update alt attributes on images
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      var val = t(key, lang);
      if (val !== key) {
        el.setAttribute('alt', val);
      }
    });

    // Update placeholder attributes on inputs/textareas
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = t(key, lang);
      if (val !== key) {
        el.setAttribute('placeholder', val);
      }
    });

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update theme toggle label for current theme
    updateThemeToggleLabel();

    // Update nav toggle label
    updateNavToggleLabel();

    // Announce language change to screen readers (WCAG 4.1.3)
    var statusEl = document.getElementById('a11y-status');
    var langMsg = t('meta.langChanged', lang);
    if (statusEl && langMsg !== 'meta.langChanged') {
      statusEl.textContent = langMsg;
    }

    // Dispatch event for other scripts (events.js, home-events.js)
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));
  }


  /* ── THEME ENGINE ── */
  function getPreferredTheme() {
    if (currentTheme) return currentTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('gfbt-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggleLabel();
  }

  function toggleTheme() {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  function updateThemeToggleLabel() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var key = isDark ? 'aria.themeToggleLabelDark' : 'aria.themeToggleLabel';
    var label = t(key);
    if (label !== key) btn.setAttribute('aria-label', label);
  }

  function updateNavToggleLabel() {
    var toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    var key = expanded ? 'aria.navToggleCloseLabel' : 'aria.navToggleLabel';
    var label = t(key);
    if (label !== key) toggle.setAttribute('aria-label', label);
  }

  function updateSettingsToggleLabel() {
    var toggle = document.querySelector('.settings-toggle');
    if (!toggle) return;
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    var key = expanded ? 'aria.settingsToggleCloseLabel' : 'aria.settingsToggleLabel';
    var label = t(key);
    if (label !== key) toggle.setAttribute('aria-label', label);
  }


  /* ── FONT SIZE ENGINE ── */
  var fontSizeSteps = [100, 125, 150, 175, 200];
  var fontSizeIndex = (function () {
    var saved = parseInt(localStorage.getItem('gfbt-font-size'), 10);
    var idx = fontSizeSteps.indexOf(saved);
    return idx >= 0 ? idx : 0;
  })();

  function applyFontSize() {
    var size = fontSizeSteps[fontSizeIndex];
    document.documentElement.style.fontSize = size + '%';
    localStorage.setItem('gfbt-font-size', size);

    // Cap brand scaling at 125 %
    var brandScale = size <= 125 ? 1 : (125 / size);
    document.documentElement.style.setProperty('--brand-scale', brandScale);

    // Toggle compact nav mode (hamburger on desktop at ≥ 150 %)
    if (size >= 150) {
      document.documentElement.setAttribute('data-font-compact', '');
    } else {
      document.documentElement.removeAttribute('data-font-compact');
      // Close nav if it was open in compact mode
      var navToggle = document.querySelector('.nav-toggle');
      var navList = document.getElementById('main-nav');
      if (navToggle && navList) {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        updateNavToggleLabel();
      }
    }

    // Update all toggle buttons
    document.querySelectorAll('.font-size-toggle').forEach(function (btn) {
      btn.querySelector('.font-size-value').textContent = size + '%';
      btn.classList.toggle('active', size > 100);
    });
  }

  function cycleFontSize() {
    fontSizeIndex = (fontSizeIndex + 1) % fontSizeSteps.length;
    applyFontSize();
  }

  function initFontSizeToggle() {
    document.querySelectorAll('.font-size-toggle').forEach(function (btn) {
      btn.addEventListener('click', cycleFontSize);
    });
    // Apply saved
    applyFontSize();
  }


  /* ── MOBILE NAVIGATION ── */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navList = document.getElementById('main-nav');
    if (!toggle || !navList) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open', !expanded);
      updateNavToggleLabel();

      if (!expanded) {
        // Focus first link when opening
        var firstLink = navList.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on link click
    navList.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        updateNavToggleLabel();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        updateNavToggleLabel();
        toggle.focus();
      }
    });
  }


  /* ── SETTINGS PANEL (mobile) ── */
  function initSettingsPanel() {
    var toggle = document.querySelector('.settings-toggle');
    var panel = document.getElementById('settings-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      panel.classList.toggle('open', !expanded);
      updateSettingsToggleLabel();
    });

    // Sync mobile lang buttons with desktop ones
    panel.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        loadLocale(lang).then(function () {
          setLanguage(lang);
          syncLangButtons(lang);
        });
      });
    });

    // Mobile theme toggle
    var mobileThemeBtn = panel.querySelector('.theme-toggle--mobile');
    if (mobileThemeBtn) {
      mobileThemeBtn.addEventListener('click', toggleTheme);
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
        updateSettingsToggleLabel();
        toggle.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !panel.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
        updateSettingsToggleLabel();
      }
    });
  }

  // Keep desktop and mobile lang switchers in sync
  function syncLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }


  /* ── NAV DROPDOWN (About me) ── */
  function initNavDropdown() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(function (dropdown) {
      var toggle = dropdown.querySelector('.nav-dropdown-toggle');
      var menu = dropdown.querySelector('.nav-dropdown-menu');
      if (!toggle || !menu) return;

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var expanded = toggle.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        if (!expanded) {
          toggle.setAttribute('aria-expanded', 'true');
          menu.hidden = false;
          var firstLink = menu.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });

      // Keyboard navigation inside dropdown
      dropdown.addEventListener('keydown', function (e) {
        var links = Array.from(menu.querySelectorAll('a'));
        var idx = links.indexOf(document.activeElement);

        if (e.key === 'Escape') {
          closeDropdown(toggle, menu);
          toggle.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (toggle.getAttribute('aria-expanded') !== 'true') {
            toggle.setAttribute('aria-expanded', 'true');
            menu.hidden = false;
          }
          var next = idx < links.length - 1 ? idx + 1 : 0;
          links[next].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (idx <= 0) {
            closeDropdown(toggle, menu);
            toggle.focus();
          } else {
            links[idx - 1].focus();
          }
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        closeAllDropdowns();
      }
    });

    function closeDropdown(toggle, menu) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }

    function closeAllDropdowns() {
      dropdowns.forEach(function (dd) {
        var t = dd.querySelector('.nav-dropdown-toggle');
        var m = dd.querySelector('.nav-dropdown-menu');
        if (t && m) {
          t.setAttribute('aria-expanded', 'false');
          m.hidden = true;
        }
      });
    }
  }


  /* ── ACTIVE NAV HIGHLIGHT ── */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)');
    var dropdownToggle = document.querySelector('.nav-dropdown-toggle');

    if (!sections.length || !navLinks.length) return;

    // Detect page-level active link (set via aria-current="page" in markup)
    var pageActiveLink = document.querySelector('.nav-link[aria-current="page"]');
    var pageActiveDropdown = dropdownToggle && dropdownToggle.getAttribute('aria-current') === 'page';

    // If a nav link has aria-current="page", this is a dedicated sub-page
    // (events/, about/) — keep that link active and skip scroll-based highlighting
    if (pageActiveLink || pageActiveDropdown) return;

    // Collect hrefs that live inside the dropdown
    var dropdownHrefs = [];
    // Collect section IDs that belong to the dropdown
    var dropdownSectionIds = [];
    if (dropdownToggle) {
      var dropdownMenu = dropdownToggle.closest('.nav-dropdown');
      if (dropdownMenu) {
        dropdownMenu.querySelectorAll('.nav-dropdown-menu .nav-link').forEach(function (link) {
          var href = link.getAttribute('href');
          dropdownHrefs.push(href);
          // Extract the hash part
          var hash = href.indexOf('#') !== -1 ? href.substring(href.indexOf('#')) : href;
          if (hash.charAt(0) === '#') dropdownSectionIds.push(hash.substring(1));
        });
      }
    }

    // Check if we are on the about page (dropdown toggle has active class in markup)
    var isAboutPage = dropdownToggle && dropdownToggle.classList.contains('active');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            var anyDropdownChildActive = false;

            navLinks.forEach(function (link) {
              var href = link.getAttribute('href');
              // Match both '#id' and 'path/#id' patterns
              var isActive = href === '#' + id || href.endsWith('#' + id);
              link.classList.toggle('active', isActive);
              if (isActive) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
              // Check if the active link is inside the dropdown
              if (isActive && dropdownHrefs.indexOf(href) !== -1) {
                anyDropdownChildActive = true;
              }
            });

            // On the about page, keep dropdown toggle active
            // when viewing any section (about hero or sub-sections)
            if (dropdownToggle) {
              var isDropdownSection = dropdownSectionIds.indexOf(id) !== -1;
              var shouldBeActive = anyDropdownChildActive || isDropdownSection || isAboutPage;
              dropdownToggle.classList.toggle('active', shouldBeActive);
              if (shouldBeActive) {
                dropdownToggle.setAttribute('aria-current', 'true');
              } else {
                dropdownToggle.removeAttribute('aria-current');
              }
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-' + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 'px 0px -40% 0px' }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }


  /* ── SCROLL REVEAL ANIMATIONS ── */
  function initScrollReveal() {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Add reveal class to elements
    var revealTargets = [
      '.section-header',
      '.about-visual',
      '.about-text',
      '.discipline-card',
      '.timeline-item',
      '.formation-card',
      '.contact-intro',
      '.contact-form',
      '.about-triptych',
      '.about-summary-content',
      '.event-card',
      '.blog-card',
    ];

    revealTargets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    // Add stagger class to discipline grid row
    var discRow = document.querySelector('#disciplines .row');
    if (discRow) discRow.classList.add('reveal-stagger');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ── EMAILJS CONTACT FORM ── */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateField(field) {
    var name = field.name;
    var val = field.value.trim();
    var errorEl = document.getElementById('error-' + name);
    var msg = '';

    if (name === 'name' && !val) {
      msg = t('contact.errorNameRequired');
    } else if (name === 'email') {
      if (!val) {
        msg = t('contact.errorEmailRequired');
      } else if (!EMAIL_RE.test(val)) {
        msg = t('contact.errorEmailInvalid');
      }
    } else if (name === 'message' && !val) {
      msg = t('contact.errorMessageRequired');
    }

    if (errorEl) errorEl.textContent = msg;
    field.classList.toggle('invalid', !!msg);
    field.setAttribute('aria-invalid', !!msg ? 'true' : 'false');
    return !msg;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('[required]');
    var allValid = true;
    var firstInvalid = null;

    fields.forEach(function (field) {
      var ok = validateField(field);
      if (!ok && allValid) {
        firstInvalid = field;
        allValid = false;
      }
    });

    if (firstInvalid) firstInvalid.focus();
    return allValid;
  }

  function initContactForm() {
    // Initialise EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init({ publicKey: 'Shy7gAPUu2DAPBDp7' });
    }

    var form = document.getElementById('contact-form');
    if (!form) return;

    // Real-time validation on blur
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      // Clear error on input
      field.addEventListener('input', function () {
        if (field.classList.contains('invalid')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var statusEl = document.getElementById('form-status');
      var submitBtn = form.querySelector('[type="submit"]');

      // Validate all fields
      if (!validateForm(form)) return;

      // Disable button & show sending
      submitBtn.disabled = true;
      statusEl.textContent = t('contact.formSending');
      statusEl.className = 'form-status form-status--sending';

      emailjs.sendForm('service_yze7r4f', 'template_onz9wxf', form)
        .then(function () {
          statusEl.textContent = t('contact.formSuccess');
          statusEl.className = 'form-status form-status--success';
          form.reset();
          // Clear any lingering error states
          form.querySelectorAll('.invalid').forEach(function (f) {
            f.classList.remove('invalid');
            f.setAttribute('aria-invalid', 'false');
          });
          form.querySelectorAll('.field-error').forEach(function (el) {
            el.textContent = '';
          });
          submitBtn.disabled = false;
        })
        .catch(function (error) {
          console.error('EmailJS error:', error);
          statusEl.textContent = t('contact.formError');
          statusEl.className = 'form-status form-status--error';
          submitBtn.disabled = false;
        });
    });
  }


  /* ── YEAR IN FOOTER ── */
  function setFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ── INIT ── */
  function init() {
    // Set initial theme
    setTheme(getPreferredTheme());

    // Load locale files, then apply language
    var loadPromises = [loadLocale(currentLang)];
    if (currentLang !== FALLBACK_LANG) {
      loadPromises.push(loadLocale(FALLBACK_LANG));
    }

    Promise.all(loadPromises).then(function () {
      // Set initial language (translations are now loaded)
      setLanguage(currentLang);
    });

    // Language switcher buttons (desktop header-actions)
    document.querySelectorAll('.header-actions .lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        loadLocale(lang).then(function () {
          setLanguage(lang);
          syncLangButtons(lang);
        });
      });
    });

    // Theme toggle
    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('gfbt-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Mobile nav
    initMobileNav();

    // Nav dropdowns
    initNavDropdown();

    // Settings panel (mobile)
    initSettingsPanel();

    // Font size toggle
    initFontSizeToggle();

    // Active nav
    initActiveNav();

    // Scroll reveal
    initScrollReveal();

    // Contact form (EmailJS)
    initContactForm();

    // Footer year
    setFooterYear();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
