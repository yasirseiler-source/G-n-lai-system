import { useMemo } from 'react'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './ModuleSelector.module.css'

const GROUP_ORDER = ['recommended', 'operation', 'security']
const GROUP_KEYS = {
  recommended: 'groupRecommended',
  operation: 'groupOperation',
  security: 'groupSecurity',
}

export default function ModuleSelector({ modules, selected, onToggle }) {
  const { t } = useTranslation()

  const grouped = useMemo(() => {
    const map = {}
    for (const mod of modules) {
      const g = mod.group || 'recommended'
      if (!map[g]) map[g] = []
      map[g].push(mod)
    }
    return GROUP_ORDER.filter(g => map[g]).map(g => ({ key: g, label: t('builder', GROUP_KEYS[g]), modules: map[g] }))
  }, [modules, t])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('builder', 'modulesTitle')}</h2>
        <span className={styles.count}>{selected.size} / {modules.length}</span>
      </div>

      {grouped.map(({ key, label, modules: groupMods }) => (
        <div key={key} className={styles.group}>
          <div className={styles.groupLabel}>{label}</div>
          <div className={styles.grid}>
            {groupMods.map((mod) => {
              const isActive = selected.has(mod.name)
              return (
                <button
                  key={mod.name}
                  className={`${styles.card} ${isActive ? styles.active : ''}`}
                  onClick={() => onToggle(mod.name)}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardName}>{mod.name}</span>
                    {isActive && <span className={styles.dot} />}
                  </div>
                  <div className={styles.cardDesc}>{mod.desc}</div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
