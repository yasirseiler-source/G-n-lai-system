import { useTranslation } from '../../i18n/LanguageContext'
import styles from './KPICards.module.css'

export default function KPICards({ vertical, values, onChange }) {
  const { t } = useTranslation()

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{t('kpi', 'title')}</h3>
      <p className={styles.helper}>{t('builder', 'kpiHelper')}</p>
      
      <div className={styles.grid}>
        {vertical.kpis.map((kpi) => {
          const value = values[kpi.key] || ''
          
          return (
            <div key={kpi.key} className={styles.card}>
              <label className={styles.label}>
                <span className={styles.icon}>{kpi.icon}</span>
                {kpi.label}
              </label>
              <input
                type="number"
                min="0"
                value={value}
                onChange={(e) => onChange(kpi.key, e.target.value)}
                className={styles.input}
                placeholder="0"
              />
              {kpi.unit && <span className={styles.unit}>{kpi.unit}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
