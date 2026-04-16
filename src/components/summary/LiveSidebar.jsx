import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './LiveSidebar.module.css'

export default function LiveSidebar({
  selectedModules, selectedSensors, effectiveSensorQty,
  systemSize, cameraCount, moduleCount, sensorCount,
  formData, vertical, onNavigateFinal,
}) {
  const { t } = useTranslation()

  const sizeConfig = {
    S:  { label: t('sidebar', 'sizeSmall'),  color: 'var(--status-green)',  pct: 25 },
    M:  { label: t('sidebar', 'sizeMedium'), color: 'var(--ctx-accent, var(--primary))', pct: 50 },
    L:  { label: t('sidebar', 'sizeLarge'),  color: 'var(--status-yellow)', pct: 75 },
    XL: { label: t('builder', 'sizeXL'),     color: 'var(--status-red)',    pct: 100 },
  }

  const needsKeys = [
    { key: 'sicherheitsbedarf',    label: t('needs', 'security') },
    { key: 'automatisierungsbedarf', label: t('needs', 'automation') },
    { key: 'wartungsbedarf',       label: t('needs', 'maintenance') },
    { key: 'notfallmanagement',    label: t('needs', 'emergency') },
  ]

  const levelOptions = [
    t('form', 'needsNone'),
    t('form', 'needsLow'),
    t('form', 'needsMedium'),
    t('form', 'needsHigh'),
    t('form', 'needsVeryHigh'),
  ]
  const barColors = ['var(--card-border)', 'var(--status-green)', '#E8A020', '#D4640A', 'var(--status-red)']

  const size = sizeConfig[systemSize] || sizeConfig.S
  const modules = Array.from(selectedModules)
  const sensors = Array.from(selectedSensors)
  const totalModules = vertical?.modules?.length || 10
  const modulePct = totalModules > 0 ? Math.round((moduleCount / totalModules) * 100) : 0

  const needsBars = needsKeys.map(({ key, label }) => {
    const val = formData[key] || ''
    const idx = levelOptions.indexOf(val)
    return { label, pct: idx <= 0 ? 0 : (idx / (levelOptions.length - 1)) * 100, color: barColors[idx] || barColors[0] }
  }).filter(b => b.pct > 0)

  return (
    <div className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Icon name="activity" size={14} color="var(--ctx-accent, var(--primary))" />
          <span className={styles.headerTitle}>{t('builder', 'sidebarTitle')}</span>
          <div className={styles.liveIndicator} />
        </div>
        <p className={styles.headerHelper}>{t('builder', 'sidebarHelper')}</p>
      </div>

      {/* System size */}
      <div className={styles.sizeBlock}>
        <div className={styles.sizeLabel}>{t('sidebar', 'systemSize')}</div>
        <div className={styles.sizeRow}>
          <span className={styles.sizeLetter} style={{ color: size.color }}>{systemSize}</span>
          <span className={styles.sizeName}>{size.label}</span>
        </div>
        <div className={styles.sizeBar}>
          <div className={styles.sizeBarFill} style={{ width: `${size.pct}%`, background: size.color }} />
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          { icon: 'layers', value: moduleCount, label: t('sidebar', 'modules') },
          { icon: 'radio',  value: sensorCount, label: t('sidebar', 'sensors') },
          { icon: 'camera', value: cameraCount, label: t('sidebar', 'cameras') },
        ].map(({ icon, value, label }) => (
          <div key={label} className={styles.stat}>
            <Icon name={icon} size={13} color="var(--ctx-accent, var(--primary))" />
            <span className={styles.statNum}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className={styles.section}>
        <div className={styles.sectionRow}>
          <span className={styles.sectionLabel}>{t('sidebar', 'modules')}</span>
          <span className={styles.sectionMeta}>{moduleCount} / {totalModules} ({modulePct}%)</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${modulePct}%` }} />
        </div>
        <div className={styles.listCompact}>
          {modules.slice(0, 5).map((m) => (
            <div key={m} className={styles.listRow}>
              <Icon name="check" size={10} color="var(--ctx-accent, var(--primary))" />
              <span>{m}</span>
            </div>
          ))}
          {modules.length > 5 && <div className={styles.moreRow}>+ {modules.length - 5} {t('sidebar', 'moreSuffix')}</div>}
        </div>
      </div>

      {/* Sensors */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>{t('sidebar', 'sensors')}</div>
        <div className={styles.sensorList}>
          {sensors.length === 0 && <div className={styles.empty}>{t('sidebar', 'noSensors')}</div>}
          {sensors.map((s) => (
            <div key={s} className={styles.sensorRow}>
              <span className={styles.sensorDot} />
              <span className={styles.sensorName}>{s}</span>
              {effectiveSensorQty?.[s] !== undefined && (
                <span className={styles.sensorQty}>{effectiveSensorQty[s]}×</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Needs */}
      {needsBars.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t('sidebar', 'needs')}</div>
          <div className={styles.needsBars}>
            {needsBars.map(b => (
              <div key={b.label} className={styles.needsRow}>
                <span className={styles.needsLabel}>{b.label}</span>
                <div className={styles.needsTrack}><div className={styles.needsFill} style={{ width: `${b.pct}%`, background: b.color }} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer info */}
      {formData.firmenname && (
        <div className={styles.customerBlock}>
          <div className={styles.customerRow}>
            <Icon name="briefcase" size={12} color="var(--ctx-accent, var(--primary))" />
            <span className={styles.customerName}>{formData.firmenname}</span>
          </div>
          {formData.standort && (
            <div className={styles.customerRow}>
              <Icon name="mapPin" size={12} color="var(--text-muted)" />
              <span className={styles.customerSub}>{formData.standort}</span>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className={styles.ctaBlock}>
        <button className={styles.cta} onClick={onNavigateFinal}>
          {t('builder', 'cta')}
          <Icon name="arrowRight" size={14} color="#fff" />
        </button>
        <p className={styles.ctaHelper}>{t('builder', 'ctaHelper')}</p>
      </div>
    </div>
  )
}
