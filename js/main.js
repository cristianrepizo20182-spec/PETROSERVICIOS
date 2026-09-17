/* =========================================================
   PSI — Petroservicios Industriales S.A.S
   Scripts del sitio (multipágina)
   ========================================================= */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".burger");
  var navList = document.querySelector(".nav ul");

  /* --- Textos según idioma de la página (<html lang="es|en">) --- */
  var LANG = (document.documentElement.lang || "es").slice(0, 2) === "en" ? "en" : "es";
  var T = {
    es: {
      file: "Archivo: ",
      notConnected: "Este formulario todavía no está conectado (falta la Access Key de Web3Forms).",
      sending: "Enviando…",
      ok: "¡Gracias! Recibimos tu mensaje, te responderemos pronto.",
      errPrefix: "No se pudo enviar",
      errGeneric: ", inténtalo de nuevo en unos minutos.",
      errNetwork: "No se pudo enviar por un problema de conexión. Inténtalo de nuevo o escríbenos directamente a ventaspsi@petroservicios.com."
    },
    en: {
      file: "File: ",
      notConnected: "This form isn't connected yet (missing the Web3Forms Access Key).",
      sending: "Sending…",
      ok: "Thank you! We received your message and will get back to you soon.",
      errPrefix: "Couldn't send",
      errGeneric: ", please try again in a few minutes.",
      errNetwork: "Couldn't send due to a connection issue. Please try again or email us directly at ventaspsi@petroservicios.com."
    }
  }[LANG];

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
      fname.textContent = plano.files && plano.files[0] ? T.file + plano.files[0].name : "";
    });
  }

  /* --- Formularios: envío real vía Web3Forms (https://web3forms.com) ---
     Cada <form data-psi-form> trae su propio access_key oculto en el HTML;
     reemplaza "TU_ACCESS_KEY_DE_WEB3FORMS" por la clave real (ver README). --- */
  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  function setFormMsg(form, kind, text) {
    var msg = form.querySelector(".form-msg");
    if (!msg) { msg = document.createElement("div"); msg.className = "form-msg"; form.appendChild(msg); }
    msg.className = "form-msg " + kind;
    msg.textContent = text;
  }

  document.querySelectorAll("form[data-psi-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var keyField = form.querySelector('input[name="access_key"]');
      if (!keyField || !keyField.value || keyField.value.indexOf("TU_ACCESS_KEY") === 0) {
        setFormMsg(form, "err", T.notConnected);
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = T.sending; }

      var data = new FormData(form);
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) data.set("replyto", emailField.value);

      fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: data })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json && json.success) {
            setFormMsg(form, "ok", T.ok);
            form.reset();
            var fname = form.querySelector(".fname");
            if (fname) fname.textContent = "";
          } else {
            setFormMsg(form, "err", T.errPrefix + (json && json.message ? ": " + json.message : T.errGeneric));
          }
        })
        .catch(function () {
          setFormMsg(form, "err", T.errNetwork);
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
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
