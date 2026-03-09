/**
 * Events Builder
 * Reads events.json and auto-generates event cards into the DOM.
 *
 * Usage — in HTML:
 *   <div class="events-grid" data-events-src="events.json"></div>
 *   <script src="events-builder.js"></script>
 *   <script src="events.js"></script>   ← must come AFTER
 *
 * To add a new event, just append an object to events.json. Nothing else changes.
 *
 * Dispatches `eventsReady` custom event with { detail: { events: [...] } }
 * so other scripts (filters, home preview, etc.) can access the data.
 */
(function () {
  'use strict';

  function buildEvents() {
    var grid = document.querySelector('.events-grid[data-events-src]');
    if (!grid) {
      // No dynamic events grid on this page — let downstream scripts proceed
      window.dispatchEvent(new CustomEvent('eventsReady', { detail: { events: [] } }));
      return;
    }

    var jsonPath = grid.getAttribute('data-events-src');

    fetch(jsonPath)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + jsonPath);
        return res.json();
      })
      .then(function (events) {
        // Store events data on the DOM element for downstream scripts
        grid._eventsData = events;

        // Tell downstream scripts (events.js, home-events.js) the data is ready
        window.dispatchEvent(new CustomEvent('eventsReady', {
          detail: { events: events, container: grid }
        }));
      })
      .catch(function (err) {
        console.error('Events Builder:', err);
        window.dispatchEvent(new CustomEvent('eventsReady', { detail: { events: [] } }));
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildEvents);
  } else {
    buildEvents();
  }
})();
