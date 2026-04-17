import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './ModuleSelector.module.css'

export default function ModuleSelector({ modules, selected, onToggle }) {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.label}>
          <Icon name="layers" size={14} color="var(--text-muted)" />
          <span>{t('selector', 'systemModules')}</span>
        </div>
        <span className={styles.count}>{selected.size} / {modules.length} {t('selector', 'activeOf')}</span>
      </div>
      <div className={styles.grid}>
        {modules.map((mod) => {
          const isActive = selected.has(mod.name)
          return (
            <button
              key={mod.name}
              className={`${styles.card} ${isActive ? styles.active : ''}`}
              onClick={() => onToggle(mod.name)}
            >
              <div className={styles.cardTop}>
                <div className={styles.checkBox}>
                  {isActive && <Icon name="check" size={10} color="#fff" />}
                </div>
                <span className={`${styles.statusTag} ${isActive ? styles.statusActive : styles.statusInactive}`}>
                  {isActive ? t('selector', 'active') : t('selector', 'inactive')}
                </span>
              </div>
              <div className={styles.cardName}>{mod.name}</div>
              <div className={styles.cardDesc}>{mod.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
