import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './LandingPage.module.css'

export default function LandingPage({ onNavigate }) {
  const { t } = useTranslation()

  const cards = [
    {
      id: 'pflege',
      icon: 'activity',
      label: t('nav', 'care'),
      title: 'Bakım / Klinik / Huzurevi',
      subtitle: 'Huzurevleri, Klinikler & Bakım Tesisleri',
      description: 'Akıllı bakım ve güvenlik yapısı. Sakin yönetimi, acil durum mantığı, bakım süreçleri ve personel koordinasyonu.',
      tags: ['Sakin Yönetimi', 'Acil Çağrı Sistemi', 'Düşme Riski', 'İlaç Mantığı'],
    },
    {
      id: 'fabrik',
      icon: 'cpu',
      label: t('nav', 'factory'),
      title: 'Fabrika / Üretim / Depo',
      subtitle: 'Fabrikalar, Üretim Tesisleri & Teknik İşletmeler',
      description: 'Makine, süreç ve malzeme akışında şeffaflık. Bakım yönetimi, arıza mantığı ve vardiya planlaması.',
      tags: ['Makine Görünümü', 'Bakım Yönetimi', 'Arıza Mantığı', 'Depo Yapısı'],
    },
    {
      id: 'unternehmen',
      icon: 'briefcase',
      label: t('nav', 'company'),
      title: 'Şirket / Ofis / Hizmet',
      subtitle: 'Ofisler, Hizmet Şirketleri & Yönetimler',
      description: 'Bir sistemde yapı, iletişim ve görevler. Roller, süreçler ve operasyonel netlik.',
      tags: ['Görev Yönetimi', 'Departman Yapısı', 'Oda Kullanımı', 'Yönetim Panosu'],
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>{t('landing', 'systemLabel')}</div>
          <h1 className={styles.heroTitle}>
            {t('landing', 'heroTitle').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <p className={styles.heroText}>{t('landing', 'heroText')}</p>
          <div className={styles.heroStats}>
            <div className={styles.stat}><span className={styles.statNum}>3</span><span className={styles.statLabel}>{t('landing', 'sectors')}</span></div>
            <div className={styles.statDiv} />
            <div className={styles.stat}><span className={styles.statNum}>30+</span><span className={styles.statLabel}>{t('landing', 'modules')}</span></div>
            <div className={styles.statDiv} />
            <div className={styles.stat}><span className={styles.statNum}>S–XL</span><span className={styles.statLabel}>{t('landing', 'systemSizes')}</span></div>
          </div>
        </div>
        <div className={styles.heroGrid} />
      </div>

      <div className={styles.divider}><span>{t('landing', 'chooseSector')}</span></div>

      <div className={styles.cards}>
        {cards.map((card, i) => (
          <button
            key={card.id}
            className={styles.card}
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => onNavigate('vertical', card.id)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIconBox}>
                <Icon name={card.icon} size={18} color="var(--primary)" />
              </div>
              <span className={styles.cardLabel}>{`SEKTÖR 0${i + 1}`}</span>
            </div>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardSub}>{card.subtitle}</p>
            <p className={styles.cardDesc}>{card.description}</p>
            <div className={styles.cardTags}>
              {card.tags.map((tag) => <span key={tag} className={styles.cardTag}>{tag}</span>)}
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cardCta}>{t('landing', 'startIntake')}</span>
              <Icon name="arrowRight" size={14} color="var(--primary)" />
            </div>
          </button>
        ))}
      </div>

      <div className={styles.featureBar}>
        {[
          { icon: 'list',     key: 'featureNeeds' },
          { icon: 'settings', key: 'featureSystem' },
          { icon: 'send',     key: 'featureOffer' },
        ].map(({ icon, key }) => (
          <div key={key} className={styles.feature}>
            <Icon name={icon} size={14} color="var(--text-muted)" />
            <span>{t('landing', key)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
