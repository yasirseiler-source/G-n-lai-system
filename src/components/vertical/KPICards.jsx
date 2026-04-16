import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './KPICards.module.css'

export default function KPICards({ kpiDefs, kpis, onUpdate }) {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('builder', 'kpiTitle')}</h2>
        <p className={styles.helper}>{t('builder', 'kpiHelper')}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.grid}>
          {kpiDefs.map((kpi) => (
            <div key={kpi.key} className={styles.field}>
              <label className={styles.label}>{kpi.label}</label>
              <input
                type="number"
                min="0"
                className={styles.input}
                value={kpis[kpi.key] ?? ''}
                onChange={(e) => onUpdate(kpi.key, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
