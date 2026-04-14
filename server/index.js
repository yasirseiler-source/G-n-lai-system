/**
 * Wiseness – Express API Server
 *
 * Startet auf PORT (Standard: 3001).
 * Vite-Dev-Server leitet /api/* per Proxy hierher weiter.
 *
 * Endpunkte:
 *   POST /api/leads  – Lead empfangen, validieren, per Resend mailen
 *
 * ⚠️ SICHERHEITSHINWEISE:
 * - RESEND_API_KEY darf NIEMALS im Frontend stehen
 * - Provisionswerte aus Frontend-Payload sind nicht vertrauenswürdig
 *   → Im Produktionsbetrieb aus Datenbank lesen
 * - employeeId muss serverseitig per Token validiert werden
 * - Dieses Demo nutzt Frontend-Payload-Werte als Referenz / Audit-Log
 */

import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { buildEmailContent } from './emailTemplates.js'

// ── Umgebungsvariablen laden ──────────────────────────────────────────────────
// TODO: Kopiere env.example als .env und trage echte Werte ein
let dotenv
try {
  dotenv = await import('dotenv')
  dotenv.config()
} catch {
  // dotenv optional – Umgebungsvariablen können auch direkt gesetzt sein
}

const {
  RESEND_API_KEY,
  MAIL_FROM = 'noreply@wiseness.app',
  MAIL_TO,
  PORT = 3001,
} = process.env

// ── Resend initialisieren ─────────────────────────────────────────────────────
// TODO: RESEND_API_KEY in .env eintragen (https://resend.com/api-keys)
let resend = null
if (RESEND_API_KEY && RESEND_API_KEY !== 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
  resend = new Resend(RESEND_API_KEY)
  console.log('[Wiseness Server] Resend initialisiert ✓')
} else {
  console.warn('[Wiseness Server] ⚠️  RESEND_API_KEY nicht gesetzt – Mails werden in Konsole ausgegeben (Demo-Modus)')
}

// ── Express Setup ─────────────────────────────────────────────────────────────
const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  methods: ['POST', 'GET', 'OPTIONS'],
}))
app.use(express.json({ limit: '1mb' }))

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────

/** Serverseitige Validierung der Lead-Daten */
function validateLead(body) {
  const errors = []

  if (!body.customerName?.trim())  errors.push('customerName ist Pflichtfeld')
  if (!body.customerEmail?.trim()) errors.push('customerEmail ist Pflichtfeld')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customerEmail || '')) errors.push('customerEmail ist ungültig')
  if (!['public', 'employee'].includes(body.source)) errors.push('source muss "public" oder "employee" sein')

  // Mitarbeiter-Leads müssen Mitarbeiterdaten haben
  if (body.source === 'employee') {
    if (!body.employeeId)   errors.push('employeeId fehlt bei employee-Lead')
    if (!body.employeeName) errors.push('employeeName fehlt bei employee-Lead')
  }

  return errors
}

/** Bereinigt public Leads – stellt sicher, dass keine Provision gesetzt ist */
function sanitizeLead(body) {
  const lead = { ...body }

  if (lead.source === 'public') {
    // ⚠️ Sicherheit: öffentliche Leads dürfen KEINE Provision tragen
    lead.employeeId      = null
    lead.employeeName    = null
    lead.commissionType  = null
    lead.commissionValue = 0
  }

  // TODO (Produktion): commissionValue aus Datenbank lesen anhand employeeId
  // Aktuell wird Frontend-Wert als Referenz gespeichert (Audit-Log)

  lead.status    = lead.status || 'new'
  lead.createdAt = lead.createdAt || new Date().toISOString()

  return lead
}

// ── Mehrsprachige Antwortmeldungen ────────────────────────────────────────────
const messages = {
  tr: {
    success: 'Mesajınız başarıyla gönderildi',
    error:   'Gönderim sırasında bir hata oluştu',
    invalid: 'Geçersiz form verisi',
  },
  de: {
    success: 'Ihre Anfrage wurde erfolgreich gesendet',
    error:   'Beim Senden ist ein Fehler aufgetreten',
    invalid: 'Ungültige Formulardaten',
  },
  en: {
    success: 'Your request has been sent successfully',
    error:   'An error occurred while sending your request',
    invalid: 'Invalid form data',
  },
}

function getMsg(lang, key) {
  return messages[lang]?.[key] ?? messages.de[key]
}

// ── POST /api/leads ───────────────────────────────────────────────────────────
app.post('/api/leads', async (req, res) => {
  const lang = req.body.selectedLanguage || 'tr'

  console.log('[Wiseness Server] POST /api/leads –', req.body.source, '–', req.body.customerEmail)

  // 1. Serverseitige Validierung
  const errors = validateLead(req.body)
  if (errors.length > 0) {
    console.warn('[Wiseness Server] Validierungsfehler:', errors)
    return res.status(400).json({
      success: false,
      message: getMsg(lang, 'invalid'),
      errors,
    })
  }

  // 2. Lead bereinigen (Provision bei public auf 0 erzwingen)
  const lead = sanitizeLead(req.body)

  // 3. Konsole (immer – für Debugging und Demo-Modus)
  console.log('[Wiseness Server] Lead bereinigt:', JSON.stringify(lead, null, 2))

  // 4. Resend Mail senden
  if (!MAIL_TO) {
    console.warn('[Wiseness Server] ⚠️  MAIL_TO nicht gesetzt – Mail wird übersprungen (Demo-Modus)')
  }

  if (resend && MAIL_TO) {
    try {
      const { subject, html, text } = buildEmailContent(lead)

      const mailResult = await resend.emails.send({
        from: MAIL_FROM,
        to:   [MAIL_TO],
        subject,
        html,
        text,
        replyTo: lead.customerEmail || undefined,
      })

      console.log('[Wiseness Server] Mail gesendet:', mailResult?.data?.id || mailResult)
    } catch (mailErr) {
      console.error('[Wiseness Server] Resend Fehler:', mailErr.message)
      // Mail-Fehler: Lead trotzdem als empfangen bestätigen (Payload in Konsole)
      return res.status(200).json({
        success: true,
        message: getMsg(lang, 'success'),
        warning: 'Mail konnte nicht gesendet werden – Lead wurde gespeichert',
        offline: true,
      })
    }
  } else {
    // Demo-Modus: Mail-Inhalt in Konsole ausgeben
    const { subject, text } = buildEmailContent(lead)
    console.log('[Wiseness Server] [DEMO] Mail-Betreff:', subject)
    console.log('[Wiseness Server] [DEMO] Mail-Inhalt:\n', text)
  }

  return res.status(200).json({
    success: true,
    message: getMsg(lang, 'success'),
    leadId:  lead.leadId,
  })
})

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    resend: !!resend,
    mailTo: !!MAIL_TO,
    mailFrom: MAIL_FROM,
    timestamp: new Date().toISOString(),
  })
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n[Wiseness Server] ✓ Läuft auf http://localhost:${PORT}`)
  console.log(`[Wiseness Server]   POST /api/leads`)
  console.log(`[Wiseness Server]   GET  /api/health`)
  if (!resend)  console.log('[Wiseness Server]   ℹ️  Demo-Modus: Mails in Konsole')
  if (!MAIL_TO) console.log('[Wiseness Server]   ℹ️  MAIL_TO nicht gesetzt')
  console.log()
})
