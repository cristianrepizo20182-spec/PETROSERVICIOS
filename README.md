# PSI — Sitio web de Petroservicios Industriales S.A.S

Sitio web estático (HTML + CSS + JavaScript) para Petroservicios Industriales S.A.S.
Pensado para publicarse en **GitHub Pages** y luego migrar a hosting oficial.

## Estructura

```
psi-web/
├── index.html              # Inicio (corto) — hero de video de fondo + resumen
├── acerca.html             # Acerca de — sub-paneles + frases rotativas
├── productos.html          # Productos — Sector Petrolero / Sector Industrial
├── sector-petrolero.html   # Sector Petrolero — submenú lateral de subcategorías
├── sector-industrial.html  # Sector Industrial — submenú lateral + subir plano
├── blog.html               # Blog — 6 artículos + ver más
├── contacto.html           # Contacto
├── css/styles.css          # Sistema de diseño (tokens, tipografía, componentes)
├── js/main.js              # Nav móvil, dropdown, tabs de sector, frases rotativas, formularios
├── assets/
│   ├── img/  logo-psi.png  # Logo oficial (+ pon aquí fotos: hero-poster.jpg, etc.)
│   ├── video/              # Video del hero → hero.mp4 (por cargar)
│   └── docs/               # Certificados PDF, fichas técnicas (por cargar)
├── .nojekyll               # Evita el procesamiento Jekyll en GitHub Pages
└── README.md
```

## Video de fondo del Inicio
El hero usa `assets/video/hero.mp4` (autoplay, silenciado, en bucle). Mientras no exista,
se muestra un degradado azul de respaldo. Sugerencia: un plano de un torno mecanizando,
en horizontal, comprimido (~1080p, pocos MB). Puedes añadir también `assets/img/hero-poster.jpg`
como imagen de respaldo mientras carga el video.

## Ver el sitio en local

Basta con abrir `index.html` en el navegador. Para una vista más fiel (rutas relativas),
puedes levantar un servidor local:

```bash
# Con Python 3
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `psi-web`) y sube el contenido de esta carpeta.

   ```bash
   git init
   git add .
   git commit -m "Primera versión del sitio PSI"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/psi-web.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Build and deployment**.
   - **Source:** Deploy from a branch
   - **Branch:** `main` · carpeta `/ (root)` · Guardar.

3. En 1–2 minutos el sitio quedará en `https://<tu-usuario>.github.io/psi-web/`.

## Dónde cargar el contenido real

El sitio está armado con **placeholders**. Para reemplazarlos:

- **Imágenes de producto:** dentro de cada tarjeta `.pcard`, cambia
  `<span class="ph">Imagen</span>` por `<img src="assets/img/mi-foto.jpg" alt="...">`.
- **Fotos de infraestructura:** en la sección Infraestructura, reemplaza cada
  `.gcell` por `<div class="gcell"><img src="assets/img/planta1.jpg" alt="..."></div>`.
- **Video de intro:** reemplaza `.video-ph` en el hero por un `<video>` o un `<iframe>`.
- **Certificados:** sube los PDF a `assets/docs/` y enlázalos desde el panel de certificaciones.
- **Textos:** edita directamente `index.html` (Acerca de, descripciones, etc.).

## Formularios (importante)

GitHub Pages es **estático**: no tiene backend, así que los formularios de
**contacto** y **cotización (subir plano)** todavía no envían datos a ningún lado
(muestran una confirmación local).

Para recibir los mensajes hay que conectar un servicio de formularios gratuito, por ejemplo:

- [Formspree](https://formspree.io/) · [Web3Forms](https://web3forms.com/) · [Getform](https://getform.io/)

Se hace añadiendo el `action` del servicio al `<form>` en `index.html`. Lo dejamos listo
cuando definas el correo de recepción.

## Sistema de diseño

- **Colores:** azul cobalto `#1E33C7`, azul eléctrico `#3A54FF`, negro `#0A0A0B`, grises acero, base blanca. (Ver variables en `css/styles.css`.)
- **Tipografías:** Saira (titulares), IBM Plex Sans (cuerpo), IBM Plex Mono (datos).
- Contrastes verificados WCAG AA.

## Próximos pasos

- [ ] Página de catálogo de Productos (por categoría)
- [ ] Páginas de detalle de producto
- [ ] Blog: listado + plantilla de artículo
- [ ] Conectar formularios
- [ ] Cargar contenido real (fotos, textos, certificados, video)

---
© Petroservicios Industriales S.A.S
