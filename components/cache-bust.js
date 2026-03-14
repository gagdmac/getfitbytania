/* ═══════════════════════════════════════════════════════
   Cache Busting — version stamp for local assets
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var d = new Date();
  var version = '' +
    d.getFullYear() +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    ('0' + d.getDate()).slice(-2) +
    ('0' + d.getHours()).slice(-2) +
    ('0' + d.getMinutes()).slice(-2);

  window.SITE_VERSION = version;

  /**
   * Append ?v=VERSION to a local URL. Skips CDN, external, data, and blob URIs.
   * If the URL already has the current version, returns it unchanged.
   */
  window.versionedUrl = function (url) {
    if (!url || typeof url !== 'string') return url;

    // Skip external / CDN / data / blob
    if (/^(https?:\/\/|\/\/|data:|blob:)/i.test(url)) return url;

    // Skip if already stamped with current version
    if (url.indexOf('v=' + version) !== -1) return url;

    // Strip any existing ?v= or &v= param
    var clean = url.replace(/([?&])v=[^&]*(&|$)/, function (m, p1, p2) {
      return p2 ? p1 : '';
    });
    // Remove trailing ? or & left over
    clean = clean.replace(/[?&]$/, '');

    var separator = clean.indexOf('?') !== -1 ? '&' : '?';
    return clean + separator + 'v=' + version;
  };

  // On DOMContentLoaded, stamp any local <link rel="stylesheet"> missing the version
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (!href) continue;
      var stamped = window.versionedUrl(href);
      if (stamped !== href) {
        links[i].setAttribute('href', stamped);
      }
    }
  });
})();
