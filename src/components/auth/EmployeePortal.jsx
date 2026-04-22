import { useState } from 'react'
import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import { submitLead } from '../../services/leadService'
import styles from './EmployeePortal.module.css'

export default function EmployeePortal({ employee, onLogout, onNavigateLanding }) {
  const { t, lang } = useTranslation()
  const [formData, setFormData] = useState({
    firmenname: '', email: '', telefon: '',
    freitextWuensche: '', branche: '', standort: '',
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sentLead, setSentLead] = useState(null)

  const upd = (key, val) => {
    setFormData((p) => ({ ...p, [key]: val }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: '' }))
  }

  function validate() {
    const errs = {}
    if (!formData.firmenname.trim()) errs.firmenname = t('validation', 'required')
    if (!formData.email.trim()) errs.email = t('validation', 'required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = t('validation', 'invalidEmail')
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSending(true)
    // ⚠️ Provision wird aus Mitarbeiterprofil übernommen – NICHT aus Formular
    // Produktionsbetrieb: Backend muss Provision aus DB lesen und validieren
    const result = await submitLead({ source: 'employee', formData, employee, lang })
    setSending(false)
    if (result.ok) {
      setSentLead({ ...formData, employee })
      setSent(true)
    }
  }

  if (sent && sentLead) {
    const emp = sentLead.employee
    const commInfo = emp.commissionType === 'percent'
      ? `${emp.commissionValue}% ${t('portal', 'percent')}`
      : `${emp.commissionValue}€ ${t('portal', 'fixed')}`
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}><Icon name="check" size={26} color="var(--status-green)" /></div>
          <h2 className={styles.successTitle}>{t('lead', 'leadSentTitle')}</h2>
          <p className={styles.successText}>{t('lead', 'leadSentText')} <strong>{emp.fullName}</strong> ({commInfo})</p>
          <div className={styles.successMeta}>
            <span><strong>{t('lead', 'customer')}:</strong> {sentLead.firmenname}</span>
            <span><strong>{t('lead', 'emailLabel')}:</strong> {sentLead.email}</span>
            <span><strong>{t('lead', 'sourceLabel')}:</strong> employee</span>
          </div>
          <div className={styles.successActions}>
            <button className={styles.newBtn} onClick={() => { setSent(false); setFormData({ firmenname: '', email: '', telefon: '', freitextWuensche: '', branche: '', standort: '' }) }}>
              {t('lead', 'newLead')}
            </button>
            <button className={styles.backBtn} onClick={onNavigateLanding}>{t('lead', 'backHome')}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.employeeCard}>
            <div className={styles.avatarWrap}>
              <Icon name="briefcase" size={22} color="var(--primary)" />
            </div>
            <div className={styles.empName}>{employee.fullName}</div>
            <div className={styles.empId}>ID: {employee.employeeId}</div>

            <div className={styles.commissionBlock}>
              <div className={styles.commLabel}>{t('portal', 'commission')}</div>
              <div className={styles.commValue}>
                {employee.commissionType === 'percent'
                  ? `${employee.commissionValue}% ${t('portal', 'percent')}`
                  : `${employee.commissionValue}€ ${t('portal', 'fixed')}`}
              </div>
              <div className={styles.commType}>
                {employee.commissionType === 'percent' ? t('portal', 'percentType') : t('portal', 'fixedType')}
              </div>
              <div className={styles.commNote}>{t('portal', 'provSource')}</div>
            </div>

            <div className={styles.secWarn}>
              <Icon name="info" size={11} color="var(--text-muted)" />
              <span>⚠️ {t('portal', 'provSource')} — Backend-Validierung erforderlich.</span>
            </div>

            <button className={styles.logoutBtn} onClick={onLogout}>
              <Icon name="arrowRight" size={12} color="var(--text-muted)" style={{ transform: 'rotate(180deg)' }} />
              {t('auth', 'logout')}
            </button>
          </div>

          <div className={styles.sourceTag}>
            <span className={styles.sourceDot} />
            {t('portal', 'sourceLabel')}
          </div>
        </aside>

        {/* Main */}
        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <button className={styles.backLink} onClick={onNavigateLanding}>
              <Icon name="chevronRight" size={13} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
              {t('portal', 'backHome')}
            </button>
            <div>
              <h1 className={styles.mainTitle}>{t('portal', 'title')}</h1>
              <p className={styles.mainSub}>{t('portal', 'subtitle')} <strong>{employee.fullName}</strong></p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('portal', 'companyLabel')} <span className={styles.req}>*</span></label>
                <input className={`${styles.input} ${errors.firmenname ? styles.inputErr : ''}`}
                  placeholder={t('portal', 'companyPh')} value={formData.firmenname}
                  onChange={(e) => upd('firmenname', e.target.value)} />
                {errors.firmenname && <span className={styles.errMsg}>{errors.firmenname}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('portal', 'emailLabel')} <span className={styles.req}>*</span></label>
                <input className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                  type="email" placeholder={t('portal', 'emailPh')} value={formData.email}
                  onChange={(e) => upd('email', e.target.value)} />
                {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('portal', 'phoneLabel')}</label>
                <input className={styles.input} type="tel" placeholder={t('portal', 'phonePh')}
                  value={formData.telefon} onChange={(e) => upd('telefon', e.target.value)} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('portal', 'sectorLabel')}</label>
                <select className={styles.select} value={formData.branche} onChange={(e) => upd('branche', e.target.value)}>
                  <option value="">{t('form', 'pleaseSelect')}</option>
                  <option>{t('form', 'sectorCare')}</option>
                  <option>{t('form', 'sectorProduction')}</option>
                  <option>{t('form', 'sectorLogistics')}</option>
                  <option>{t('form', 'sectorOffice')}</option>
                  <option>{t('form', 'sectorService')}</option>
                  <option>{t('form', 'sectorOther')}</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t('portal', 'locationLabel')}</label>
                <input className={styles.input} placeholder={t('portal', 'locationPh')}
                  value={formData.standort} onChange={(e) => upd('standort', e.target.value)} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullCol}`}>
                <label className={styles.label}>{t('portal', 'messageLabel')}</label>
                <textarea className={styles.textarea} placeholder={t('portal', 'messagePh')}
                  rows={4} value={formData.freitextWuensche}
                  onChange={(e) => upd('freitextWuensche', e.target.value)} />
              </div>
            </div>

            {/* Lead-Vorschau */}
            <div className={styles.previewBlock}>
              <div className={styles.previewLabel}>
                <Icon name="file" size={13} color="var(--text-muted)" />
                {t('portal', 'previewTitle')}
              </div>
              <div className={styles.previewGrid}>
                <span className={styles.previewKey}>source</span>
                <span className={styles.previewVal}>"employee"</span>
                <span className={styles.previewKey}>employeeId</span>
                <span className={styles.previewVal}>"{employee.employeeId}"</span>
                <span className={styles.previewKey}>employeeName</span>
                <span className={styles.previewVal}>"{employee.fullName}"</span>
                <span className={styles.previewKey}>commissionType</span>
                <span className={styles.previewVal}>"{employee.commissionType}"</span>
                <span className={styles.previewKey}>commissionValue</span>
                <span className={styles.previewVal}>{employee.commissionValue}</span>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn} disabled={sending}>
                {sending ? t('portal', 'submitting') : t('portal', 'submitBtn')}
                {!sending && <Icon name="arrowRight" size={14} color="#fff" />}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
