/* PSI - Inicio: cifras animadas (respeta prefers-reduced-motion) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var years = document.querySelectorAll("[data-years-since]");
  for (var i = 0; i < years.length; i++) {
    var n = new Date().getFullYear() - parseInt(years[i].getAttribute("data-years-since"), 10);
    years[i].setAttribute("data-count", n);
    years[i].textContent = n;
  }

  var counters = document.querySelectorAll("[data-count]");
  function run(el) {
    var target = parseInt(el.getAttribute("data-count"), 10), t0 = null, dur = 1400;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = "0";
    requestAnimationFrame(step);
  }
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.6 });
    for (var k = 0; k < counters.length; k++) io.observe(counters[k]);
  }

  /* Scroll reveal: los bloques entran deslizandose rapido desde un lateral */
  if (!reduce && "IntersectionObserver" in window) {
    var plan = [
      [".people-head > div:first-child", "left"], [".people-side", "right"],
      [".people-photo", "up"], [".pstats", "up"],
      [".plant-photo", "left"], [".plant-txt", "right"],
      [".what .eyebrow", "left"], [".what .sec-title", "left"], [".what .rule", "left"],
      [".certshow .center", "up"], [".certmarquee", "up"],
      [".certmore", "up"], [".ctaband", "up"]
    ];
    var targets = [];
    plan.forEach(function (p) {
      var els = document.querySelectorAll(p[0]);
      for (var a = 0; a < els.length; a++) { els[a].setAttribute("data-rv", p[1]); targets.push(els[a]); }
    });
    var tiles = document.querySelectorAll(".wtile");
    for (var t = 0; t < tiles.length; t++) {
      tiles[t].setAttribute("data-rv", t % 2 === 0 ? "left" : "right");
      tiles[t].style.setProperty("--rv-d", (Math.floor(t / 2) * 0.09).toFixed(2) + "s");
      targets.push(tiles[t]);
    }
    var chips = document.querySelectorAll(".certchips > div");
    for (var c = 0; c < chips.length; c++) {
      chips[c].setAttribute("data-rv", c === 0 ? "left" : (c === 2 ? "right" : "up"));
      chips[c].style.setProperty("--rv-d", (c * 0.08).toFixed(2) + "s");
      targets.push(chips[c]);
    }
    document.documentElement.classList.add("rv-on");
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el) { rio.observe(el); });
  }
})();
