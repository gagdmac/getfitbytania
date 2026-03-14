/* ═══════════════════════════════════════════════════════
   Shared <head> — injected via document.write()
   Each page keeps its OWN <title>, <meta description>,
   OG tags, and page-specific CSS.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var base = document.currentScript.getAttribute('src').replace('components/head.js', '');
  var v = window.SITE_VERSION || Date.now();

  function asset(path) {
    return base + path + '?v=' + v;
  }

  // ── 1. FOUC prevention: apply saved theme before any CSS paints ──
  document.write(
    '<script>' +
      '(function(){' +
        'var t=localStorage.getItem("gfbt-theme");' +
        'if(t)document.documentElement.setAttribute("data-theme",t);' +
      '})();' +
    '<\/script>'
  );

  // ── 2. Page-loader animation (inline style) ──
  document.write(
    '<style>' +
      '.page-loader{' +
        'position:fixed;inset:0;z-index:99999;' +
        'display:flex;align-items:center;justify-content:center;' +
        'background:var(--color-surface,#FDFAF6);' +
        'transition:opacity .3s ease-out;' +
      '}' +
      '.page-loader[hidden]{display:none}' +
      '.page-loader.fade-out{opacity:0;pointer-events:none}' +
      '.loader-dots{display:flex;gap:6px}' +
      '.loader-dot{' +
        'width:10px;height:10px;border-radius:50%;' +
        'background:var(--color-accent,#B04027);' +
        'animation:loaderWave .8s ease-in-out infinite alternate;' +
      '}' +
      '.loader-dot:nth-child(2){animation-delay:.1s}' +
      '.loader-dot:nth-child(3){animation-delay:.2s}' +
      '.loader-dot:nth-child(4){animation-delay:.3s}' +
      '.loader-dot:nth-child(5){animation-delay:.4s}' +
      '@keyframes loaderWave{' +
        '0%{transform:translateY(0);opacity:.4}' +
        '100%{transform:translateY(-12px);opacity:1}' +
      '}' +
      '@media(prefers-reduced-motion:reduce){' +
        '.loader-dot{animation:none;opacity:.6}' +
      '}' +
    '</style>'
  );

  // ── 3. Theme color ──
  document.write('<meta name="theme-color" content="#B04027">');

  // ── 4. Favicons ──
  document.write(
    '<link rel="icon" href="' + asset('assets/favicon.svg') + '" type="image/svg+xml">' +
    '<link rel="icon" href="' + asset('assets/favicon-32.png') + '" sizes="32x32" type="image/png">' +
    '<link rel="icon" href="' + asset('assets/favicon-16.png') + '" sizes="16x16" type="image/png">' +
    '<link rel="apple-touch-icon" href="' + asset('assets/apple-touch-icon.png') + '">' +
    '<link rel="manifest" href="' + base + 'site.webmanifest">'
  );

  // ── 5. Bootstrap 5.3 CDN ──
  document.write(
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">'
  );

  // ── 6. Font Awesome Pro (local) ──
  var faBase = base + 'assets/fontawesome-web/css/';
  var faFiles = ['fontawesome.min.css', 'solid.min.css', 'regular.min.css', 'brands.min.css'];
  for (var i = 0; i < faFiles.length; i++) {
    document.write(
      '<link rel="stylesheet" href="' + faBase + faFiles[i] + '?v=' + v + '">'
    );
  }

  // ── 7. Google Fonts ──
  document.write(
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
  );

  // ── 8. Main stylesheet ──
  document.write(
    '<link rel="stylesheet" href="' + asset('assets/css/styles.css') + '">'
  );
})();
