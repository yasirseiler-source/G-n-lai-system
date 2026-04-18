import { useTranslation } from '../../../i18n/LanguageContext'
import styles from './InfraSection.module.css'

export default function InfraSection({ formData, onUpdate }) {
  const { t } = useTranslation()
  const u = (k) => (e) => onUpdate(k, e.target.value)

  return (
    <div className={styles.grid}>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','existingCameras')}</label>
        <input className={styles.input} type="number" min="0" placeholder={t('form','existingCamPh')} value={formData.vorhandeneKameras || ''} onChange={u('vorhandeneKameras')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','existingSensors')}</label>
        <input className={styles.input} placeholder={t('form','existingSenPh')} value={formData.vorhandeneSensoren || ''} onChange={u('vorhandeneSensoren')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','existingMachines')}</label>
        <input className={styles.input} placeholder={t('form','existingMachPh')} value={formData.vorhandeneMaschinen || ''} onChange={u('vorhandeneMaschinen')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','existingSoftware')}</label>
        <input className={styles.input} placeholder={t('form','existingSoftPh')} value={formData.vorhandeneSoftware || ''} onChange={u('vorhandeneSoftware')} />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','networkStructure')}</label>
        <select className={styles.select} value={formData.vorhandenesNetzwerk || ''} onChange={u('vorhandenesNetzwerk')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="managed">{t('form','networkYesManaged')}</option>
          <option value="simple">{t('form','networkYesSimple')}</option>
          <option value="none">{t('form','networkNo')}</option>
        </select>
      </div>
      <div className={styles.group}>
        <label className={styles.label}>{t('form','serverExisting')}</label>
        <select className={styles.select} value={formData.serverVorhanden || ''} onChange={u('serverVorhanden')}>
          <option value="">{t('form','pleaseSelect')}</option>
          <option value="yes">{t('form','serverYes')}</option>
          <option value="no">{t('form','serverNo')}</option>
          <option value="cloud">{t('form','serverCloud')}</option>
        </select>
      </div>
    </div>
  )
}
