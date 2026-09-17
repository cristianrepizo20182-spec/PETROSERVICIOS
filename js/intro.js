/* =========================================================
   PSI — Intro de entrada (solo Inicio)
   Video del logo a pantalla completa que cierra en "iris"
   revelando la página. Se muestra una vez por sesión de
   navegador (sessionStorage) y respeta prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var overlay = document.getElementById("siteintro");
  if (!overlay) return;

  var SEEN_KEY = "psiIntroSeen";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function remove() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.documentElement.classList.remove("intro-lock");
  }

  // Ya la vio en esta sesión, o el usuario prefiere menos animación: no mostrarla.
  if (reduceMotion || sessionStorage.getItem(SEEN_KEY) === "1") {
    remove();
    return;
  }

  sessionStorage.setItem(SEEN_KEY, "1");
  document.documentElement.classList.add("intro-lock");

  var video = overlay.querySelector(".siteintro-video");
  var skipBtn = overlay.querySelector(".siteintro-skip");
  var exited = false;

  function exit() {
    if (exited) return;
    exited = true;
    overlay.classList.add("exiting");
    setTimeout(remove, 1000);
  }

  if (skipBtn) skipBtn.addEventListener("click", exit);
  if (video) {
    video.addEventListener("ended", exit);
    video.addEventListener("error", exit);
    var playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(exit);
  }

  // Red de seguridad: nunca dejar al usuario atrapado si algo falla.
  setTimeout(exit, 7000);
})();
