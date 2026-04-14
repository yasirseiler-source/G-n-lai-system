import { useTranslation } from '../../../i18n/LanguageContext'
import styles from './BuildingSection.module.css'

export default function BuildingSection({ formData, onUpdate }) {
  const { t } = useTranslation()
  const u = (k) => (e) => onUpdate(k, e.target.value)

  return (
    <div className={styles.grid}>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','totalArea')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','totalAreaPh')} value={formData.gesamtflaeche || ''} onChange={u('gesamtflaeche')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','floors')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','floorsPh')} value={formData.anzahlEtagen || ''} onChange={u('anzahlEtagen')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','rooms')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','roomsPh')} value={formData.anzahlRaeume || ''} onChange={u('anzahlRaeume')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','zones')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','zonesPh')} value={formData.anzahlBereiche || ''} onChange={u('anzahlBereiche')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','indoorAreas')}</label>
        <input className={styles.input} placeholder={t('form','indoorPh')} value={formData.innenbereiche || ''} onChange={u('innenbereiche')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','outdoorAreas')}</label>
        <input className={styles.input} placeholder={t('form','outdoorPh')} value={formData.aussenbereiche || ''} onChange={u('aussenbereiche')} />
      </div>
    </div>
  )
}
