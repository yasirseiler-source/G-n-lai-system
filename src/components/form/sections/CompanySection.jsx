import { useTranslation } from '../../../i18n/LanguageContext'
import styles from './CompanySection.module.css'

// Sektor-bezogene Objekttyp-Optionen (value = stabiler Key, unabhängig von Sprache)
const OBJECT_TYPES_BY_SECTOR = {
  pflege:      ['objectNursing', 'objectClinic', 'objectMixed'],
  fabrik:      ['objectFactory', 'objectWarehouse', 'objectMixed'],
  unternehmen: ['objectOffice', 'objectAdmin', 'objectMixed'],
  all:         ['objectNursing', 'objectClinic', 'objectFactory', 'objectWarehouse', 'objectOffice', 'objectAdmin', 'objectMixed'],
}

export default function CompanySection({ formData, onUpdate, verticalId }) {
  const { t } = useTranslation()
  const u = (k) => (e) => onUpdate(k, e.target.value)

  const objKeys = OBJECT_TYPES_BY_SECTOR[verticalId] || OBJECT_TYPES_BY_SECTOR.all

  return (
    <div className={styles.grid}>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','companyName')}</label>
        <input className={styles.input} placeholder={t('form','companyNamePh')} value={formData.firmenname || ''} onChange={u('firmenname')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','contactPerson')}</label>
        <input className={styles.input} placeholder={t('form','contactPh')} value={formData.ansprechpartner || ''} onChange={u('ansprechpartner')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','phone')}</label>
        <input className={styles.input} type="tel" placeholder={t('form','phonePh')} value={formData.telefon || ''} onChange={u('telefon')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','email')}</label>
        <input className={styles.input} type="email" placeholder={t('form','emailPh')} value={formData.email || ''} onChange={u('email')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','location')}</label>
        <input className={styles.input} placeholder={t('form','locationPh')} value={formData.standort || ''} onChange={u('standort')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','sector')}</label>
        <select className={styles.select} value={formData.branche || ''} onChange={u('branche')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="care">{t('form','sectorCare')}</option>
          <option value="production">{t('form','sectorProduction')}</option>
          <option value="logistics">{t('form','sectorLogistics')}</option>
          <option value="office">{t('form','sectorOffice')}</option>
          <option value="service">{t('form','sectorService')}</option>
          <option value="other">{t('form','sectorOther')}</option>
        </select>
      </div>
      <div className={`${styles.group} ${styles.full}`}>
        <label className={styles.label}>{t('form','objectType')}</label>
        <select className={styles.select} value={formData.objekttyp || ''} onChange={u('objekttyp')}>
          <option value="">{t('form','pleaseSelect')}</option>
          {objKeys.map((key) => (
            <option key={key} value={key}>{t('form', key)}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
