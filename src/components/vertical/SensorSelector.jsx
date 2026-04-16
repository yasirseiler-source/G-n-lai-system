import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './SensorSelector.module.css'

export default function SensorSelector({ sensors, selected, onToggle, sensorMode, onModeChange, sensorQuantities, onQtyChange, effectiveSensorQty, vertical }) {
  const { t } = useTranslation()
  const sectionTitle = t('builder', vertical?.sensorSectionTitle || 'sensorRecommended')

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <span className={styles.count}>{selected.size} / {sensors.length}</span>
        </div>
        <div className={styles.toggle}>
          <button className={`${styles.toggleBtn} ${sensorMode === 'auto' ? styles.toggleOn : ''}`} onClick={() => onModeChange('auto')}>{t('selector', 'automatic')}</button>
          <button className={`${styles.toggleBtn} ${sensorMode === 'manual' ? styles.toggleOn : ''}`} onClick={() => onModeChange('manual')}>{t('selector', 'manual')}</button>
        </div>
      </div>

      <p className={styles.helper}>{t('builder', 'sensorHelper')}</p>

      <div className={styles.list}>
        {sensors.map((sensor) => {
          const isActive = selected.has(sensor.name)
          const qty = effectiveSensorQty[sensor.name] || 0
          return (
            <div
              key={sensor.name}
              className={`${styles.card} ${isActive ? styles.active : ''}`}
              onClick={() => onToggle(sensor.name)}
            >
              <div className={styles.cardMain}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardNameRow}>
                    <span className={`${styles.indicator} ${isActive ? styles.indicatorOn : ''}`} />
                    <span className={styles.cardName}>{sensor.name}</span>
                  </div>
                  {sensor.desc && <div className={styles.cardDesc}>{sensor.desc}</div>}
                </div>
                <div className={styles.cardRight}>
                  {isActive && (
                    sensorMode === 'manual' ? (
                      <input
                        type="number"
                        min="0"
                        className={styles.qtyInput}
                        value={sensorQuantities[sensor.name] ?? ''}
                        placeholder="—"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onQtyChange(sensor.name, e.target.value)}
                      />
                    ) : (
                      <span className={styles.autoQty}>{qty}×</span>
                    )
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
