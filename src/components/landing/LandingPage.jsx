import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import FounderQuote from '../common/FounderQuote'
import styles from './LandingPage.module.css'

/* ── Dashboard SVG (Wiseness-Farben) ── */
function HeroSvg() {
  return (
    <svg
      className={styles.heroSvg}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hintergrund-Card */}
      <rect x="20" y="20" width="440" height="320" rx="18" fill="rgba(255,255,255,0.08)" />

      {/* Titel-Zeile */}
      <rect x="44" y="44" width="120" height="10" rx="5" fill="rgba(255,255,255,0.35)" />
      <rect x="44" y="60" width="80" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />

      {/* Status-Badges rechts oben */}
      <rect x="340" y="44" width="60" height="22" rx="11" fill="rgba(128,192,155,0.25)" />
      <rect x="356" y="51" width="28" height="7" rx="3.5" fill="#80C09B" />
      <rect x="410" y="44" width="46" height="22" rx="11" fill="rgba(255,255,255,0.12)" />
      <rect x="424" y="51" width="18" height="7" rx="3.5" fill="rgba(255,255,255,0.35)" />

      {/* Trennlinie */}
      <line x1="44" y1="86" x2="436" y2="86" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* KPI-Karten Zeile */}
      <rect x="44" y="100" width="118" height="68" rx="12" fill="rgba(255,255,255,0.1)" />
      <rect x="56" y="112" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
      <rect x="56" y="125" width="72" height="16" rx="5" fill="rgba(255,255,255,0.55)" />
      <rect x="56" y="147" width="36" height="6" rx="3" fill="rgba(128,192,155,0.7)" />

      <rect x="174" y="100" width="118" height="68" rx="12" fill="rgba(255,255,255,0.1)" />
      <rect x="186" y="112" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
      <rect x="186" y="125" width="72" height="16" rx="5" fill="rgba(255,255,255,0.55)" />
      <rect x="186" y="147" width="50" height="6" rx="3" fill="rgba(255,255,255,0.22)" />

      <rect x="304" y="100" width="132" height="68" rx="12" fill="rgba(255,255,255,0.1)" />
      <rect x="316" y="112" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
      <rect x="316" y="125" width="72" height="16" rx="5" fill="rgba(255,255,255,0.55)" />
      <rect x="316" y="147" width="60" height="6" rx="3" fill="rgba(128,192,155,0.5)" />

      {/* Balkendiagramm */}
      <rect x="44" y="184" width="232" height="132" rx="12" fill="rgba(255,255,255,0.06)" />
      <rect x="60" y="196" width="80" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
      {/* Balken */}
      {[
        { x: 66,  h: 62, c: '#5B8DB8' },
        { x: 96,  h: 44, c: 'rgba(91,141,184,0.5)' },
        { x: 126, h: 76, c: '#80C09B' },
        { x: 156, h: 38, c: 'rgba(91,141,184,0.4)' },
        { x: 186, h: 55, c: '#5B8DB8' },
        { x: 216, h: 70, c: '#80C09B' },
      ].map(({ x, h, c }, i) => (
        <rect key={i} x={x} y={290 - h} width="22" height={h} rx="5" fill={c} />
      ))}

      {/* Kreisdiagramm rechts */}
      <rect x="288" y="184" width="148" height="132" rx="12" fill="rgba(255,255,255,0.06)" />
      <rect x="304" y="196" width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
      <circle cx="362" cy="264" r="36" stroke="rgba(255,255,255,0.1)" strokeWidth="20" fill="none" />
      <circle cx="362" cy="264" r="36"
        stroke="#5B8DB8" strokeWidth="20" fill="none"
        strokeDasharray="113 226" strokeDashoffset="0"
        strokeLinecap="round"
      />
      <circle cx="362" cy="264" r="36"
        stroke="#80C09B" strokeWidth="20" fill="none"
        strokeDasharray="68 226" strokeDashoffset="-113"
        strokeLinecap="round"
      />
      <circle cx="362" cy="264" r="36"
        stroke="rgba(255,255,255,0.2)" strokeWidth="20" fill="none"
        strokeDasharray="45 226" strokeDashoffset="-181"
        strokeLinecap="round"
      />
      <text x="362" y="269" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">72%</text>

      {/* Verbindungslinien (vernetzt) */}
      <line x1="103" y1="168" x2="233" y2="184" stroke="rgba(128,192,155,0.25)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="233" y1="168" x2="362" y2="184" stroke="rgba(91,141,184,0.25)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Glüh-Punkte an Verbindungen */}
      <circle cx="103" cy="168" r="4" fill="#80C09B" />
      <circle cx="233" cy="168" r="4" fill="#5B8DB8" />
      <circle cx="362" cy="168" r="4" fill="rgba(255,255,255,0.4)" />

      {/* Puls-Ring (animiert via CSS) */}
      <circle className={styles.svgPulse} cx="362" cy="168" r="10" stroke="#80C09B" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

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

      {/* ── HERO (zwei Spalten: links Text, rechts SVG) ── */}
      <div className={styles.hero}>
        <div className={styles.heroGrid} />

        {/* Linke Spalte */}
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>{t('landing', 'heroEyebrow')}</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleBold}>WISE</span>
            <span className={styles.heroTitleLight}>NESS</span>
          </h1>
          <p className={styles.heroText}>{t('landing', 'heroText')}</p>
          <div className={styles.heroBtns}>
            <button
              className={styles.btnPrimary}
              onClick={() => onNavigate('vertical', 'pflege')}
            >
              {t('landing', 'ctaExplore')}
            </button>
            <button
              className={styles.btnOutline}
              onClick={() => window.open('mailto:info@wisedynamics.de', '_blank')}
            >
              {t('landing', 'ctaContact')}
            </button>
          </div>
        </div>

        {/* Rechte Spalte – SVG */}
        <div className={styles.heroRight}>
          <HeroSvg />
        </div>
      </div>

      <FounderQuote textKey="landing" accentColor="#5B8DB8" />

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
