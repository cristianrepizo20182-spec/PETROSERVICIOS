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
    video.addEventListener("ended", function () { setTimeout(exit, 800); });
    video.addEventListener("error", exit);
    var p = video.play();
    if (p && p.catch) p.catch(exit);
  }

  // Red de seguridad: nunca dejar el hero tapado si algo falla.
  setTimeout(exit, 10000);
})();
