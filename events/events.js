/* ═══════════════════════════════════════════════════════
   GetFitByTania — Events Page
   Rendering, filtering & interactions.
   Receives event data via the `eventsReady` custom event
   dispatched by events-builder.js.
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── i18n (loaded from locale files) ── */
  var translations = {};
  var FALLBACK_LANG = 'es';

  function getLocalesBase() {
    return '../locales/';
  }

  function loadLocale(lang) {
    if (translations[lang]) return Promise.resolve(translations[lang]);
    return fetch(getLocalesBase() + lang + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        translations[lang] = data;
        return data;
      })
      .catch(function (err) {
        console.error('Events: failed to load locale ' + lang + ':', err);
        return null;
      });
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

  function t(key) {
    var lang = getLang();
    var val = resolveDotKey(translations[lang], key);
    if (val !== undefined) return val;
    if (lang !== FALLBACK_LANG) {
      val = resolveDotKey(translations[FALLBACK_LANG], key);
      if (val !== undefined) return val;
    }
    return key;
  }

  /* ── HELPERS ── */
  function getLang() {
    return localStorage.getItem('gfbt-lang') || 'es';
  }

  function loc(event, field) {
    return t('events.items.' + event.id + '.' + field);
  }

  function parseDate(dateStr) {
    var parts = dateStr.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  function isUpcoming(dateStr) {
    var d = parseDate(dateStr);
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return d >= now;
  }

  function formatDay(dateStr) {
    return parseInt(dateStr.split('-')[2], 10);
  }

  function formatMonth(dateStr) {
    var monthIdx = parseInt(dateStr.split('-')[1], 10) - 1;
    return t('events.monthNames')[monthIdx];
  }

  function formatYear(dateStr) {
    return dateStr.split('-')[0];
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  /* ── CARD RENDERERS ── */

  function renderFeaturedCard(event) {
    var upcoming = isUpcoming(event.date);
    var badgeText = upcoming ? t('events.badgeUpcoming') : t('events.badgePast');
    var badgeClass = upcoming ? '' : ' event-badge--past';

    return '<article class="event-card event-card--featured event-card--page reveal">' +
      '<div class="event-card-image">' +
        '<img src="' + escapeHtml(event.image) + '" ' +
          'alt="' + escapeHtml(loc(event, 'imageAlt')) + '" ' +
          'loading="eager" ' +
          'width="' + event.imageWidth + '" height="' + event.imageHeight + '">' +
        '<div class="event-card-date-overlay">' +
          '<span class="event-day">' + formatDay(event.date) + '</span>' +
          '<span class="event-month">' + formatMonth(event.date) + '</span>' +
          '<span class="event-year">' + formatYear(event.date) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="event-card-body">' +
        '<div class="event-badges-row">' +
          '<span class="event-badge' + badgeClass + '">' + escapeHtml(badgeText) + '</span>' +
          '<span class="event-category-badge">' + escapeHtml(loc(event, 'category')) + '</span>' +
        '</div>' +
        '<h3 class="event-title">' + escapeHtml(loc(event, 'title')) + '</h3>' +
        '<p class="event-desc">' + escapeHtml(loc(event, 'description')) + '</p>' +
        '<div class="event-meta-row">' +
          '<span class="event-meta-item"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ' + escapeHtml(loc(event, 'location')) + '</span>' +
          '<span class="event-meta-item"><i class="fas fa-clock" aria-hidden="true"></i> ' + escapeHtml(event.time) + '</span>' +
          '<span class="event-meta-item"><i class="fas fa-users" aria-hidden="true"></i> ' + event.spots + ' ' + escapeHtml(t('events.spots')) + '</span>' +
        '</div>' +
        (upcoming ? '<a href="../contact/" class="btn-cta">' + escapeHtml(t('events.cta')) + '</a>' : '') +
      '</div>' +
    '</article>';
  }

  function renderGridCard(event) {
    var upcoming = isUpcoming(event.date);
    var badgeText = upcoming ? t('events.badgeUpcoming') : t('events.badgePast');
    var badgeClass = upcoming ? '' : ' event-badge--past';

    return '<div class="col-12 col-md-6 col-lg-4" role="listitem">' +
      '<article class="event-card event-card--grid reveal">' +
        '<div class="event-card-image event-card-image--grid">' +
          '<img src="' + escapeHtml(event.image) + '" ' +
            'alt="' + escapeHtml(loc(event, 'imageAlt')) + '" ' +
            'loading="lazy" ' +
            'width="' + event.imageWidth + '" height="' + event.imageHeight + '">' +
          '<div class="event-card-date-overlay event-card-date-overlay--sm">' +
            '<span class="event-day">' + formatDay(event.date) + '</span>' +
            '<span class="event-month">' + formatMonth(event.date) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="event-card-body">' +
          '<div class="event-badges-row">' +
            '<span class="event-badge event-badge--sm' + badgeClass + '">' + escapeHtml(badgeText) + '</span>' +
            '<span class="event-category-badge event-category-badge--sm">' + escapeHtml(loc(event, 'category')) + '</span>' +
          '</div>' +
          '<h3 class="event-title event-title--grid">' + escapeHtml(loc(event, 'title')) + '</h3>' +
          '<p class="event-desc event-desc--grid">' + escapeHtml(loc(event, 'description')) + '</p>' +
          '<div class="event-meta-row">' +
            '<span class="event-meta-item"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ' + escapeHtml(loc(event, 'location')) + '</span>' +
            '<span class="event-meta-item"><i class="fas fa-clock" aria-hidden="true"></i> ' + escapeHtml(event.time) + '</span>' +
          '</div>' +
          (upcoming ? '<a href="../contact/" class="btn-cta btn-cta--sm">' + escapeHtml(t('events.cta')) + '</a>' : '') +
        '</div>' +
      '</article>' +
    '</div>';
  }


  /* ── RENDER LOGIC ── */
  var eventsData = [];
  var currentFilter = 'all';

  function render() {
    var featuredContainer = document.getElementById('featured-event-container');
    var gridContainer = document.getElementById('events-grid');
    var emptyEl = document.getElementById('events-empty');
    var featuredSection = document.getElementById('featured-event');
    var gridHeading = document.getElementById('events-grid-heading');

    if (!featuredContainer || !gridContainer) return;

    // Sort events by date (nearest first)
    var sorted = eventsData.slice().sort(function (a, b) {
      return parseDate(a.date) - parseDate(b.date);
    });

    // Apply filter
    var filtered;
    if (currentFilter === 'upcoming') {
      filtered = sorted.filter(function (e) { return isUpcoming(e.date); });
    } else if (currentFilter === 'past') {
      filtered = sorted.filter(function (e) { return !isUpcoming(e.date); });
    } else {
      filtered = sorted;
    }

    // Find featured event (most recent upcoming featured, or first upcoming)
    var featured = null;
    if (currentFilter !== 'past') {
      featured = filtered.find(function (e) { return e.featured && isUpcoming(e.date); });
      if (!featured) {
        featured = filtered.find(function (e) { return isUpcoming(e.date); });
      }
    }

    // Render featured
    if (featured) {
      featuredContainer.innerHTML = renderFeaturedCard(featured);
      featuredSection.hidden = false;
    } else {
      featuredContainer.innerHTML = '';
      featuredSection.hidden = true;
    }

    // Grid events (exclude featured)
    var gridEvents = filtered.filter(function (e) { return !featured || e.id !== featured.id; });

    if (gridEvents.length === 0 && !featured) {
      gridContainer.innerHTML = '';
      emptyEl.hidden = false;
    } else {
      emptyEl.hidden = true;
      gridContainer.innerHTML = gridEvents.map(renderGridCard).join('');
    }

    // Update heading text based on filter
    if (gridHeading) {
      if (currentFilter === 'past') {
        gridHeading.textContent = t('events.filterPast');
      } else {
        gridHeading.textContent = t('events.upcomingHeading');
      }
    }

    // Update i18n texts on static elements
    updateStaticTexts();

    // Re-init scroll reveal for new cards
    initCardReveal();
  }

  function updateStaticTexts() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val !== key) {
        el.textContent = val;
      }
    });
  }

  function initCardReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var cards = document.querySelectorAll('.event-card--page .reveal:not(.revealed), .event-card--grid.reveal:not(.revealed), .event-card--page.reveal:not(.revealed)');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach(function (el) { observer.observe(el); });
  }


  /* ── FILTER TABS ── */
  function initFilters() {
    var buttons = document.querySelectorAll('.events-filter-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentFilter = btn.getAttribute('data-filter');
        render();
      });

      // Keyboard: arrow left/right between tabs
      btn.addEventListener('keydown', function (e) {
        var btns = Array.from(buttons);
        var idx = btns.indexOf(btn);
        var next = -1;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          next = (idx + 1) % btns.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          next = (idx - 1 + btns.length) % btns.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          next = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          next = btns.length - 1;
        }

        if (next >= 0) {
          btns[idx].setAttribute('tabindex', '-1');
          btns[next].setAttribute('tabindex', '0');
          btns[next].focus();
          btns[next].click();
        }
      });
    });

    // Roving tabindex: only active tab is in tab order
    buttons.forEach(function (btn) {
      btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');
    });
  }


  /* ── LANGUAGE CHANGE LISTENER ── */
  function watchLanguageChanges() {
    document.addEventListener('languageChanged', function (e) {
      var lang = e.detail && e.detail.language || getLang();
      loadLocale(lang).then(function () {
        render();
      });
    });
  }


  /* ── INIT (waits for eventsReady from events-builder.js) ── */
  function initEventsPage(events) {
    var lang = getLang();
    Promise.all([
      loadLocale(lang),
      lang !== FALLBACK_LANG ? loadLocale(FALLBACK_LANG) : Promise.resolve(null)
    ]).then(function () {
      eventsData = events;
      render();
      initFilters();
      watchLanguageChanges();
    });
  }

  window.addEventListener('eventsReady', function (e) {
    var events = e.detail && e.detail.events || [];
    if (events.length === 0) {
      var emptyEl = document.getElementById('events-empty');
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    initEventsPage(events);
  });

})();
