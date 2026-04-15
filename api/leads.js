/**
 * Vercel Serverless Function – POST /api/leads
 *
 * Repliziert die Lead-Verarbeitung aus server/index.js fuer Vercel-Deployment.
 * Lokal wird weiterhin der Express-Server verwendet (npm run dev).
 */

import { Resend } from 'resend'
import { buildEmailContent } from '../server/emailTemplates.js'

const {
  RESEND_API_KEY,
  MAIL_FROM = 'noreply@wiseness.app',
  MAIL_TO,
} = process.env

let resend = null
if (RESEND_API_KEY && RESEND_API_KEY !== 're_xxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
  resend = new Resend(RESEND_API_KEY)
}

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

function validateLead(body) {
  const errors = []
  if (!body.customerName?.trim())  errors.push('customerName ist Pflichtfeld')
  if (!body.customerEmail?.trim()) errors.push('customerEmail ist Pflichtfeld')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customerEmail || '')) errors.push('customerEmail ist ungültig')
  if (!['public', 'employee'].includes(body.source)) errors.push('source muss "public" oder "employee" sein')
  if (body.source === 'employee') {
    if (!body.employeeId)   errors.push('employeeId fehlt bei employee-Lead')
    if (!body.employeeName) errors.push('employeeName fehlt bei employee-Lead')
  }
  return errors
}

function sanitizeLead(body) {
  const lead = { ...body }
  if (lead.source === 'public') {
    lead.employeeId      = null
    lead.employeeName    = null
    lead.commissionType  = null
    lead.commissionValue = 0
  }
  lead.status    = lead.status || 'new'
  lead.createdAt = lead.createdAt || new Date().toISOString()
  return lead
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const lang = req.body?.selectedLanguage || 'tr'

  const errors = validateLead(req.body || {})
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: getMsg(lang, 'invalid'),
      errors,
    })
  }

  const lead = sanitizeLead(req.body)

  if (resend && MAIL_TO) {
    try {
      const { subject, html, text } = buildEmailContent(lead)
      await resend.emails.send({
        from: MAIL_FROM,
        to:   [MAIL_TO],
        subject,
        html,
        text,
        replyTo: lead.customerEmail || undefined,
      })
    } catch (mailErr) {
      console.error('[Wiseness API] Resend Fehler:', mailErr.message)
      return res.status(200).json({
        success: true,
        message: getMsg(lang, 'success'),
        warning: 'Mail konnte nicht gesendet werden',
        offline: true,
      })
    }
  }

  return res.status(200).json({
    success: true,
    message: getMsg(lang, 'success'),
    leadId:  lead.leadId,
  })
}
