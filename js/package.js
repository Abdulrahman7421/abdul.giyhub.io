/* =====================================================
   HOLIDAE — Package Page JavaScript
   Handles: gallery, tabs, booking form, scroll
   ===================================================== */

// ===== GALLERY IMAGE SWITCHER =====
function changeImage(thumb, src) {
  var mainImg = document.getElementById('main-img');
  if (!mainImg) return;

  // Fade effect
  mainImg.style.opacity = '0';
  setTimeout(function() {
    mainImg.src = src;
    mainImg.style.opacity = '1';
  }, 200);

  // Update active thumb
  document.querySelectorAll('.thumb').forEach(function(t) {
    t.classList.remove('active');
  });
  thumb.classList.add('active');
}

// ===== PACKAGE TABS =====
var pkgTabs = document.querySelectorAll('.pkg-tab');
var tabPanels = document.querySelectorAll('.tab-panel');

pkgTabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    var target = this.getAttribute('data-target');

    pkgTabs.forEach(function(t) { t.classList.remove('active'); });
    tabPanels.forEach(function(p) { p.classList.remove('active'); });

    this.classList.add('active');
    var panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('active');
      panel.style.animation = 'fadeInUp 0.3s ease forwards';
    }
  });
});

// ===== BOOKING FORM =====
function scrollToBooking() {
  var sidebar = document.getElementById('booking-sidebar');
  if (sidebar) {
    sidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // On mobile, scroll to the sidebar top
    setTimeout(function() {
      var bDep = document.getElementById('b-departure');
      if (bDep) bDep.focus();
    }, 600);
  }
}

function handleBooking(e) {
  e.preventDefault();

  var departure = document.getElementById('b-departure');
  var adults = document.getElementById('b-adults');
  var room = document.getElementById('b-room');

  if (!departure || !departure.value) {
    alert('Please select a departure date.');
    if (departure) departure.focus();
    return;
  }

  var today = new Date();
  var depDate = new Date(departure.value);
  if (depDate <= today) {
    alert('Please select a future departure date.');
    departure.focus();
    return;
  }

  var adultCount = adults ? adults.value : '2';
  var roomType = room ? room.value : 'Overwater Bungalow';
  var depStr = depDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  alert(
    'Booking Request Received!\n\n' +
    'Package: Maldives Paradise Escape\n' +
    'Departure: ' + depStr + '\n' +
    'Adults: ' + adultCount + '\n' +
    'Room: ' + roomType + '\n\n' +
    'In a full version, you would now proceed to payment. ' +
    'Our team will contact you shortly!'
  );
}

// ===== DYNAMIC PRICE CALCULATION =====
(function setupPriceCalc() {
  var adultsSelect = document.getElementById('b-adults');
  var childrenSelect = document.getElementById('b-children');
  var pricePerPerson = 1499;
  var childPrice = 799;

  function updatePrice() {
    var adults = adultsSelect ? parseInt(adultsSelect.value) : 2;
    var children = childrenSelect ? parseInt(childrenSelect.value) : 0;
    var total = (adults * pricePerPerson) + (children * childPrice);

    var adultLine = document.querySelector('.ps-row:first-child span:last-child');
    var adultLabel = document.querySelector('.ps-row:first-child span:first-child');
    var totalEl = document.querySelector('.ps-total span:last-child');

    if (adultLabel) adultLabel.textContent = adults + ' adult' + (adults > 1 ? 's' : '') + ' × £' + pricePerPerson.toLocaleString();
    if (adultLine) adultLine.textContent = '£' + (adults * pricePerPerson).toLocaleString();
    if (totalEl) totalEl.textContent = '£' + total.toLocaleString();
  }

  if (adultsSelect) adultsSelect.addEventListener('change', updatePrice);
  if (childrenSelect) childrenSelect.addEventListener('change', updatePrice);
})();

// ===== SET DEPARTURE DATE DEFAULT =====
(function setDepDefault() {
  var dep = document.getElementById('b-departure');
  if (!dep) return;
  var today = new Date();
  var future = new Date(today);
  future.setDate(future.getDate() + 30);
  function fmt(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }
  dep.value = fmt(future);
  dep.min = fmt(today);
})();
