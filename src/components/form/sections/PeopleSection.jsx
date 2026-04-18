import { useTranslation } from '../../../i18n/LanguageContext'
import styles from './PeopleSection.module.css'

export default function PeopleSection({ formData, onUpdate }) {
  const { t } = useTranslation()
  const u = (k) => (e) => onUpdate(k, e.target.value)

  return (
    <div className={styles.grid}>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','employees')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','employeesPh')} value={formData.anzahlMitarbeiter || ''} onChange={u('anzahlMitarbeiter')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','residents')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','residentsPh')} value={formData.anzahlBewohner || ''} onChange={u('anzahlBewohner')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','shiftSystem')}</label>
        <select className={styles.select} value={formData.schichtsystem || ''} onChange={u('schichtsystem')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="none">{t('form','shiftNone')}</option>
          <option value="shift2">{t('form','shift2')}</option>
          <option value="shift3">{t('form','shift3')}</option>
          <option value="shift247">{t('form','shift247')}</option>
        </select>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','visitorLevel')}</label>
        <select className={styles.select} value={formData.besucheraufkommen || ''} onChange={u('besucheraufkommen')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="low">{t('form','visitorLow')}</option>
          <option value="medium">{t('form','visitorMedium')}</option>
          <option value="high">{t('form','visitorHigh')}</option>
        </select>
      </div>
    </div>
  )
}
