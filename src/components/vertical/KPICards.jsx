import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './KPICards.module.css'

export default function KPICards({ kpiDefs, kpis, onUpdate }) {
  const { t } = useTranslation()
  const icons = ['users', 'activity', 'grid', 'target', 'settings']

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.label}>
          <Icon name="chart" size={14} color="var(--text-muted)" />
          <span>{t('kpi', 'title')}</span>
        </div>
      </div>
      <div className={styles.grid}>
        {kpiDefs.map((kpi, i) => (
          <div key={kpi.key} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <Icon name={icons[i % icons.length]} size={14} color="var(--primary)" />
              </div>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </div>
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
  )
}
