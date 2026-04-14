import { useTranslation } from '../../../i18n/LanguageContext'
import styles from './NeedsSection.module.css'

export default function NeedsSection({ formData, onUpdate }) {
  const { t } = useTranslation()

  const needsFields = [
    { key: 'sicherheitsbedarf',      labelKey: 'needsSecurity' },
    { key: 'automatisierungsbedarf', labelKey: 'needsAutomation' },
    { key: 'aufgabenmanagement',     labelKey: 'needsTaskMgmt' },
    { key: 'wartungsbedarf',         labelKey: 'needsMaintenance' },
    { key: 'kommunikationsbedarf',   labelKey: 'needsCommunication' },
    { key: 'energieueberwachung',    labelKey: 'needsEnergy' },
    { key: 'notfallmanagement',      labelKey: 'needsEmergency' },
  ]

  const levels = [
    t('form', 'needsNone'),
    t('form', 'needsLow'),
    t('form', 'needsMedium'),
    t('form', 'needsHigh'),
    t('form', 'needsVeryHigh'),
  ]
  const colors = ['var(--border)', 'var(--status-green)', '#E8A020', '#D4640A', 'var(--status-red)']

  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>{t('form', 'needsAreaLabel')}</span>
          <span>{t('form', 'needsPriorityLabel')}</span>
          <span>{t('form', 'needsIndicator')}</span>
        </div>

        {needsFields.map(({ key, labelKey }) => {
          const val = formData[key] || ''
          const idx = levels.indexOf(val)
          const pct = idx <= 0 ? 0 : (idx / (levels.length - 1)) * 100

          return (
            <div key={key} className={styles.row}>
              <span className={styles.rowLabel}>{t('form', labelKey)}</span>
              <select
                className={`${styles.rowSelect} select-base`}
                value={val}
                onChange={(e) => onUpdate(key, e.target.value)}
              >
                <option value="">{t('form', 'needsSelect')}</option>
                {levels.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <div className={styles.barWrap}>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%`, background: colors[Math.max(idx, 0)] }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
          {t('form', 'freeText')}
        </label>
        <textarea
          style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '9px 12px', fontFamily: 'inherit', fontSize: 13, color: 'var(--text)', resize: 'vertical', minHeight: 80, outline: 'none' }}
          placeholder={t('form', 'freeTextPh')}
          rows={3}
          value={formData.freitextWuensche || ''}
          onChange={(e) => onUpdate('freitextWuensche', e.target.value)}
        />
      </div>
    </div>
  )
}
