/* ═══════════════════════════════════════════════════════
   Shared Header — injected via document.write()
   Includes: page-loader, skip-link, decorative bg,
   full header with nav + settings panel
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var base = document.currentScript.getAttribute('src').replace('components/header.js', '');

  /* ── Detect current page ── */
  var path = window.location.pathname.replace(/\/index\.html$/i, '/');

  function active(page) {
    if (page === '/') {
      return /\/$/.test(path) && !/\/(about|contact|events)\//i.test(path) ? ' active' : '';
    }
    return path.indexOf('/' + page + '/') !== -1 ? ' active' : '';
  }

  function ariaCurrent(page) {
    return active(page) ? ' aria-current="page"' : '';
  }

  /* ── Build HTML ── */
  var html = '';

  /* 1. Skip-to-content link (WCAG 2.4.1) */
  html +=
    '<a href="#main-content" class="skip-link" data-i18n="meta.skipLink">' +
      'Saltar al contenido principal' +
    '</a>';

  /* 2. Header */
  html +=
    '<header class="site-header">' +
      '<div class="container">' +
        '<div class="header-inner">' +

          /* Brand */
          '<a href="' + base + 'index.html" class="brand" ' +
            'data-i18n-aria-label="aria.brandLabel" ' +
            'aria-label="GetFitByTania — Inicio">' +
            '<span class="brand-mark" aria-hidden="true">G</span>' +
            '<span class="brand-text">GetFit<strong>ByTania</strong></span>' +
          '</a>' +

          /* Primary navigation */
          '<nav aria-label="Main">' +
            '<button class="nav-toggle" ' +
              'aria-expanded="false" ' +
              'aria-controls="main-nav" ' +
              'data-i18n-aria-label="aria.navToggleLabel" ' +
              'aria-label="Abrir menú de navegación">' +
              '<span class="nav-toggle-icon" aria-hidden="true"></span>' +
            '</button>' +

            '<ul id="main-nav" class="nav-list" role="list">' +
              '<li><a href="' + base + 'index.html" class="nav-link' + active('/') + '"' + ariaCurrent('/') + ' data-i18n="nav.home">Inicio</a></li>' +
              '<li><a href="' + base + 'about/" class="nav-link' + active('about') + '"' + ariaCurrent('about') + ' data-i18n="nav.about">Sobre mí</a></li>' +
              '<li><a href="' + base + 'events/" class="nav-link' + active('events') + '"' + ariaCurrent('events') + ' data-i18n="nav.events">Eventos</a></li>' +
              '<li><a href="' + base + 'index.html#blog" class="nav-link" data-i18n="nav.blog">Blog</a></li>' +
              '<li><a href="' + base + 'contact/" class="nav-link' + active('contact') + '"' + ariaCurrent('contact') + ' data-i18n="nav.contact">Contacto</a></li>' +
            '</ul>' +
          '</nav>' +

          /* Header actions (visible on desktop) */
          '<div class="header-actions">' +
            '<div class="lang-switcher" role="group" ' +
              'data-i18n-aria-label="aria.langSwitcherLabel" ' +
              'aria-label="Seleccionar idioma">' +
              '<button class="lang-btn active" aria-pressed="true" data-lang="es">ES</button>' +
              '<button class="lang-btn" aria-pressed="false" data-lang="en">EN</button>' +
              '<button class="lang-btn" aria-pressed="false" data-lang="pt">PT</button>' +
            '</div>' +
            '<button class="theme-toggle" ' +
              'data-i18n-aria-label="aria.themeToggleLabel" ' +
              'aria-label="Cambiar a modo oscuro">' +
              '<i class="fas fa-sun theme-icon-light" aria-hidden="true"></i>' +
              '<i class="fas fa-moon theme-icon-dark" aria-hidden="true"></i>' +
            '</button>' +
            '<button class="font-size-toggle" ' +
              'data-i18n-aria-label="aria.fontSizeLabel" ' +
              'aria-label="Aumentar tamaño de fuente" ' +
              'aria-live="polite">' +
              '<span class="font-size-icon" aria-hidden="true">A</span>' +
              '<span class="font-size-value" aria-hidden="true">100%</span>' +
            '</button>' +
          '</div>' +

          /* Settings toggle (mobile only — cog icon) */
          '<button class="settings-toggle" ' +
            'aria-expanded="false" ' +
            'aria-controls="settings-panel" ' +
            'data-i18n-aria-label="aria.settingsToggleLabel" ' +
            'aria-label="Abrir ajustes">' +
            '<i class="fas fa-cog" aria-hidden="true"></i>' +
          '</button>' +

          /* Settings panel (mobile — slides from right) */
          '<div id="settings-panel" class="settings-panel" aria-label="Ajustes" role="region">' +
            '<div class="settings-panel-inner">' +
              '<div class="lang-switcher lang-switcher--mobile" role="group" ' +
                'data-i18n-aria-label="aria.langSwitcherLabel" ' +
                'aria-label="Seleccionar idioma">' +
                '<button class="lang-btn active" aria-pressed="true" data-lang="es">ES</button>' +
                '<button class="lang-btn" aria-pressed="false" data-lang="en">EN</button>' +
                '<button class="lang-btn" aria-pressed="false" data-lang="pt">PT</button>' +
              '</div>' +
              '<button class="theme-toggle theme-toggle--mobile" ' +
                'data-i18n-aria-label="aria.themeToggleLabel" ' +
                'aria-label="Cambiar a modo oscuro">' +
                '<i class="fas fa-sun theme-icon-light" aria-hidden="true"></i>' +
                '<i class="fas fa-moon theme-icon-dark" aria-hidden="true"></i>' +
              '</button>' +
              '<button class="font-size-toggle font-size-toggle--mobile" ' +
                'data-i18n-aria-label="aria.fontSizeLabel" ' +
                'aria-label="Aumentar tamaño de fuente" ' +
                'aria-live="polite">' +
                '<span class="font-size-icon" aria-hidden="true">A</span>' +
                '<span class="font-size-value" aria-hidden="true">100%</span>' +
              '</button>' +
            '</div>' +
          '</div>' +

        '</div>' + /* /header-inner */
      '</div>' +   /* /container */
    '</header>';

  /* Inject */
  document.write(html);
})();
