/* ═══════════════════════════════════════════════════════
   Shared Footer — injected via document.write()
   Includes: footer columns, FAB, modal (focus trap + inert)
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var base = document.currentScript.getAttribute('src').replace('components/footer.js', '');

  var html = '';

  /* ── Footer ── */
  html +=
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +

          /* Col 1 — Brand */
          '<div class="footer-col footer-col--brand">' +
            '<a href="' + base + 'index.html" class="footer-brand-link">' +
              '<span class="footer-brand-mark" aria-hidden="true">G</span>' +
              '<span class="footer-brand-name">GetFit<strong>ByTania</strong></span>' +
            '</a>' +
            '<p class="footer-tagline" data-i18n="footer.tagline">Entrenamiento personal y clases dirigidas en Alicante.</p>' +
            '<nav aria-label="Social media">' +
              '<ul class="social-links" role="list">' +
                '<li><a href="https://www.instagram.com/tania.angulo_trainer" target="_blank" rel="noopener noreferrer" ' +
                  'data-i18n-aria-label="aria.instagramLabel" aria-label="Instagram (abre en ventana nueva)">' +
                  '<i class="fab fa-instagram" aria-hidden="true"></i></a></li>' +
                '<li><a href="https://www.facebook.com/tanitaangulo" target="_blank" rel="noopener noreferrer" ' +
                  'data-i18n-aria-label="aria.facebookLabel" aria-label="Facebook (abre en ventana nueva)">' +
                  '<i class="fab fa-facebook-f" aria-hidden="true"></i></a></li>' +
                '<li><a href="https://wa.me/34620098860" target="_blank" rel="noopener noreferrer" ' +
                  'data-i18n-aria-label="aria.whatsappLabel" aria-label="WhatsApp (abre en ventana nueva)">' +
                  '<i class="fab fa-whatsapp" aria-hidden="true"></i></a></li>' +
              '</ul>' +
            '</nav>' +
          '</div>' +

          /* Col 2 — Navigation */
          '<div class="footer-col">' +
            '<h3 class="footer-heading" data-i18n="footer.nav">Navegación</h3>' +
            '<ul class="footer-links" role="list">' +
              '<li><a href="' + base + 'index.html" data-i18n="nav.home">Inicio</a></li>' +
              '<li><a href="' + base + 'about/" data-i18n="nav.about">Sobre mí</a></li>' +
              '<li><a href="' + base + 'events/" data-i18n="nav.events">Eventos</a></li>' +
              '<li><a href="' + base + 'index.html#blog" data-i18n="nav.blog">Blog</a></li>' +
            '</ul>' +
          '</div>' +

          /* Col 3 — Disciplines */
          '<div class="footer-col">' +
            '<h3 class="footer-heading" data-i18n="footer.disciplines">Disciplinas</h3>' +
            '<ul class="footer-links" role="list">' +
              '<li><a href="' + base + 'about/#disciplines">Pilates</a></li>' +
              '<li><a href="' + base + 'about/#disciplines" data-i18n="disciplines.functionalTitle">Entrenamiento Funcional</a></li>' +
              '<li><a href="' + base + 'about/#disciplines" data-i18n="disciplines.hypopressiveTitle">Gimnasia Hipopresiva</a></li>' +
              '<li><a href="' + base + 'about/#disciplines">Cross Training</a></li>' +
            '</ul>' +
          '</div>' +

          /* Col 4 — Contact */
          '<div class="footer-col">' +
            '<h3 class="footer-heading" data-i18n="footer.contactTitle">Contacto</h3>' +
            '<ul class="footer-links footer-links--contact" role="list">' +
              '<li><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Alicante, España</li>' +
              '<li><a href="https://wa.me/34620098860" target="_blank" rel="noopener noreferrer">' +
                '<i class="fab fa-whatsapp" aria-hidden="true"></i> +34 620 098 860</a></li>' +
              '<li><a href="https://www.instagram.com/tania.angulo_trainer" target="_blank" rel="noopener noreferrer">' +
                '<i class="fab fa-instagram" aria-hidden="true"></i> @tania.angulo_trainer</a></li>' +
            '</ul>' +
          '</div>' +

        '</div>' + /* /footer-grid */

        /* Footer bottom */
        '<div class="footer-bottom">' +
          '<p class="footer-copy">&copy; <span id="year"></span> Tania Angulo. ' +
            '<span data-i18n="footer.rights">Todos los derechos reservados.</span></p>' +
        '</div>' +
      '</div>' +
    '</footer>';

  /* ── Floating Action Button ── */
  html +=
    '<div class="fab-container" id="fab-container">' +
      '<button class="fab-main" id="fab-toggle" ' +
        'aria-expanded="false" ' +
        'aria-controls="fab-actions" ' +
        'data-i18n-aria-label="aria.fabLabel" ' +
        'aria-label="Acciones rápidas">' +
        '<i class="fas fa-plus fab-icon" aria-hidden="true"></i>' +
      '</button>' +
      '<div id="fab-actions" class="fab-actions" hidden>' +
        '<a href="https://wa.me/34620098860" target="_blank" rel="noopener noreferrer" ' +
          'class="fab-action fab-action--whatsapp" ' +
          'data-i18n-aria-label="aria.fabWhatsApp" ' +
          'aria-label="WhatsApp (abre en ventana nueva)">' +
          '<i class="fab fa-whatsapp" aria-hidden="true"></i>' +
        '</a>' +
        '<a href="' + base + 'contact/" class="fab-action fab-action--email" ' +
          'data-i18n-aria-label="aria.fabContact" ' +
          'aria-label="Contactar">' +
          '<i class="fas fa-envelope" aria-hidden="true"></i>' +
        '</a>' +
        '<button class="fab-action fab-action--top" ' +
          'data-i18n-aria-label="aria.fabScrollTop" ' +
          'aria-label="Volver arriba">' +
          '<i class="fas fa-arrow-up" aria-hidden="true"></i>' +
        '</button>' +
      '</div>' +
    '</div>';

  /* ── Modal overlay ── */
  html +=
    '<div class="modal-overlay" id="site-modal" ' +
      'role="dialog" ' +
      'aria-modal="true" ' +
      'aria-labelledby="modal-title" ' +
      'hidden>' +
      '<div class="modal-dialog">' +
        '<div class="modal-header">' +
          '<h2 class="modal-title" id="modal-title"></h2>' +
          '<button class="modal-close" ' +
            'data-i18n-aria-label="aria.modalCloseLabel" ' +
            'aria-label="Cerrar diálogo">' +
            '<i class="fas fa-times" aria-hidden="true"></i>' +
          '</button>' +
        '</div>' +
        '<div class="modal-body" id="modal-body"></div>' +
      '</div>' +
    '</div>';

  /* ── Live region for status announcements (WCAG 4.1.3) ── */
  html +=
    '<div id="a11y-status" class="sr-only visually-hidden" role="status" aria-live="polite" aria-atomic="true"></div>';

  /* Inject */
  document.write(html);

  /* ── DOMContentLoaded setup ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* — Year — */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* — FAB toggle — */
    var fabToggle = document.getElementById('fab-toggle');
    var fabActions = document.getElementById('fab-actions');

    if (fabToggle && fabActions) {
      // Restore collapsed state from localStorage
      var fabState = localStorage.getItem('gfbt-fab-open');
      if (fabState === 'true') {
        fabToggle.setAttribute('aria-expanded', 'true');
        fabActions.hidden = false;
        fabToggle.classList.add('active');
      }

      fabToggle.addEventListener('click', function () {
        var open = fabToggle.getAttribute('aria-expanded') === 'true';
        fabToggle.setAttribute('aria-expanded', String(!open));
        fabActions.hidden = open;
        fabToggle.classList.toggle('active', !open);
        localStorage.setItem('gfbt-fab-open', String(!open));
      });

      // Scroll-to-top
      var topBtn = fabActions.querySelector('.fab-action--top');
      if (topBtn) {
        topBtn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }

    /* — Modal: open / close API — */
    var modal = document.getElementById('site-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalBody = document.getElementById('modal-body');
    var modalClose = modal ? modal.querySelector('.modal-close') : null;
    var previousFocus = null;

    var INERT_SELECTOR = 'header, main, .bg-decoration, .fab-container, .site-footer';

    function openModal(title, bodyHTML) {
      if (!modal) return;
      previousFocus = document.activeElement;

      modalTitle.textContent = title;
      modalBody.innerHTML = bodyHTML;
      modal.hidden = false;
      document.body.classList.add('modal-open');

      // Apply inert to background
      document.querySelectorAll(INERT_SELECTOR).forEach(function (el) {
        el.setAttribute('inert', '');
      });

      // Focus the close button
      if (modalClose) modalClose.focus();
    }

    function closeModal() {
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('modal-open');

      // Remove inert
      document.querySelectorAll(INERT_SELECTOR).forEach(function (el) {
        el.removeAttribute('inert');
      });

      // Return focus
      if (previousFocus && previousFocus.focus) {
        previousFocus.focus();
      }
    }

    // Close button
    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Backdrop click
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });

    // Focus trap
    if (modal) {
      modal.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;

        var focusable = modal.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    // Expose global API
    window.openSiteModal = openModal;
    window.closeSiteModal = closeModal;
  });
})();
