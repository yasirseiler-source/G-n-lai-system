import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import FounderQuote from '../common/FounderQuote'
import styles from './LandingPage.module.css'

/* ── Hero Visual — Industrie & Unternehmen (Wiseness-Farben) ── */
function HeroVisual() {
  return (
    <div className={styles.heroVisualWrap}>
      <div className={styles.heroVisualMask}>
        <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heroSvg}>
          <defs>
            <radialGradient id="wn-bg" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#5B8DB8" stopOpacity="0.08" />
              <stop offset="60%" stopColor="#80C09B" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#5B8DB8" stopOpacity="0.02" />
            </radialGradient>
            <linearGradient id="wn-building1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B8DB8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5B8DB8" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="wn-building2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#80C09B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#80C09B" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="wn-building3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B8DB8" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#5B8DB8" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="wn-gear-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B8DB8" />
              <stop offset="100%" stopColor="#80C09B" />
            </linearGradient>
            <radialGradient id="wn-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5B8DB8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#5B8DB8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wn-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B8DB8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5B8DB8" stopOpacity="0" />
            </linearGradient>
            <clipPath id="wn-clip">
              <circle cx="260" cy="260" r="230" />
            </clipPath>
            <style>{`
              @keyframes wn-pulse1 { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.38; } }
              @keyframes wn-pulse2 { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.24; } }
              @keyframes wn-spin { from { transform: rotate(0deg); transform-origin: 260px 260px; } to { transform: rotate(360deg); transform-origin: 260px 260px; } }
              @keyframes wn-spin-rev { from { transform: rotate(0deg); transform-origin: 260px 260px; } to { transform: rotate(-360deg); transform-origin: 260px 260px; } }
              @keyframes wn-gear-l { from { transform: rotate(0deg); transform-origin: 175px 285px; } to { transform: rotate(360deg); transform-origin: 175px 285px; } }
              @keyframes wn-gear-r { from { transform: rotate(0deg); transform-origin: 335px 285px; } to { transform: rotate(-360deg); transform-origin: 335px 285px; } }
              @keyframes wn-blink { 0%, 100% { opacity: 0.85; } 50% { opacity: 0.35; } }
              @keyframes wn-blink2 { 0%, 100% { opacity: 0.7; } 50% { opacity: 0.25; } }
              @keyframes wn-dash { to { stroke-dashoffset: -48; } }
              .wn-ring1 { animation: wn-pulse1 3.8s ease-in-out infinite; }
              .wn-ring2 { animation: wn-pulse2 5s ease-in-out infinite 1s; }
              .wn-spin-slow { animation: wn-spin 32s linear infinite; }
              .wn-spin-rev { animation: wn-spin-rev 24s linear infinite; }
              .wn-gear-l { animation: wn-gear-l 12s linear infinite; }
              .wn-gear-r { animation: wn-gear-r 12s linear infinite; }
              .wn-blink { animation: wn-blink 2.6s ease-in-out infinite; }
              .wn-blink2 { animation: wn-blink2 3.4s ease-in-out infinite 1.3s; }
              .wn-dash { animation: wn-dash 3s linear infinite; }
            `}</style>
          </defs>

          {/* Hintergrund */}
          <rect width="520" height="520" fill="url(#wn-bg)" />

          {/* Subtiles Gitter */}
          {[0,1,2,3,4,5,6,7,8].map(i => <line key={`gh${i}`} x1={0} y1={i*65} x2={520} y2={i*65} stroke="#5B8DB8" strokeWidth="0.4" opacity="0.06" />)}
          {[0,1,2,3,4,5,6,7,8].map(i => <line key={`gv${i}`} x1={i*65} y1={0} x2={i*65} y2={520} stroke="#5B8DB8" strokeWidth="0.4" opacity="0.06" />)}

          {/* Äußere Kreise */}
          <circle cx="260" cy="260" r="228" stroke="#5B8DB8" strokeWidth="0.6" opacity="0.12" className="wn-ring2" />
          <circle cx="260" cy="260" r="185" stroke="#5B8DB8" strokeWidth="0.8" strokeDasharray="6 12" opacity="0.2" className="wn-spin-slow" />
          <circle cx="260" cy="260" r="148" stroke="#80C09B" strokeWidth="0.6" strokeDasharray="3 9" opacity="0.18" className="wn-spin-rev" />
          <circle cx="260" cy="260" r="100" stroke="#5B8DB8" strokeWidth="0.8" opacity="0.15" className="wn-ring1" />

          {/* Glüh-Hintergrund */}
          <circle cx="260" cy="270" r="120" fill="url(#wn-glow)" />

          {/* ── Fabrik / Gebäude-Silhouetten ── */}
          {/* Hauptgebäude Mitte */}
          <rect x="215" y="200" width="90" height="120" rx="2" fill="url(#wn-building1)" stroke="#5B8DB8" strokeWidth="1.2" opacity="0.85" />
          {/* Schornstein Mitte */}
          <rect x="248" y="178" width="12" height="26" rx="1" fill="#5B8DB8" opacity="0.6" />
          <rect x="244" y="175" width="20" height="5" rx="1" fill="#5B8DB8" opacity="0.45" />
          {/* Fenster Hauptgebäude */}
          {[[225,215],[245,215],[265,215],[285,215],[225,240],[245,240],[265,240],[285,240]].map(([x,y],i) => (
            <rect key={`mw${i}`} x={x} y={y} width="12" height="10" rx="1" fill="#80C09B" opacity="0.45" />
          ))}
          {/* Tor Hauptgebäude */}
          <rect x="245" y="290" width="30" height="30" rx="2" fill="#5B8DB8" opacity="0.35" />
          <line x1="260" y1="290" x2="260" y2="320" stroke="#5B8DB8" strokeWidth="0.8" opacity="0.5" />

          {/* Linkes Gebäude */}
          <rect x="140" y="235" width="68" height="85" rx="2" fill="url(#wn-building3)" stroke="#5B8DB8" strokeWidth="1" opacity="0.7" />
          <rect x="162" y="218" width="10" height="20" rx="1" fill="#5B8DB8" opacity="0.45" />
          {[[148,248],[162,248],[176,248],[190,248],[148,265],[162,265],[176,265],[190,265]].map(([x,y],i) => (
            <rect key={`lw${i}`} x={x} y={y} width="8" height="7" rx="1" fill="#80C09B" opacity="0.35" />
          ))}

          {/* Rechtes Gebäude */}
          <rect x="312" y="225" width="68" height="95" rx="2" fill="url(#wn-building2)" stroke="#80C09B" strokeWidth="1" opacity="0.7" />
          <rect x="334" y="210" width="10" height="18" rx="1" fill="#80C09B" opacity="0.45" />
          {[[320,238],[334,238],[348,238],[362,238],[320,255],[334,255],[348,255],[362,255]].map(([x,y],i) => (
            <rect key={`rw${i}`} x={x} y={y} width="8" height="7" rx="1" fill="#5B8DB8" opacity="0.35" />
          ))}

          {/* Kleines Gebäude links */}
          <rect x="90" y="270" width="44" height="50" rx="2" fill="#5B8DB8" opacity="0.2" stroke="#5B8DB8" strokeWidth="0.8" />

          {/* Kleines Gebäude rechts */}
          <rect x="386" y="265" width="44" height="55" rx="2" fill="#80C09B" opacity="0.18" stroke="#80C09B" strokeWidth="0.8" />

          {/* Boden-Linie */}
          <line x1="70" y1="320" x2="450" y2="320" stroke="#5B8DB8" strokeWidth="1.2" opacity="0.18" />
          <line x1="70" y1="322" x2="450" y2="322" stroke="#80C09B" strokeWidth="0.5" opacity="0.1" />

          {/* ── Zahnrad Links (animiert) ── */}
          <g className="wn-gear-l" opacity="0.7">
            {Array.from({length: 8}, (_, i) => {
              const a = (i * 45 * Math.PI) / 180
              return <rect key={`gtl${i}`} x={175 + 22 * Math.cos(a) - 5} y={285 + 22 * Math.sin(a) - 5} width="10" height="10" rx="2" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.2" transform={`rotate(${i*45}, ${175 + 22 * Math.cos(a)}, ${285 + 22 * Math.sin(a)})`} />
            })}
            <circle cx="175" cy="285" r="16" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.4" />
            <circle cx="175" cy="285" r="6" fill="#5B8DB8" opacity="0.3" />
            <circle cx="175" cy="285" r="3" fill="#5B8DB8" opacity="0.55" />
          </g>

          {/* ── Zahnrad Rechts (animiert, gegenläufig) ── */}
          <g className="wn-gear-r" opacity="0.7">
            {Array.from({length: 8}, (_, i) => {
              const a = (i * 45 * Math.PI) / 180
              return <rect key={`gtr${i}`} x={335 + 22 * Math.cos(a) - 5} y={285 + 22 * Math.sin(a) - 5} width="10" height="10" rx="2" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.2" transform={`rotate(${i*45}, ${335 + 22 * Math.cos(a)}, ${285 + 22 * Math.sin(a)})`} />
            })}
            <circle cx="335" cy="285" r="16" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.4" />
            <circle cx="335" cy="285" r="6" fill="#80C09B" opacity="0.3" />
            <circle cx="335" cy="285" r="3" fill="#80C09B" opacity="0.55" />
          </g>

          {/* ── Verbindungslinien (Netzwerk) ── */}
          <line x1="175" y1="269" x2="215" y2="255" stroke="#5B8DB8" strokeWidth="1" strokeDasharray="4 5" opacity="0.35" className="wn-dash" />
          <line x1="335" y1="269" x2="305" y2="255" stroke="#80C09B" strokeWidth="1" strokeDasharray="4 5" opacity="0.35" className="wn-dash" />
          <line x1="134" y1="270" x2="140" y2="270" stroke="#5B8DB8" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.28" className="wn-dash" />
          <line x1="386" y1="270" x2="380" y2="270" stroke="#80C09B" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.28" className="wn-dash" />

          {/* Datenpunkte oben */}
          {[{ cx: 260, cy: 90 }, { cx: 160, cy: 130 }, { cx: 360, cy: 130 }, { cx: 95, cy: 190 }, { cx: 425, cy: 190 }].map((n, i) => (
            <g key={`dp${i}`}>
              <circle cx={n.cx} cy={n.cy} r="7" fill={i % 2 === 0 ? '#5B8DB8' : '#80C09B'} opacity="0.07" className="wn-ring1" />
              <circle cx={n.cx} cy={n.cy} r="4" fill={i % 2 === 0 ? '#5B8DB8' : '#80C09B'} opacity="0.6" className={i % 2 === 0 ? 'wn-blink' : 'wn-blink2'} />
            </g>
          ))}

          {/* Verbindungslinien Datenpunkte */}
          {[[260,90,160,130],[160,130,95,190],[260,90,360,130],[360,130,425,190],[160,130,260,90],[95,190,140,235],[425,190,380,240]].map(([x1,y1,x2,y2],i) => (
            <line key={`dl${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5B8DB8" strokeWidth="0.7" opacity="0.14" />
          ))}

          {/* Tick-Marks am äußeren Kreis */}
          {Array.from({length: 24}, (_, i) => {
            const deg = i * 15; const rad = (deg * Math.PI) / 180; const long = i % 6 === 0; const r1 = long ? 220 : 224, r2 = 232
            return <line key={`t${i}`} x1={260 + r1 * Math.cos(rad)} y1={260 + r1 * Math.sin(rad)} x2={260 + r2 * Math.cos(rad)} y2={260 + r2 * Math.sin(rad)} stroke={long ? '#5B8DB8' : '#C6C6C6'} strokeWidth={long ? 1.2 : 0.7} opacity={long ? 0.4 : 0.2} />
          })}

          {/* Mittel-Punkt */}
          <circle cx="260" cy="260" r="16" fill="#5B8DB8" opacity="0.06" className="wn-ring1" />
          <circle cx="260" cy="260" r="8" fill="none" stroke="#5B8DB8" strokeWidth="1.2" opacity="0.4" />
          <circle cx="260" cy="260" r="3" fill="#5B8DB8" opacity="0.6" />

          {/* Rauch-Effekt Schornsteine */}
          {[248,252,256].map((cx, i) => (
            <circle key={`sm${i}`} cx={cx + i} cy={165 - i * 8} r={4 + i * 2} fill="none" stroke="#5B8DB8" strokeWidth="0.6" opacity={0.12 - i * 0.03} />
          ))}
        </svg>
      </div>
    </div>
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
          <div className={styles.heroEyebrow}>
            <span className={styles.heroEyebrowLine} />
            {t('landing', 'heroEyebrow')}
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>WISE</span>
            <span className={styles.heroTitleBold}>NESS</span>
          </h1>
          <p className={styles.heroHeadline} style={{ whiteSpace: 'pre-line' }}>{t('landing', 'heroHeadline')}</p>
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

        {/* Rechte Spalte – Visual */}
        <div className={styles.heroRight}>
          <HeroVisual />
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
