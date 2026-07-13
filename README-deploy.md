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

## Paso 2 — Publicar en Cloudflare Pages (con Git) → stnflow.online
Mismo patrón que `dyck.stnflow.online` y `gilmar-estrategia`.

✅ Ya hecho: repo **`stnflow-gif/nevermore`** con `index.html` en la raíz.

1. Cloudflare ▸ **Workers & Pages ▸ Create ▸ Pages ▸ Connect to Git** ▸ elige `nevermore`.
   - Framework preset: **None**
   - Build command: *(vacío)*
   - Output dir: **`/`**
   - Deploy → queda en `nevermore.pages.dev` (o similar).

## Paso 3 — Subdominio + SSL
Subdominio: **`nevermore.stnflow.online`**

1. En el proyecto Pages ▸ **Custom domains ▸ Set up a domain** → `nevermore.stnflow.online`.
   Cloudflare te muestra el CNAME a crear.
2. En **GoDaddy** (DNS de stnflow.online, NS = ns57/ns58.domaincontrol.com) crea:
   - Tipo: **CNAME**  ·  Host: `nevermore`  ·  Valor: `<proyecto>.pages.dev`  ·  TTL: 600
   - **NO** un registro A.
3. Cloudflare valida por DCV y emite el certificado SSL automáticamente. Listo 🖤

---

## Notas
- `index.html` tiene `noindex, nofollow` → no aparecerá en Google.
- Todo es un solo archivo autocontenido (GSAP viene por CDN de Cloudflare).
- Respeta `prefers-reduced-motion`.
