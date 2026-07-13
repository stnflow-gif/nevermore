# Nevermore 🖤 — guía de despliegue

Formulario "contacto cero" con temática cuervo / vampiros / noche estrellada.
Respuestas → Google Sheets. Hosting → subdominio con SSL de Cloudflare.

---

## Paso 1 — Conectar a Google Sheets
1. Crea una hoja en https://sheets.google.com (ej. *Nevermore respuestas*).
2. **Extensiones ▸ Apps Script**, borra todo y pega `google-apps-script.gs`.
3. **Implementar ▸ Nueva implementación ▸ Aplicación web**
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier usuario**
4. Copia la **URL de la app web** (`https://script.google.com/macros/s/AKfy.../exec`).
5. Ábrela en `index.html` y reemplaza:
   ```js
   const SHEETS_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
   ```
   por tu URL real.

> Prueba local: abre `index.html`, llena el form, envía → debe aparecer una fila en la hoja.

---

## Paso 2 — Hosting (opción recomendada: Cloudflare Pages)
Es lo más simple y ya lo has hecho antes (`*.stnflow.online`). Al ser Pages,
Cloudflare gestiona el SSL solo.

**Opción A — arrastrar (sin Git):**
1. Cloudflare Dashboard ▸ **Workers & Pages ▸ Create ▸ Pages ▸ Upload assets**.
2. Arrastra la carpeta `cero-contacto` (solo se sube `index.html`).
3. Se publica en `algo.pages.dev`.

**Opción B — con Git:** conecta un repo con este `index.html` (build vacío, output = `/`).

---

## Paso 3 — Subdominio propio + DNS a Cloudflare
> Rellenar cuando definamos dominio y subdominio (ej. `paraella.tudominio.com`).

Si el dominio **ya está en Cloudflare** (zona activa):
- Pages ▸ tu proyecto ▸ **Custom domains ▸ Set up a domain** → escribe el subdominio.
- Cloudflare crea el CNAME y emite el certificado automáticamente. Listo.

Si el dominio está en **otro registrador (GoDaddy, etc.)** y NO quieres mover la zona:
- En el DNS del registrador crea un **CNAME**:
  - Nombre/Host: `paraella` (el subdominio)
  - Valor: `tu-proyecto.pages.dev`
  - Proxy/SSL: lo gestiona Pages en su lado.
- En Cloudflare Pages ▸ Custom domains, agrega `paraella.tudominio.com` y espera la verificación.

---

## Notas
- `index.html` tiene `noindex, nofollow` → no aparecerá en Google.
- Todo es un solo archivo autocontenido (GSAP viene por CDN de Cloudflare).
- Respeta `prefers-reduced-motion`.
