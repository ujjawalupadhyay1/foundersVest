/* ══ FounderVest – shared JS ══ */

// ── NAV TOGGLE (global, called by onclick) ──
function toggleNav() {
  var nav = document.getElementById('mobNav');
  if (!nav) return;
  nav.classList.toggle('open');
  var hb = document.querySelector('.hamburger');
  if (hb) hb.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function () {

  // Close mobile nav on link click
  document.querySelectorAll('.mob-nav .nav-link').forEach(function (l) {
    l.addEventListener('click', function () {
      var nav = document.getElementById('mobNav');
      if (nav) nav.classList.remove('open');
      var hb = document.querySelector('.hamburger');
      if (hb) hb.classList.remove('open');
    });
  });

  // ── ACTIVE NAV LINK ──
  var page = location.pathname.split('/').pop() || 'index.html';
  if (!page) page = 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (l) {
    l.classList.remove('active');
    if (l.getAttribute('href') === page) l.classList.add('active');
  });

  // ── SCROLL FADE-IN ──
  var fadeEls = document.querySelectorAll('.fade-in');

  function checkVisible(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 40 && rect.bottom > 0;
  }

  function revealAll() {
    fadeEls.forEach(function (el) {
      if (checkVisible(el)) el.classList.add('visible');
    });
  }

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(function (el) { obs.observe(el); });
  } else {
    // Fallback for older browsers
    window.addEventListener('scroll', revealAll, { passive: true });
  }

  // Always reveal elements already in viewport on load
  setTimeout(revealAll, 60);

});

// ── MODALS ──
function openModal(id) {
  var el = document.getElementById('modal-' + id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  var el = document.getElementById('modal-' + id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
