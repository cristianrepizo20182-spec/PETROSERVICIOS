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

### Certificados y fotos ya cargados (2026-09-09)

- `assets/docs/psi-*.pdf` — certificados reales vigentes hasta agosto de 2028: ISO 9001:2015,
  API Spec Q1 10.ª ed., API-6A, API-7-1, API-7-2 y API-5B. Enlazados desde `acerca.html` (y su
  par en `en/`) en la sección Certificaciones.
  - **Privacidad (2026-09-16):** por decisión de PSI, los **números de licencia/certificado** y la
    **dirección de la empresa** se ocultaron (barra negra) tanto en los PDF (`assets/docs/psi-*.pdf`)
    como en las imágenes (`assets/img/certs/cert-*.jpg`), y se quitaron del texto de `acerca.html`.
    La redacción de los PDF elimina el texto subyacente (no es solo visual). Los originales sin
    redactar NO están en el repo. Script usado: `redact.py` (PyMuPDF + Pillow).
- `assets/img/real-*.jpg` — 6 fotos reales del taller (torno, rodillo de precisión, crossovers,
  adapter/spacer spools, drill stem subs). Usadas en: `acerca.html` (Infraestructura + Historia),
  `sector-petrolero.html` (Perforación, Conexiones), `sector-industrial.html` (Mecanizados) y la
  portada del artículo de blog "De la idea al plano mecanizado".
- **Corrección:** se retiraron las insignias **API 5CT**, **ISO 14001** e **ISO 45001** del trust
  strip del Inicio y de la franja de certificaciones de Acerca de — no llegó un certificado que
  las respalde. Si PSI ya las tiene, súbelas a `assets/docs/` y vuelve a agregarlas siguiendo el
  mismo patrón (`.certdoc` en `acerca.html`).
- **Pendiente real:** falta la historia/fundación de la empresa (fecha, hitos), fotos del equipo,
  y 2 espacios de la galería de Infraestructura (Foto 7 y video de planta).

## Formularios (importante)

GitHub Pages es **estático**: no tiene backend, así que los formularios de
**contacto** (`contacto.html`) y **cotización / subir plano** (`sector-industrial.html`)
están conectados a [Web3Forms](https://web3forms.com/) — un servicio gratuito que reenvía
cada envío por correo sin necesitar servidor propio. El envío real ocurre en `js/main.js`
vía `fetch` a `https://api.web3forms.com/submit`.

**Para activarlos** (mientras no se haga esto, el sitio avisa que el formulario no está conectado):

1. Entra a [web3forms.com](https://web3forms.com/) e ingresa el correo donde quieres recibir
   los mensajes (por ahora: `gerencia@petroservicios.com`). Te genera una **Access Key** al
   instante, sin crear cuenta con contraseña.
2. Confirma la key desde el correo que te envían.
3. Reemplaza `TU_ACCESS_KEY_DE_WEB3FORMS` por esa clave en el `<input type="hidden" name="access_key">`
   de cada formulario: en `contacto.html` y en `sector-industrial.html`.
4. Prueba ambos formularios en el sitio publicado (Web3Forms puede bloquear envíos hechos
   desde `file://` o `localhost` sin el dominio verificado).

Notas:
- Cada formulario ya incluye protección antispam (honeypot `botcheck`) y un asunto de correo
  fijo por formulario (`subject`, `from_name`), definidos como campos ocultos en el HTML.
- El campo de adjuntar plano PDF (`sector-industrial.html`) usa el plan gratuito de Web3Forms,
  que limita el tamaño de archivo — por eso el texto dice "PDF hasta 5 MB". Si el plan de PSI
  en Web3Forms admite más, se puede subir ese límite ahí y en el `accept`/copy del formulario.
- Si más adelante se prefiere otro servicio (Formspree, Getform), solo hay que cambiar
  `WEB3FORMS_ENDPOINT` y los campos ocultos por los que pida el nuevo servicio.

## Versión en inglés (ES / EN)

El sitio es bilingüe: cada página en español tiene su gemela en inglés dentro de la
carpeta `en/`, con el mismo nombre de archivo (ej. `contacto.html` ↔ `en/contacto.html`).
Es la estrategia de **páginas separadas por idioma** (no un interruptor por JavaScript):
cada versión es HTML real, indexable por Google en su propio idioma.

```
psi-web/
├── index.html, acerca.html, ...   # Español (raíz, como siempre)
└── en/
    ├── index.html, acerca.html, ...  # Inglés — mismo set de páginas
    └── (usa los mismos css/, js/ y assets/ de la raíz vía rutas "../")
```

- El botón **ES | EN** está en el header de cada página (`.langsw` en `css/styles.css`)
  y enlaza a la página equivalente en el otro idioma.
- Cada `<head>` incluye `<link rel="alternate" hreflang="es|en">` apuntando a su par,
  para que los buscadores entiendan que son la misma página en dos idiomas.
- `js/main.js` detecta el idioma leyendo `<html lang="es|en">` y muestra sus textos
  dinámicos (mensajes de formulario, etc.) en el idioma correspondiente — no hace
  falta tocar nada ahí.
- Los formularios en inglés (`en/contacto.html`, `en/sector-industrial.html`) usan la
  misma Access Key de Web3Forms, pero con `subject`/`from_name` distintos (marcados
  "(EN)") para identificar de un vistazo en qué idioma escribió el cliente.

**Al editar contenido español, recuerda replicar el cambio en su par de `en/`** — no hay
generación automática entre ambas versiones, son archivos HTML independientes.

## Sistema de diseño

- **Colores:** azul cobalto `#1E33C7`, azul eléctrico `#3A54FF`, negro `#0A0A0B`, grises acero, base blanca. (Ver variables en `css/styles.css`.)
- **Tipografías:** Saira (titulares), IBM Plex Sans (cuerpo), IBM Plex Mono (datos).
- Contrastes verificados WCAG AA.

## Próximos pasos

- [ ] Página de catálogo de Productos (por categoría)
- [ ] Páginas de detalle de producto
- [ ] Blog: listado + plantilla de artículo
- [ ] Activar formularios (falta pegar la Access Key real de Web3Forms — ver sección "Formularios")
- [ ] Cargar contenido real (fotos, textos, certificados, video)

---
© Petroservicios Industriales S.A.S
