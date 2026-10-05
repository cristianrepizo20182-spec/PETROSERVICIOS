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

})();
