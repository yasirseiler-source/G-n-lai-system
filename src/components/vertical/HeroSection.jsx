import { useTranslation } from '../../i18n/LanguageContext'
import styles from './HeroSection.module.css'

export default function HeroSection({ vertical }) {
  const { t } = useTranslation()
  const modules = vertical?.modules || []
  const preview = modules.slice(0, 4)
  const rest = modules.length - 4

  return (
    <div className={styles.hero} style={{ background: `linear-gradient(135deg, ${vertical?.gradientFrom || '#1B5FA6'}, ${vertical?.gradientTo || '#0D3B6B'})` }}>
      {vertical?.heroImage && <img className={styles.bgImg} src={vertical.heroImage} alt="" />}
      <div className={styles.overlay} />
      <div className={styles.grid} />
      <div className={styles.content}>
        <div className={styles.sectorLabel}>{vertical?.title}</div>
        <h1 className={styles.title}>{vertical?.heroTitle}</h1>
        <p className={styles.text}>{vertical?.heroText}</p>
        {preview.length > 0 && (
          <div className={styles.moduleTags}>
            <span className={styles.moduleTagsLabel}>{t('hero', 'includedModules')}:</span>
            {preview.map((m) => (
              <span key={m.name} className={styles.moduleTag}>{m.name}</span>
            ))}
            {rest > 0 && (
              <span className={styles.moduleTagMore}>+{rest} {t('hero', 'moreSuffix')}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
