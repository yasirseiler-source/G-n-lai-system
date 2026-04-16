import { useTranslation } from '../../i18n/LanguageContext'
import styles from './HeroSection.module.css'

export default function HeroSection({ vertical }) {
  const { t } = useTranslation()

  return (
    <div className={styles.hero}>
      <div className={styles.accentBar} style={{ background: vertical?.accentColor || '#80C09B' }} />
      <div className={styles.inner}>
        {vertical?.heroImage && (
          <div className={styles.imageWrap}>
            <img className={styles.image} src={vertical.heroImage} alt="" />
          </div>
        )}
        <div className={styles.content}>
          <h1 className={styles.title}>{vertical?.heroTitle}</h1>
          <p className={styles.text}>{vertical?.heroText}</p>
          <p className={styles.helper}>
            <span className={styles.helperDot} style={{ background: vertical?.accentColor }} />
            {t('builder', 'heroHelper')}
          </p>
        </div>
      </div>
    </div>
  )
}
