/* =====================================================
   HOLIDAE — Main JavaScript
   Handles: nav, search, filters, back-to-top, newsletter
   ===================================================== */

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeNav = document.getElementById('close-nav');

function openNav() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  mobileNav.setAttribute('aria-hidden', 'false');
  mobileOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeNavMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openNav);
if (closeNav) closeNav.addEventListener('click', closeNavMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeNavMenu);

// Close nav when a link is clicked inside mobile nav
if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeNavMenu);
  });
}


  // ===== HERO BACKGROUND SLIDESHOW =====
  (function() {
    var slides = document.querySelectorAll('.hero-slide');
    var current = 0;

    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    setInterval(nextSlide, 2000);
  })();


// ===== SEARCH TABS =====
var searchTabs = document.querySelectorAll('.search-tab');
searchTabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    searchTabs.forEach(function(t) { t.classList.remove('active'); });
    this.classList.add('active');
  });
});

// ===== SEARCH HANDLER =====
function handleSearch() {
  var dest = document.getElementById('destination');
  var checkin = document.getElementById('checkin');
  var checkout = document.getElementById('checkout');

  if (!dest || !dest.value.trim()) {
    alert('Please enter a destination to search.');
    if (dest) dest.focus();
    return;
  }
  if (checkin && checkout && checkin.value && checkout.value) {
    if (new Date(checkout.value) <= new Date(checkin.value)) {
      alert('Check-out date must be after check-in date.');
      checkout.focus();
      return;
    }
  }
  // In a real app, this would navigate to results
  alert('Searching for holidays in ' + dest.value + '... (This is a prototype — results page coming soon!)');
}

// Allow Enter key in destination field
var destInput = document.getElementById('destination');
if (destInput) {
  destInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSearch();
  });
}

// Set default dates (today + 30 days, today + 37 days)
(function setDefaultDates() {
  var checkin = document.getElementById('checkin');
  var checkout = document.getElementById('checkout');
  if (!checkin || !checkout) return;

  var today = new Date();
  var dep = new Date(today); dep.setDate(dep.getDate() + 30);
  var ret = new Date(today); ret.setDate(ret.getDate() + 37);

  function fmt(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }
  checkin.value = fmt(dep);
  checkout.value = fmt(ret);
  checkin.min = fmt(today);
  checkout.min = fmt(dep);
})();

// ===== PACKAGE FILTER =====
var filterBtns = document.querySelectorAll('.filter-btn');
var packageCards = document.querySelectorAll('.package-card');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');

    var filter = this.getAttribute('data-filter');

    packageCards.forEach(function(card) {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.35s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== DESTINATIONS CAROUSEL =====
(function() {
  var track = document.getElementById('dest-track');
  var carousel = document.getElementById('dest-carousel');
  var prevBtn = document.getElementById('dest-prev');
  var nextBtn = document.getElementById('dest-next');
  var dotsWrap = document.getElementById('dest-dots');
  if (!track) return;

  var slides = track.querySelectorAll('.dest-slide');
  var total = slides.length;
  var current = 0;
  var autoTimer = null;
  var touchStartX = 0;

  // Build dots
  slides.forEach(function(_, i) {
    var dot = document.createElement('button');
    dot.className = 'dest-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function() { goTo(i); resetAuto(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsWrap.querySelectorAll('.dest-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 4000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  nextBtn.addEventListener('click', function() { next(); resetAuto(); });
  prevBtn.addEventListener('click', function() { prev(); resetAuto(); });

  // Pause on hover
  carousel.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
  carousel.addEventListener('mouseleave', startAuto);

  // Touch / swipe support
  carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      resetAuto();
    }
  }, { passive: true });

  startAuto();
})();

// ===== NEWSLETTER =====
function handleNewsletter(e) {
  e.preventDefault();
  var input = e.target.querySelector('input[type="email"]');
  if (!input || !input.value) return;
  var msg = document.createElement('p');
  msg.textContent = 'Thank you! Check your inbox for exclusive deals.';
  msg.style.cssText = 'color:#fff;font-weight:600;font-size:1rem;margin-top:8px;';
  e.target.replaceWith(msg);
}

// ===== BACK TO TOP =====
var backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== HEADER SCROLL EFFECT =====
var siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      siteHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
    } else {
      siteHeader.style.boxShadow = '';
    }
  });
}
