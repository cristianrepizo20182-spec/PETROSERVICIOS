/* =========================================================
   PSI — Petroservicios Industriales S.A.S
   Scripts del sitio (multipágina)
   ========================================================= */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".burger");
  var navList = document.querySelector(".nav ul");

  /* --- Menú móvil (hamburguesa) --- */
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }

  /* --- Dropdown "Productos" en móvil --- */
  var dropParent = document.querySelector(".nav li.has-drop");
  var dropLink = dropParent ? dropParent.querySelector("a") : null;
  if (dropParent && dropLink) {
    dropLink.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && window.innerWidth <= 880) {
        if (!dropParent.classList.contains("sub-open")) {
          e.preventDefault();
          dropParent.classList.add("sub-open");
        }
      }
    });
  }

  /* --- Nombre del archivo (plano PDF) --- */
  var plano = document.getElementById("plano");
  if (plano) {
    plano.addEventListener("change", function () {
      var label = plano.closest(".dropzone");
      if (!label) return;
      var fname = label.querySelector(".fname");
      if (!fname) { fname = document.createElement("span"); fname.className = "fname"; label.appendChild(fname); }
      fname.textContent = plano.files && plano.files[0] ? "Archivo: " + plano.files[0].name : "";
    });
  }

  /* --- Formularios (estático: confirmación local) ---
     Para recibir datos, conectar Formspree / Web3Forms / Getform. --- */
  document.querySelectorAll("form[data-psi-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-msg");
      if (!msg) { msg = document.createElement("div"); msg.className = "form-msg"; form.appendChild(msg); }
      msg.className = "form-msg ok";
      msg.textContent = "¡Gracias! Recibimos tu mensaje. (Pendiente conectar el servicio de envío.)";
      form.reset();
      var fname = form.querySelector(".fname");
      if (fname) fname.textContent = "";
    });
  });

  /* --- Submenú lateral de sector (tabs) --- */
  var subnav = document.querySelector(".subnav");
  if (subnav) {
    var btns = subnav.querySelectorAll("button[data-target]");
    function activate(id) {
      btns.forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-target") === id); });
      document.querySelectorAll(".catpanel").forEach(function (p) { p.classList.toggle("on", p.id === id); });
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { activate(b.getAttribute("data-target")); });
    });
    // Abrir el que venga en el hash, o el primero
    var initial = location.hash ? location.hash.substring(1) : null;
    if (initial && document.getElementById(initial)) activate(initial);
    else if (btns[0]) activate(btns[0].getAttribute("data-target"));
  }

  /* --- Frases rotativas (Acerca de) --- */
  var quotes = document.querySelector(".quotes");
  if (quotes) {
    var qs = quotes.querySelectorAll(".q");
    var dotsWrap = quotes.querySelector(".dots");
    var i = 0, timer;
    if (qs.length) {
      qs.forEach(function (_, idx) {
        var d = document.createElement("i");
        if (dotsWrap) dotsWrap.appendChild(d);
      });
      var dots = dotsWrap ? dotsWrap.querySelectorAll("i") : [];
      function show(n) {
        qs.forEach(function (q, idx) { q.classList.toggle("on", idx === n); });
        if (dots.length) dots.forEach(function (d, idx) { d.classList.toggle("on", idx === n); });
        i = n;
      }
      function next() { show((i + 1) % qs.length); }
      show(0);
      if (qs.length > 1) {
        timer = setInterval(next, 5000);
        dots.forEach(function (d, idx) {
          d.style.cursor = "pointer";
          d.addEventListener("click", function () { clearInterval(timer); show(idx); timer = setInterval(next, 5000); });
        });
      }
    }
  }

  /* --- Año dinámico --- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
