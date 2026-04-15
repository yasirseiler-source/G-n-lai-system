/**
 * E-Mail-Templates für Wiseness Lead-Benachrichtigungen
 * Unterstützt: Öffentliche Anfragen (source: 'public') und Mitarbeiter-Anfragen (source: 'employee')
 */

/**
 * Erstellt den HTML-Inhalt der Benachrichtigungs-E-Mail
 * @param {object} lead – vollständige Lead-Payload (aus /api/leads)
 * @returns {{ subject: string, html: string, text: string }}
 */
export function buildEmailContent(lead) {
  const isEmployee = lead.source === 'employee'
  const date = new Date(lead.createdAt || Date.now()).toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const subject = isEmployee
    ? `🔵 Neue Mitarbeiter-Anfrage – ${lead.customerName || 'Unbekannt'}`
    : `🟢 Neue öffentliche Anfrage – ${lead.customerName || 'Unbekannt'}`

  const sourceLabel = isEmployee ? 'Mitarbeiter-Portal (employee)' : 'Öffentliches Formular (public)'
  const sourceBadgeColor = isEmployee ? '#1B5FA6' : '#00B896'

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #F5F8FB; color: #1A2332; }
  .wrapper { max-width: 640px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #E1E8F0; }
  .header { background: #1B5FA6; color: #fff; padding: 28px 32px; }
  .header-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
  .header-sub { font-size: 13px; opacity: 0.8; }
  .source-badge { display: inline-block; background: ${sourceBadgeColor}; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
  .section { padding: 24px 32px; border-bottom: 1px solid #E1E8F0; }
  .section:last-child { border-bottom: none; }
  .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #8A9BAD; margin-bottom: 14px; }
  .field { margin-bottom: 10px; }
  .field-label { font-size: 11px; color: #8A9BAD; font-weight: 600; margin-bottom: 2px; }
  .field-value { font-size: 13.5px; color: #1A2332; font-weight: 500; }
  .field-value.highlight { color: #1B5FA6; font-weight: 700; }
  .field-value.commission { color: #00B896; font-weight: 700; font-size: 15px; }
  .message-box { background: #F5F8FB; border: 1px solid #E1E8F0; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.6; color: #1A2332; margin-top: 8px; }
  .null-value { color: #C0CCDA; font-style: italic; }
  .row { display: flex; gap: 32px; }
  .row .field { flex: 1; }
  .footer { background: #F5F8FB; padding: 18px 32px; font-size: 11px; color: #8A9BAD; text-align: center; }
  .status-chip { display: inline-block; background: #D6E8F7; color: #1B5FA6; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 6px 0; vertical-align: top; }
  td:first-child { width: 38%; font-size: 11px; color: #8A9BAD; font-weight: 600; padding-right: 12px; }
  td:last-child { font-size: 13px; color: #1A2332; }
  .warn { background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 5px; padding: 10px 14px; font-size: 12px; color: #92400E; margin-top: 14px; }
</style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <div class="header-title">Wiseness – Neue Anfrage</div>
    <div class="header-sub">${date}</div>
    <div class="source-badge">${sourceLabel}</div>
  </div>

  <!-- Anfragedaten -->
  <div class="section">
    <div class="section-title">Anfrage-Informationen</div>
    <table>
      <tr><td>Lead-ID</td><td><span class="field-value">${lead.leadId || '—'}</span></td></tr>
      <tr><td>Datum / Uhrzeit</td><td>${date}</td></tr>
      <tr><td>Quelle</td><td><strong>${lead.source}</strong></td></tr>
      <tr><td>Status</td><td><span class="status-chip">${lead.status || 'new'}</span></td></tr>
      <tr><td>Sprache</td><td>${lead.selectedLanguage || '—'}</td></tr>
      ${lead.pageContext ? `<tr><td>Seitenkontext</td><td>${lead.pageContext}</td></tr>` : ''}
    </table>
  </div>

  <!-- Kundendaten -->
  <div class="section">
    <div class="section-title">Kundendaten</div>
    <table>
      <tr><td>Name / Firma</td><td class="field-value highlight">${lead.customerName || '<span class="null-value">nicht angegeben</span>'}</td></tr>
      <tr><td>E-Mail</td><td>${lead.customerEmail ? `<a href="mailto:${lead.customerEmail}" style="color:#1B5FA6">${lead.customerEmail}</a>` : '<span class="null-value">—</span>'}</td></tr>
      <tr><td>Telefon</td><td>${lead.customerPhone || '<span class="null-value">—</span>'}</td></tr>
      ${lead.branche ? `<tr><td>Branche</td><td>${lead.branche}</td></tr>` : ''}
      ${lead.standort ? `<tr><td>Standort</td><td>${lead.standort}</td></tr>` : ''}
    </table>
  </div>

  <!-- Nachricht -->
  ${lead.message ? `
  <div class="section">
    <div class="section-title">Nachricht / Anmerkungen</div>
    <div class="message-box">${lead.message.replace(/\n/g, '<br/>')}</div>
  </div>` : ''}

  <!-- Mitarbeiterdaten -->
  <div class="section">
    <div class="section-title">Mitarbeiter & Provision</div>
    <table>
      <tr><td>Mitarbeiter-ID</td><td>${lead.employeeId ?? '<span class="null-value">— (public)</span>'}</td></tr>
      <tr><td>Mitarbeitername</td><td>${lead.employeeName ?? '<span class="null-value">— (public)</span>'}</td></tr>
      <tr><td>Mitarbeiter-E-Mail</td><td>${lead.employeeEmail ? `<a href="mailto:${lead.employeeEmail}" style="color:#1B5FA6">${lead.employeeEmail}</a>` : '<span class="null-value">— (public)</span>'}</td></tr>
      <tr><td>Rolle</td><td>${lead.employeeRole ?? '<span class="null-value">—</span>'}</td></tr>
      <tr><td>Provisionsart</td><td>${lead.commissionType ?? '<span class="null-value">keine</span>'}</td></tr>
      <tr><td>Provision</td><td class="field-value commission">${
        lead.commissionType === 'percent' ? `${lead.commissionValue}%`
        : lead.commissionType === 'fixed' ? `${lead.commissionValue}€`
        : '<span class="null-value">0 (public)</span>'
      }</td></tr>
    </table>
    ${lead.source === 'public' ? `<div class="warn">
      Öffentliche Anfrage — kein Mitarbeiter zugeordnet.
    </div>` : ''}
  </div>

  <!-- Technische Details (falls vorhanden) -->
  ${lead.systemSize || lead.selectedModules ? `
  <div class="section">
    <div class="section-title">System-Konfiguration</div>
    <table>
      ${lead.vertical ? `<tr><td>Branche/Vertikal</td><td>${lead.vertical}</td></tr>` : ''}
      ${lead.systemSize ? `<tr><td>Systemgröße</td><td><strong>${lead.systemSize}</strong></td></tr>` : ''}
      ${lead.cameraCount != null ? `<tr><td>Empf. Kameras</td><td>${lead.cameraCount}</td></tr>` : ''}
      ${lead.selectedModules ? `<tr><td>Module (${lead.selectedModules.length})</td><td>${lead.selectedModules.join(', ')}</td></tr>` : ''}
      ${lead.selectedSensors ? `<tr><td>Sensoren</td><td>${lead.selectedSensors.join(', ')}</td></tr>` : ''}
    </table>
  </div>` : ''}

  <div class="footer">
    Wiseness Intake Dashboard · Automatisch generiert · ${new Date().getFullYear()}
  </div>

</div>
</body>
</html>`

  // Plain-Text-Fallback
  const text = `
WISENESS – NEUE ANFRAGE
========================
Datum:        ${date}
Quelle:       ${lead.source}
Lead-ID:      ${lead.leadId || '—'}
Status:       ${lead.status || 'new'}
Sprache:      ${lead.selectedLanguage || '—'}

KUNDENDATEN
-----------
Name:         ${lead.customerName || '—'}
E-Mail:       ${lead.customerEmail || '—'}
Telefon:      ${lead.customerPhone || '—'}

NACHRICHT
---------
${lead.message || '—'}

MITARBEITER
-----------
ID:           ${lead.employeeId ?? '—'}
Name:         ${lead.employeeName ?? '—'}
E-Mail:       ${lead.employeeEmail ?? '—'}
Rolle:        ${lead.employeeRole ?? '—'}
Provision:    ${lead.commissionType === 'percent' ? `${lead.commissionValue}%` : lead.commissionType === 'fixed' ? `${lead.commissionValue}€` : '0 (public)'}

⚠️ Provisionen müssen serverseitig validiert werden.
`.trim()

  return { subject, html, text }
}
