/* ═══════════════════════════════════════════════════════
   GetFitByTania — Home Page Events
   Shows 3 upcoming events from events.json.
   Receives event data via the `eventsReady` custom event
   dispatched by events-builder.js.
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── i18n (loaded from locale files) ── */
  var translations = {};
  var FALLBACK_LANG = 'es';

  function loadLocale(lang) {
    if (translations[lang]) return Promise.resolve(translations[lang]);
    return fetch('locales/' + lang + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        translations[lang] = data;
        return data;
      })
      .catch(function (err) {
        console.error('Home events: failed to load locale ' + lang + ':', err);
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

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDay(dateStr) {
    return parseInt(dateStr.split('-')[2], 10);
  }

  function formatMonth(dateStr) {
    var idx = parseInt(dateStr.split('-')[1], 10) - 1;
    var months = t('events.monthNames');
    return Array.isArray(months) ? months[idx] : '';
  }

  function formatYear(dateStr) {
    return dateStr.split('-')[0];
  }

  /* ── Color order: 1st = green, 2nd = blue, 3rd = accent (default) ── */
  var COLOR_CLASSES = ['event-card--green', 'event-card--blue', ''];

  /* ── Render the featured (highlighted) card ── */
  function renderFeatured(event, colorIdx) {
    var colorClass = COLOR_CLASSES[colorIdx] || '';
    return '<div class="col-12 col-lg-8" role="listitem">' +
      '<article class="event-card event-card--featured reveal' + (colorClass ? ' ' + colorClass : '') + '">' +
        '<div class="event-card-date">' +
          '<span class="event-day">' + formatDay(event.date) + '</span>' +
          '<span class="event-month">' + formatMonth(event.date) + '</span>' +
          '<span class="event-year">' + formatYear(event.date) + '</span>' +
        '</div>' +
        '<div class="event-card-body">' +
          '<div class="event-badge">' + escapeHtml(t('events.badgeUpcoming')) + '</div>' +
          '<h3 class="event-title">' + escapeHtml(loc(event, 'title')) + '</h3>' +
          '<p class="event-desc">' + escapeHtml(loc(event, 'description')) + '</p>' +
          '<div class="event-meta-row">' +
            '<span class="event-meta-item"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ' + escapeHtml(loc(event, 'location')) + '</span>' +
            '<span class="event-meta-item"><i class="fas fa-clock" aria-hidden="true"></i> ' + escapeHtml(event.time) + '</span>' +
            '<span class="event-meta-item"><i class="fas fa-users" aria-hidden="true"></i> ' + event.spots + ' ' + escapeHtml(t('events.spots')) + '</span>' +
          '</div>' +
          '<a href="events/" class="btn-cta">' + escapeHtml(t('events.cta')) + '</a>' +
        '</div>' +
      '</article>' +
    '</div>';
  }

  /* ── Render a small grid card ── */
  function renderSmall(event, colorIdx) {
    var colorClass = COLOR_CLASSES[colorIdx] || '';
    return '<div class="col-12 col-md-6 col-lg-4" role="listitem">' +
      '<article class="event-card event-card--home-sm reveal' + (colorClass ? ' ' + colorClass : '') + '">' +
        '<div class="event-card-date event-card-date--sm">' +
          '<span class="event-day">' + formatDay(event.date) + '</span>' +
          '<span class="event-month">' + formatMonth(event.date) + '</span>' +
        '</div>' +
        '<div class="event-card-body">' +
          '<div class="event-badge event-badge--sm">' + escapeHtml(t('events.badgeUpcoming')) + '</div>' +
          '<h3 class="event-title event-title--sm">' + escapeHtml(loc(event, 'title')) + '</h3>' +
          '<div class="event-meta-row">' +
            '<span class="event-meta-item"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ' + escapeHtml(loc(event, 'location')) + '</span>' +
            '<span class="event-meta-item"><i class="fas fa-clock" aria-hidden="true"></i> ' + escapeHtml(event.time) + '</span>' +
          '</div>' +
        '</div>' +
      '</article>' +
    '</div>';
  }

  function render(events) {
    var container = document.getElementById('home-events');
    if (!container) return;

    // Filter upcoming, sorted by nearest date
    var upcoming = events
      .filter(function (e) { return isUpcoming(e.date); })
      .sort(function (a, b) { return parseDate(a.date) - parseDate(b.date); });

    if (upcoming.length === 0) return;

    // First event = featured (prefer the one marked featured)
    var featuredIdx = 0;
    for (var i = 0; i < upcoming.length; i++) {
      if (upcoming[i].featured) { featuredIdx = i; break; }
    }
    var featured = upcoming.splice(featuredIdx, 1)[0];

    // Take next 2 for the small grid
    var small = upcoming.slice(0, 2);

    // Build layout: featured on top row, small cards below
    // Color order: 0=green, 1=blue, 2=accent
    var html = '<div class="col-12"><div class="row g-4 justify-content-center">' +
      renderFeatured(featured, 0) +
    '</div></div>';

    if (small.length > 0) {
      html += '<div class="col-12"><div class="row g-4 justify-content-center" style="margin-top: var(--space-4)">';
      small.forEach(function (ev, i) { html += renderSmall(ev, i + 1); });
      html += '</div></div>';
    }

    container.innerHTML = html;

    // Trigger reveal animations
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var cards = container.querySelectorAll('.reveal');
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
  }

  /* ── Watch for language changes ── */
  var cachedEvents = null;

  function watchLang() {
    document.addEventListener('languageChanged', function (e) {
      if (!cachedEvents) return;
      var lang = e.detail && e.detail.language || getLang();
      loadLocale(lang).then(function () {
        render(cachedEvents);
      });
    });
  }

  /* ── INIT (waits for eventsReady from events-builder.js) ── */
  function initHomeEvents(events) {
    cachedEvents = events;
    var lang = getLang();
    Promise.all([
      loadLocale(lang),
      lang !== FALLBACK_LANG ? loadLocale(FALLBACK_LANG) : Promise.resolve(null)
    ]).then(function () {
      render(cachedEvents);
      watchLang();
    });
  }

  window.addEventListener('eventsReady', function (e) {
    var events = e.detail && e.detail.events || [];
    if (events.length > 0) {
      initHomeEvents(events);
    }
  });

})();
