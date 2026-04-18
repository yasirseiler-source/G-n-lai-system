import { useTranslation } from '../../../i18n/LanguageContext'
import styles from './BudgetSection.module.css'

export default function BudgetSection({ formData, onUpdate }) {
  const { t } = useTranslation()
  const u = (k) => (e) => onUpdate(k, e.target.value)

  return (
    <div className={styles.grid}>
      <div className={`${styles.group} ${styles.full}`}>
        <label className={styles.label}>{t('form','budget')}</label>
        <div className={styles.optionGrid}>
          {[
            t('form','budgetUnder10'),
            t('form','budget10_25'),
            t('form','budget25_50'),
            t('form','budget50_100'),
            t('form','budgetOver100'),
            t('form','budgetNotSet'),
          ].map((opt) => (
            <button
              key={opt}
              type="button"
              className={`${styles.optBtn} ${formData.budgetrahmen === opt ? styles.optBtnActive : ''}`}
              onClick={() => onUpdate('budgetrahmen', opt)}
            >{opt}</button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>{t('form','priority')}</label>
        <select className={styles.select} value={formData.prioritaet || ''} onChange={u('prioritaet')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="low">{t('form','priorityLow')}</option>
          <option value="medium">{t('form','priorityMedium')}</option>
          <option value="high">{t('form','priorityHigh')}</option>
          <option value="urgent">{t('form','priorityUrgent')}</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>{t('form','timeline')}</label>
        <select className={styles.select} value={formData.umsetzungszeitraum || ''} onChange={u('umsetzungszeitraum')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="now">{t('form','timelineNow')}</option>
          <option value="short">{t('form','timelineShort')}</option>
          <option value="medium">{t('form','timelineMedium')}</option>
          <option value="long">{t('form','timelineLong')}</option>
          <option value="open">{t('form','timelineOpen')}</option>
        </select>
      </div>
    </div>
  )
}
