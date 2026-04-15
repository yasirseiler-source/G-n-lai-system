/**
 * Lead-Datenstruktur – Factory-Funktion
 *
 * Jede Anfrage (öffentlich oder Mitarbeiter) wird als Lead-Objekt aufgebaut.
 * Felder sind identisch für beide Quellen; source + Mitarbeiterfelder unterscheiden sie.
 *
 * ⚠️ SICHERHEITSHINWEIS:
 * commissionType und commissionValue werden hier aus dem Frontend-Payload übernommen.
 * Im Produktionsbetrieb MUSS das Backend diese Werte aus der Datenbank lesen
 * und den Frontend-Wert ignorieren oder validieren.
 */

export function createLead({ source, formData, employee = null }) {
  return {
    // Identifikation
    leadId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),

    // Herkunft: 'public' (Besucher) | 'employee' (Mitarbeiter-Portal)
    source,

    // Kundendaten
    customerName:  formData.firmenname       || '',
    customerEmail: formData.email            || '',
    customerPhone: formData.telefon          || '',
    message:       formData.freitextWuensche || '',

    // Mitarbeiter-Zuordnung (null wenn source = 'public')
    employeeId:      employee?.employeeId     ?? null,
    employeeName:    employee?.fullName        ?? null,
    employeeEmail:   employee?.email           ?? null,
    employeeRole:    employee?.role            ?? null,

    // Provision – wird beim Absenden fest gespeichert
    // ⚠️ Produktionsbetrieb: Wert aus DB lesen, nicht aus Frontend übernehmen
    commissionType:  employee?.commissionType  ?? null,
    commissionValue: employee?.commissionValue ?? 0,

    // Status
    status: 'new',
  }
}
