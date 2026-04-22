/**
 * Lead Service – zentraler Submit-Punkt für alle Anfragen
 *
 * ⚠️ SICHERHEITSHINWEIS:
 * - Payload-Werte (inkl. commissionValue) können im Frontend manipuliert werden.
 * - Das Backend MUSS Provisionswerte aus der eigenen Datenbank lesen
 *   und den gesendeten Wert nur als Referenz / Audit-Log behandeln.
 * - Authentifizierung (employeeId) muss serverseitig über Token geprüft werden.
 * - Der Express-Server unter /api/leads bereinigt public Leads serverseitig.
 */

import { createLead } from '../data/leadSchema'

/**
 * @param {object} options
 * @param {'public'|'employee'} options.source
 * @param {object} options.formData  – aktueller Formular-State
 * @param {object|null} options.employee – eingeloggter Mitarbeiter oder null
 * @param {object} [options.extra]   – zusätzliche Felder (Module, Sensoren etc.)
 * @param {string} [options.lang]    – aktuelle Sprache ('tr'|'de'|'en')
 * @returns {Promise<{ok: boolean, message?: string, offline?: boolean, warning?: string}>}
 */
export async function submitLead({ source, formData, employee = null, extra = {}, lang = 'tr' }) {
  const lead = {
    ...createLead({ source, formData, employee }),
    ...extra,
    selectedLanguage: lang,
    pageContext: extra.vertical || source,
  }

  console.log('[Wiseness] Lead Payload:', lead)

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })

    // Server ist erreichbar – Antwort auswerten
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      console.warn('[Wiseness] Server Validierungsfehler:', data)
      return { ok: false, message: data.message || 'Fehler', errors: data.errors }
    }

    return {
      ok: true,
      message: data.message,
      warning: data.warning,
      offline: data.offline || false,
      leadId: data.leadId,
    }
  } catch (err) {
    // Server nicht erreichbar – Payload in Konsole + Offline-Modus
    console.warn('[Wiseness] API nicht verfügbar, Offline-Modus:', err.message)
    return { ok: true, offline: true }
  }
}
