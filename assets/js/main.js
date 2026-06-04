/* NonAR-LM @ COLM 2026 — interactivity only.
   The site is fully readable with JavaScript disabled; this script
   only enhances navigation and key-date display. */
(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll('#navLinks a[href^="#"]')
  );
  var sections = navAnchors
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      return el ? { a: a, el: el } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var match = sections.find(function (s) {
            return s.el === entry.target;
          });
          if (!match) return;
          navAnchors.forEach(function (a) {
            a.classList.toggle("is-active", a === match.a);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      io.observe(s.el);
    });
  }

  /* ---------- Key dates: mute past, flag the next upcoming ---------- */
  var dateCards = Array.prototype.slice.call(
    document.querySelectorAll(".date-card[data-deadline]")
  );
  if (dateCards.length) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var upcoming = [];
    dateCards.forEach(function (card) {
      var raw = card.getAttribute("data-deadline");
      if (!raw) return;
      var parts = raw.split("-");
      var d = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10)
      );
      d.setHours(0, 0, 0, 0);
      if (d < today) {
        card.classList.add("is-past");
      } else {
        upcoming.push({ card: card, time: d.getTime() });
      }
    });
    if (upcoming.length) {
      upcoming.sort(function (a, b) {
        return a.time - b.time;
      });
      upcoming[0].card.classList.add("is-next");
    }
  }
})();
