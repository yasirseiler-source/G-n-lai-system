import styles from './FounderQuote.module.css'
import { useTranslation } from '../../i18n/LanguageContext'

/**
 * FounderQuote
 * Props:
 *   textKey     - key in translations.founderQuote (e.g. 'landing')
 *   accentColor - CSS color string for left accent bar and initials circle
 */
export default function FounderQuote({ textKey, accentColor }) {
  const { t } = useTranslation()

  const heading = t('founderQuote', 'heading')
  const text = t('founderQuote', textKey)

  const paragraphs = text ? text.split('\n\n').filter(Boolean) : []

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.accentBar} style={{ background: accentColor }} />
          <div className={styles.body}>
            <div className={styles.openingQuote}>&ldquo;</div>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.textBlock}>
              {paragraphs.map((para, i) => (
                <p key={i} className={styles.text}>{para}</p>
              ))}
            </div>
            <div className={styles.closingQuote}>&rdquo;</div>
            <div className={styles.divider} />
            <div className={styles.author}>
              <div
                className={styles.authorInitials}
                style={{ background: `${accentColor}22`, color: accentColor, borderColor: `${accentColor}55` }}
              >
                YS
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Yasir Seiler</span>
                <span className={styles.authorRole}>Gruender &amp; CEO, WiseDynamics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
