/* =========================================================================
   AZELER — PACK ANIMATIONS (JS)
   - Apparition au scroll (IntersectionObserver) avec léger décalage (stagger)
   - Compteurs animés sur les chiffres clés (.stat__num)
   - Ombre de l'en-tête au scroll
   Respecte prefers-reduced-motion (via anim.css) et se dégrade proprement.
   ========================================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------
     1. En-tête : ombre quand on scrolle
  -------------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --------------------------------------------------------------------
     2. Apparition au scroll
  -------------------------------------------------------------------- */
  // Éléments à révéler : cartes, stats, blocs de contenu (jamais le hero).
  var selectors = [
    '.grid > *', '.stat',
    '.accroche .container > *',
    '.section .container > .text-center',
    '.cta-final', '.kits-contenu', '.kit-box',
    '.pole-chapo', '.pole-brief', '.pole-how', '.pole-cols',
    '.form-card', '.rgpd-card', '.epi-item',
    '.fiche-card', '.step'
  ];
  var nodes = [];
  selectors.forEach(function (sel) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      if (el.closest('.page-hero')) return;      // on n'anime pas le hero
      if (nodes.indexOf(el) === -1) nodes.push(el);
    });
  });

  if (reduce || !('IntersectionObserver' in window)) {
    // Pas d'animation : on montre tout directement.
    nodes.forEach(function (el) { el.classList.add('reveal', 'is-visible'); });
  } else {
    nodes.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Décalage progressif selon la position parmi les frères visibles.
        var sibs = el.parentNode ? el.parentNode.children : [el];
        var idx = Array.prototype.indexOf.call(sibs, el);
        var delay = Math.min(idx * 70, 420);
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------------
     3. Compteurs animés (.stat__num)
  -------------------------------------------------------------------- */
  function animateCount(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/[\d  .]*\d/);          // 1er groupe de chiffres
    if (!m) return;
    var numStr = m[0];
    var target = parseInt(numStr.replace(/[^\d]/g, ''), 10);
    if (!isFinite(target) || target <= 0) return;
    var prefix = raw.slice(0, m.index);
    var suffix = raw.slice(m.index + numStr.length);
    var thousands = /[  .]/.test(numStr);      // séparateur de milliers ?

    var fmt = function (n) {
      return thousands ? n.toLocaleString('fr-FR') : String(n);
    };
    var dur = 1100, start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  var nums = document.querySelectorAll('.stat__num');
  if (nums.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      // on laisse les valeurs telles quelles
    } else {
      var ioNum = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      Array.prototype.forEach.call(nums, function (el) { ioNum.observe(el); });
    }
  }
})();
