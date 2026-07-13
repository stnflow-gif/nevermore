/**
 * NEVERMORE — receptor de respuestas → Google Sheets
 *
 * Cómo usarlo:
 * 1. Crea una hoja nueva en https://sheets.google.com  (ej: "Nevermore respuestas")
 * 2. En la hoja: Extensiones ▸ Apps Script
 * 3. Borra todo y pega ESTE archivo completo.
 * 4. Guarda (💾). Luego: Implementar ▸ Nueva implementación ▸ tipo "Aplicación web".
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquier usuario
 * 5. Copia la "URL de la aplicación web" y pégala en index.html → const SHEETS_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Encabezados la primera vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Fecha', '¿Cómo estás?', 'Viaje USA', 'USA (más)',
        '¿Cómo están las chicas?', 'Chicas (más)',
        '¿Monster?', '¿Sandía?', '¿Froot Loops?', '¿Dr Pepper?',
        '¿Revisión aeropuerto?', '¿Funaron a Gaby?', 'Gaby (más)'
      ]);
    }

    var p = e.parameter;
    sheet.appendRow([
      p._fecha || new Date(),
      p.como_estas || '',
      p.usa || '',
      p.usa_extra || '',
      p.chicas || '',
      p.chicas_extra || '',
      p.monster || '',
      p.sandia || '',
      p.frootloops || '',
      p.drpepper || '',
      p.revision || '',
      p.gaby || '',
      p.gaby_extra || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Nevermore ok 🖤');
}
