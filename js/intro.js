/* PSI - Intro en el hero (solo Inicio)
   El video de la marca corre dentro del hero. Al terminar (con el logo completo a la vista)
   se desvanece y deja ver el panel de bienvenida. Una vez por sesion; respeta prefers-reduced-motion. */
(function () {
  "use strict";

  var layer = document.getElementById("heroIntro");
  if (!layer) return;
  var hero = layer.parentNode;
  var SEEN_KEY = "psiIntroSeen";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;
  try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch (e) {}

  function remove() { if (layer && layer.parentNode) layer.parentNode.removeChild(layer); }

  if (reduceMotion || seen) { remove(); return; }
  try { sessionStorage.setItem(SEEN_KEY, "1"); } catch (e) {}

  var video = layer.querySelector(".hero-intro-video");
  var skipBtn = layer.querySelector(".hero-intro-skip");
  var exited = false;

  function exit() {
    if (exited) return;
    exited = true;
    layer.classList.add("done");
    hero.classList.add("reveal");
    setTimeout(remove, 1100);
  }

  if (skipBtn) skipBtn.addEventListener("click", exit);
  if (video) {
    // Al terminar, el ultimo fotograma (logo completo) queda a la vista un instante antes del cierre.
    video.addEventListener("ended", function () { setTimeout(exit, 500); });
    video.addEventListener("error", exit);
    // Arranque acelerado: solo el inicio (engranaje solo) pasa rapido; al caer las gotas de
    // petroleo (~1.8 s del video) vuelve a velocidad normal hasta el final.
    var FAST = 3, EASE_FROM = 1.3, NORMAL_AT = 1.9;
    var pacer = setInterval(function () {
      if (exited || video.ended) { clearInterval(pacer); return; }
      var t = video.currentTime, r;
      if (t <= EASE_FROM) r = FAST;
      else if (t >= NORMAL_AT) r = 1;
      else { var k = (t - EASE_FROM) / (NORMAL_AT - EASE_FROM); r = FAST - (FAST - 1) * k * k * (3 - 2 * k); }
      if (Math.abs(video.playbackRate - r) > 0.01) video.playbackRate = r;
    }, 40);
    video.playbackRate = FAST;
    var p = video.play();
    if (p && p.catch) p.catch(exit);
  }

  // Red de seguridad: nunca dejar el hero tapado si algo falla.
  setTimeout(exit, 10000);
})();
