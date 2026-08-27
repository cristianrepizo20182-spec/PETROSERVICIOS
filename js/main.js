/* =========================================================
   PSI — Petroservicios Industriales S.A.S
   Scripts del sitio: navegación móvil, dropdown, formularios
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
      var expanded = nav.classList.contains("open");
      burger.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  /* --- Dropdown "Productos" en móvil: primer toque abre el submenú --- */
  var dropParent = document.querySelector(".nav li.has-drop");
  var dropLink = dropParent ? dropParent.querySelector("a") : null;
  if (dropParent && dropLink) {
    dropLink.addEventListener("click", function (e) {
      // solo interceptar en modo móvil (menú abierto en columna)
      if (nav.classList.contains("open") && window.innerWidth <= 880) {
        if (!dropParent.classList.contains("sub-open")) {
          e.preventDefault();
          dropParent.classList.add("sub-open");
        }
      }
    });
  }

  /* --- Cerrar el menú al hacer clic en un enlace de navegación --- */
  if (navList) {
    navList.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        // no cerrar si es el enlace padre "Productos" que solo abre submenú
        if (a === dropLink && !dropParent.classList.contains("sub-open")) return;
        nav.classList.remove("open");
        if (dropParent) dropParent.classList.remove("sub-open");
      });
    });
  }

  /* --- Mostrar el nombre del archivo (plano PDF) al seleccionarlo --- */
  var plano = document.getElementById("plano");
  if (plano) {
    plano.addEventListener("change", function () {
      var label = plano.closest(".dropzone");
      if (!label) return;
      var fname = label.querySelector(".fname");
      if (!fname) {
        fname = document.createElement("span");
        fname.className = "fname";
        label.appendChild(fname);
      }
      fname.textContent = plano.files && plano.files[0] ? "Archivo: " + plano.files[0].name : "";
    });
  }

  /* --- Envío de formularios ---
     NOTA: GitHub Pages es estático (sin backend). Para recibir los mensajes
     y cotizaciones hay que conectar un servicio de formularios
     (Formspree / Web3Forms / Getform) o un endpoint de correo.
     Mientras tanto, mostramos una confirmación local. --- */
  function handleForm(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-msg");
      if (!msg) {
        msg = document.createElement("div");
        msg.className = "form-msg";
        form.appendChild(msg);
      }
      msg.className = "form-msg ok";
      msg.textContent = "¡Gracias! Recibimos tu mensaje. (Pendiente conectar el servicio de envío.)";
      form.reset();
      var fname = form.querySelector(".fname");
      if (fname) fname.textContent = "";
    });
  }
  document.querySelectorAll("form[data-psi-form]").forEach(handleForm);

  /* --- Año dinámico en el footer --- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
