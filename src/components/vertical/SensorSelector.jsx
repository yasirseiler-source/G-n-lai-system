import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './SensorSelector.module.css'

export default function SensorSelector({ sensors, selected, onToggle, sensorMode, onModeChange, sensorQuantities, onQtyChange, effectiveSensorQty }) {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.label}>
          <Icon name="radio" size={14} color="var(--text-muted)" />
          <span>{t('selector', 'recommendedSensors')}</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.count}>{selected.size} / {sensors.length} {t('selector', 'activeOf')}</span>
          <div className={styles.toggle}>
            <button className={`${styles.toggleBtn} ${sensorMode === 'auto' ? styles.toggleOn : ''}`} onClick={() => onModeChange('auto')}>{t('selector', 'automatic')}</button>
            <button className={`${styles.toggleBtn} ${sensorMode === 'manual' ? styles.toggleOn : ''}`} onClick={() => onModeChange('manual')}>{t('selector', 'manual')}</button>
          </div>
        </div>
      </div>

      <div className={styles.modeHint}>
        <Icon name="info" size={12} color="var(--text-muted)" />
        {sensorMode === 'auto' ? t('selector', 'autoHint') : t('selector', 'manualHint')}
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>{t('selector', 'sensorType')}</span>
          <span>{t('selector', 'unit')}</span>
          <span className={styles.colQty}>{t('selector', 'qty')}</span>
        </div>
        {sensors.map((sensor) => {
          const isActive = selected.has(sensor.name)
          const qty = effectiveSensorQty[sensor.name] || 0
          return (
            <div key={sensor.name} className={`${styles.row} ${isActive ? styles.rowActive : ''}`}>
              <div className={styles.rowLeft}>
                <button className={styles.checkBtn} onClick={() => onToggle(sensor.name)}>
                  <div className={`${styles.checkBox} ${isActive ? styles.checkOn : ''}`}>
                    {isActive && <Icon name="check" size={9} color="#fff" />}
                  </div>
                </button>
                <span className={styles.sensorName}>{sensor.name}</span>
              </div>
              <span className={styles.sensorUnit}>{sensor.unit}</span>
              <div className={styles.colQty}>
                {isActive && (
                  sensorMode === 'manual' ? (
                    <input type="number" min="0" className={styles.qtyInput}
                      value={sensorQuantities[sensor.name] ?? ''} placeholder="—"
                      onChange={(e) => onQtyChange(sensor.name, e.target.value)} />
                  ) : (
                    <span className={styles.autoQty}>{qty}</span>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
