import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import FounderQuote from '../common/FounderQuote'
import styles from './LandingPage.module.css'

/* ── Hero Visual — Industrie & Business (Wiseness-Farben) ── */
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

          <rect width="520" height="520" fill="url(#wn-bg)" />
          {[0,1,2,3,4,5,6,7,8].map(i => <line key={`gh${i}`} x1={0} y1={i*65} x2={520} y2={i*65} stroke="#5B8DB8" strokeWidth="0.4" opacity="0.06" />)}
          {[0,1,2,3,4,5,6,7,8].map(i => <line key={`gv${i}`} x1={i*65} y1={0} x2={i*65} y2={520} stroke="#5B8DB8" strokeWidth="0.4" opacity="0.06" />)}
          <circle cx="260" cy="260" r="228" stroke="#5B8DB8" strokeWidth="0.6" opacity="0.12" className="wn-ring2" />
          <circle cx="260" cy="260" r="185" stroke="#5B8DB8" strokeWidth="0.8" strokeDasharray="6 12" opacity="0.2" className="wn-spin-slow" />
          <circle cx="260" cy="260" r="148" stroke="#80C09B" strokeWidth="0.6" strokeDasharray="3 9" opacity="0.18" className="wn-spin-rev" />
          <circle cx="260" cy="260" r="100" stroke="#5B8DB8" strokeWidth="0.8" opacity="0.15" className="wn-ring1" />
          <circle cx="260" cy="270" r="120" fill="url(#wn-glow)" />

          {/* Hauptgebäude Mitte */}
          <rect x="215" y="200" width="90" height="120" rx="2" fill="url(#wn-building1)" stroke="#5B8DB8" strokeWidth="1.2" opacity="0.85" />
          <rect x="248" y="178" width="12" height="26" rx="1" fill="#5B8DB8" opacity="0.6" />
          <rect x="244" y="175" width="20" height="5" rx="1" fill="#5B8DB8" opacity="0.45" />
          {[[225,215],[245,215],[265,215],[285,215],[225,240],[245,240],[265,240],[285,240]].map(([x,y],i) => (
            <rect key={`mw${i}`} x={x} y={y} width="12" height="10" rx="1" fill="#80C09B" opacity="0.45" />
          ))}
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

          <rect x="90" y="270" width="44" height="50" rx="2" fill="#5B8DB8" opacity="0.2" stroke="#5B8DB8" strokeWidth="0.8" />
          <rect x="386" y="265" width="44" height="55" rx="2" fill="#80C09B" opacity="0.18" stroke="#80C09B" strokeWidth="0.8" />
          <line x1="70" y1="320" x2="450" y2="320" stroke="#5B8DB8" strokeWidth="1.2" opacity="0.18" />
          <line x1="70" y1="322" x2="450" y2="322" stroke="#80C09B" strokeWidth="0.5" opacity="0.1" />

          {/* Zahnrad Links */}
          <g className="wn-gear-l" opacity="0.7">
            {Array.from({length: 8}, (_, i) => {
              const a = (i * 45 * Math.PI) / 180
              return <rect key={`gtl${i}`} x={175 + 22 * Math.cos(a) - 5} y={285 + 22 * Math.sin(a) - 5} width="10" height="10" rx="2" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.2" transform={`rotate(${i*45}, ${175 + 22 * Math.cos(a)}, ${285 + 22 * Math.sin(a)})`} />
            })}
            <circle cx="175" cy="285" r="16" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.4" />
            <circle cx="175" cy="285" r="6" fill="#5B8DB8" opacity="0.3" />
            <circle cx="175" cy="285" r="3" fill="#5B8DB8" opacity="0.55" />
          </g>

          {/* Zahnrad Rechts */}
          <g className="wn-gear-r" opacity="0.7">
            {Array.from({length: 8}, (_, i) => {
              const a = (i * 45 * Math.PI) / 180
              return <rect key={`gtr${i}`} x={335 + 22 * Math.cos(a) - 5} y={285 + 22 * Math.sin(a) - 5} width="10" height="10" rx="2" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.2" transform={`rotate(${i*45}, ${335 + 22 * Math.cos(a)}, ${285 + 22 * Math.sin(a)})`} />
            })}
            <circle cx="335" cy="285" r="16" fill="none" stroke="url(#wn-gear-stroke)" strokeWidth="1.4" />
            <circle cx="335" cy="285" r="6" fill="#80C09B" opacity="0.3" />
            <circle cx="335" cy="285" r="3" fill="#80C09B" opacity="0.55" />
          </g>

          <line x1="175" y1="269" x2="215" y2="255" stroke="#5B8DB8" strokeWidth="1" strokeDasharray="4 5" opacity="0.35" className="wn-dash" />
          <line x1="335" y1="269" x2="305" y2="255" stroke="#80C09B" strokeWidth="1" strokeDasharray="4 5" opacity="0.35" className="wn-dash" />
          {[{ cx: 260, cy: 90 }, { cx: 160, cy: 130 }, { cx: 360, cy: 130 }, { cx: 95, cy: 190 }, { cx: 425, cy: 190 }].map((n, i) => (
            <g key={`dp${i}`}>
              <circle cx={n.cx} cy={n.cy} r="7" fill={i % 2 === 0 ? '#5B8DB8' : '#80C09B'} opacity="0.07" className="wn-ring1" />
              <circle cx={n.cx} cy={n.cy} r="4" fill={i % 2 === 0 ? '#5B8DB8' : '#80C09B'} opacity="0.6" className={i % 2 === 0 ? 'wn-blink' : 'wn-blink2'} />
            </g>
          ))}
          {[[260,90,160,130],[160,130,95,190],[260,90,360,130],[360,130,425,190],[95,190,140,235],[425,190,380,240]].map(([x1,y1,x2,y2],i) => (
            <line key={`dl${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5B8DB8" strokeWidth="0.7" opacity="0.14" />
          ))}
          {Array.from({length: 24}, (_, i) => {
            const deg = i * 15; const rad = (deg * Math.PI) / 180; const long = i % 6 === 0; const r1 = long ? 220 : 224, r2 = 232
            return <line key={`t${i}`} x1={260 + r1 * Math.cos(rad)} y1={260 + r1 * Math.sin(rad)} x2={260 + r2 * Math.cos(rad)} y2={260 + r2 * Math.sin(rad)} stroke={long ? '#5B8DB8' : '#C6C6C6'} strokeWidth={long ? 1.2 : 0.7} opacity={long ? 0.4 : 0.2} />
          })}
          <circle cx="260" cy="260" r="16" fill="#5B8DB8" opacity="0.06" className="wn-ring1" />
          <circle cx="260" cy="260" r="8" fill="none" stroke="#5B8DB8" strokeWidth="1.2" opacity="0.4" />
          <circle cx="260" cy="260" r="3" fill="#5B8DB8" opacity="0.6" />
        </svg>
      </div>
    </div>
  )
}

/* ── Was ist Wiseness? — Illustratives SVG ── */
function WhatIsSVG() {
  return (
    <div className={styles.whatVisualWrap}>
      <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.whatSvg}>
        <defs>
          <linearGradient id="wn-what-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B8DB8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#80C09B" stopOpacity="0.08" />
          </linearGradient>
          <style>{`
            @keyframes wn-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
            @keyframes wn-pulse-dot { 0%,100%{opacity:0.5} 50%{opacity:1} }
            .wn-float { animation: wn-float 4s ease-in-out infinite; }
            .wn-pdot { animation: wn-pulse-dot 2.2s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect width="420" height="320" fill="url(#wn-what-grad)" rx="16" />
        {/* Zentrum-Kreis */}
        <circle cx="210" cy="155" r="55" fill="#5B8DB8" opacity="0.08" className="wn-float" />
        <circle cx="210" cy="155" r="38" fill="#5B8DB8" opacity="0.14" />
        <circle cx="210" cy="155" r="22" fill="#5B8DB8" opacity="0.22" />
        <circle cx="210" cy="155" r="9" fill="#5B8DB8" opacity="0.7" />
        {/* Verbindungslinien */}
        {[[80,80],[340,80],[80,240],[340,240]].map(([x,y],i) => (
          <g key={i}>
            <line x1="210" y1="155" x2={x} y2={y} stroke={i%2===0?"#5B8DB8":"#80C09B"} strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
            <circle cx={x} cy={y} r="8" fill={i%2===0?"#5B8DB8":"#80C09B"} opacity="0.15" className="wn-pdot" />
            <circle cx={x} cy={y} r="4" fill={i%2===0?"#5B8DB8":"#80C09B"} opacity="0.55" className="wn-pdot" />
          </g>
        ))}
        {/* Labels */}
        <rect x="48" y="48" width="64" height="24" rx="6" fill="#5B8DB8" opacity="0.12" />
        <rect x="308" y="48" width="64" height="24" rx="6" fill="#80C09B" opacity="0.12" />
        <rect x="48" y="248" width="64" height="24" rx="6" fill="#80C09B" opacity="0.12" />
        <rect x="308" y="248" width="64" height="24" rx="6" fill="#5B8DB8" opacity="0.12" />
        {/* Mitteltext-Striche */}
        <rect x="188" y="148" width="44" height="3" rx="2" fill="#fff" opacity="0.6" />
        <rect x="192" y="156" width="36" height="3" rx="2" fill="#fff" opacity="0.45" />
        <rect x="196" y="164" width="28" height="3" rx="2" fill="#fff" opacity="0.3" />
      </svg>
    </div>
  )
}

export default function LandingPage({ onNavigate }) {
  const { t, lang } = useTranslation()

  // Hilfsfunktion: t mit Fallback auf 'landing' key für Abwärtskompatibilität
  const th = (key) => {
    try { return t('home', key) } catch { return '' }
  }

  /* ── Sektion 3: Branche wählen ── */
  const sectors = [
    {
      id: 'pflege',
      icon: 'activity',
      sectorKey: 'care',
      titleTR: 'Bakım / Klinik',
      titleDE: 'Pflege / Klinik',
      titleEN: 'Care / Clinic',
      subTR: 'Huzurevleri, Klinikler & Bakım Tesisleri',
      subDE: 'Pflegeheime, Kliniken & Betreuungseinrichtungen',
      subEN: 'Care Homes, Clinics & Medical Facilities',
      descTR: 'Hasta bakımı, acil durum yönetimi ve personel koordinasyonu. Akıllı süreç yapısı ile daha güvenli, daha insani bir ortam.',
      descDE: 'Patientenversorgung, Notfallmanagement und Personalkoordination. Eine intelligente Prozessstruktur für eine sicherere, menschlichere Umgebung.',
      descEN: 'Patient care, emergency management, and staff coordination. An intelligent process structure for a safer, more humane environment.',
      tagsTR: ['Hasta Yönetimi', 'Acil Protokol', 'Vardiya Planlaması', 'İlaç Takibi'],
      tagsDE: ['Patientenverwaltung', 'Notfallprotokoll', 'Schichtplanung', 'Medikamentenverfolgung'],
      tagsEN: ['Patient Management', 'Emergency Protocol', 'Shift Planning', 'Medication Tracking'],
    },
    {
      id: 'fabrik',
      icon: 'cpu',
      sectorKey: 'factory',
      titleTR: 'Fabrika / Üretim',
      titleDE: 'Fabrik / Produktion',
      titleEN: 'Factory / Production',
      subTR: 'Fabrikalar, Üretim Tesisleri & Teknik İşletmeler',
      subDE: 'Fabriken, Produktionsbetriebe & Technische Anlagen',
      subEN: 'Factories, Production Plants & Technical Facilities',
      descTR: 'Üretim hatları, kalite kontrolü ve makine bakımı için kapsamlı süreç görünürlüğü. Verimlilik artar, arıza süreleri azalır.',
      descDE: 'Umfassende Prozesssichtbarkeit für Produktionslinien, Qualitätskontrolle und Maschinenwartung. Effizienz steigt, Ausfallzeiten sinken.',
      descEN: 'Comprehensive process visibility for production lines, quality control, and machine maintenance. Efficiency increases, downtime decreases.',
      tagsTR: ['Üretim Takibi', 'Kalite Kontrolü', 'Makine Bakımı', 'Vardiya Yönetimi'],
      tagsDE: ['Produktionsverfolgung', 'Qualitätskontrolle', 'Maschinenwartung', 'Schichtmanagement'],
      tagsEN: ['Production Tracking', 'Quality Control', 'Machine Maintenance', 'Shift Management'],
    },
    {
      id: 'unternehmen',
      icon: 'briefcase',
      sectorKey: 'company',
      titleTR: 'Şirket / Ofis',
      titleDE: 'Unternehmen / Büro',
      titleEN: 'Company / Office',
      subTR: 'Ofisler, Hizmet Şirketleri & Yönetimler',
      subDE: 'Büros, Dienstleistungsunternehmen & Verwaltungen',
      subEN: 'Offices, Service Companies & Administrations',
      descTR: 'İş akışları, karar süreçleri ve departman koordinasyonu için net yönetim yapısı. Karmaşıklık azalır, yön netleşir.',
      descDE: 'Klare Managementstruktur für Arbeitsabläufe, Entscheidungsprozesse und Abteilungskoordination. Komplexität sinkt, Orientierung wächst.',
      descEN: 'Clear management structure for workflows, decision processes, and department coordination. Complexity decreases, orientation grows.',
      tagsTR: ['İş Akışı', 'Görev Yönetimi', 'Raporlama', 'Departman Yapısı'],
      tagsDE: ['Arbeitsablauf', 'Aufgabenmanagement', 'Reporting', 'Abteilungsstruktur'],
      tagsEN: ['Workflow', 'Task Management', 'Reporting', 'Department Structure'],
    },
  ]

  const getSectorText = (s, field) => {
    const key = field + (lang === 'de' ? 'DE' : lang === 'en' ? 'EN' : 'TR')
    return s[key] || s[field + 'DE']
  }

  /* ── Sektion 5: Umfassende Funktionen ── */
  const features = [
    { icon: 'settings', titleKey: 'feat1Title', descKey: 'feat1Desc' },
    { icon: 'shield',   titleKey: 'feat2Title', descKey: 'feat2Desc' },
    { icon: 'monitor',  titleKey: 'feat3Title', descKey: 'feat3Desc' },
    { icon: 'barChart', titleKey: 'feat4Title', descKey: 'feat4Desc' },
    { icon: 'users',    titleKey: 'feat5Title', descKey: 'feat5Desc' },
    { icon: 'layers',   titleKey: 'feat6Title', descKey: 'feat6Desc' },
    { icon: 'tool',     titleKey: 'feat7Title', descKey: 'feat7Desc' },
    { icon: 'smartphone', titleKey: 'feat8Title', descKey: 'feat8Desc' },
  ]

  /* ── Sektion 7: Logik-Schritte ── */
  const logicSteps = [
    { n: '01', titleKey: 'logicStep1Title', descKey: 'logicStep1Desc' },
    { n: '02', titleKey: 'logicStep2Title', descKey: 'logicStep2Desc' },
    { n: '03', titleKey: 'logicStep3Title', descKey: 'logicStep3Desc' },
  ]

  const logicStepTexts = {
    tr: [
      { title: 'Süreç Haritası', desc: 'Tüm operasyonel süreçler yapılandırılır ve görünür hale getirilir.' },
      { title: 'Netlik & Yapı', desc: 'Veriler ve görevler anlamlı bir yapıya dönüştürülür.' },
      { title: 'Bilgece Karar', desc: 'Gerçek bilgiye dayalı, güvenli ve doğru kararlar alınır.' },
    ],
    de: [
      { title: 'Prozesslandkarte', desc: 'Alle operativen Prozesse werden strukturiert und sichtbar gemacht.' },
      { title: 'Klarheit & Struktur', desc: 'Daten und Aufgaben werden in eine sinnvolle Struktur überführt.' },
      { title: 'Weise Entscheidung', desc: 'Sichere und richtige Entscheidungen auf Basis echter Information.' },
    ],
    en: [
      { title: 'Process Map', desc: 'All operational processes are structured and made visible.' },
      { title: 'Clarity & Structure', desc: 'Data and tasks are transformed into meaningful structure.' },
      { title: 'Wise Decision', desc: 'Safe and correct decisions based on real information.' },
    ],
  }
  const steps = logicStepTexts[lang] || logicStepTexts.de

  const handleSectorClick = (id) => {
    if (onNavigate) onNavigate('vertical', id)
  }

  return (
    <div className={styles.page}>

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 1 — HERO
      ══════════════════════════════════════════════════════════════ */}
      <div className={styles.hero}>
        <div className={styles.heroGrid} />

        <div className={styles.heroLeft}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroEyebrowLine} />
            {th('eyebrow') || t('landing', 'heroEyebrow')}
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLight}>WISE</span>
            <span className={styles.heroTitleBold}>NESS</span>
          </h1>
          <p className={styles.heroHeadline} style={{ whiteSpace: 'pre-line' }}>
            {th('heroHeadline') || t('landing', 'heroHeadline')}
          </p>
          <p className={styles.heroText}>{th('heroDesc1') || t('landing', 'heroText')}</p>
          <div className={styles.heroBtns}>
            <button
              className={styles.btnPrimary}
              onClick={() => handleSectorClick('pflege')}
            >
              {th('ctaExplore') || t('landing', 'ctaExplore')}
            </button>
            <button
              className={styles.btnOutline}
              onClick={() => window.open('mailto:info@wisedynamics.de', '_blank')}
            >
              {th('ctaDemo') || t('landing', 'ctaContact')}
            </button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <HeroVisual />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 2 — WORT DES GRÜNDERS
      ══════════════════════════════════════════════════════════════ */}
      <FounderQuote textKey="landing" accentColor="#5B8DB8" />

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 3 — BRANCHE WÄHLEN
      ══════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>
            <span className={styles.sectionEyebrowLine} />
            {th('areasEyebrow')}
          </div>
          <h2 className={styles.sectionTitle}>{th('areasTitle')}</h2>
          <p className={styles.sectionSubtitle}>{th('areasSubtitle')}</p>
        </div>

        <div className={styles.cards}>
          {sectors.map((s, i) => (
            <button
              key={s.id}
              className={styles.card}
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => handleSectorClick(s.id)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIconBox}>
                  <Icon name={s.icon} size={18} color="var(--primary)" />
                </div>
                <span className={styles.cardLabel}>{`SECTOR 0${i + 1}`}</span>
              </div>
              <h2 className={styles.cardTitle}>{getSectorText(s, 'title')}</h2>
              <p className={styles.cardSub}>{getSectorText(s, 'sub')}</p>
              <p className={styles.cardDesc}>{getSectorText(s, 'desc')}</p>
              <div className={styles.cardTags}>
                {getSectorText(s, 'tags').map((tag) => (
                  <span key={tag} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardCta}>{th('areasCta') || t('landing', 'startIntake')}</span>
                <Icon name="arrowRight" size={14} color="var(--primary)" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 4 — WAS IST WISENESS?
      ══════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.whatGrid}>
          {/* Linke Spalte: Text */}
          <div className={styles.whatText}>
            <div className={styles.sectionEyebrow}>
              <span className={styles.sectionEyebrowLine} />
              {th('whatEyebrow')}
            </div>
            <h2 className={styles.whatTitle}>{th('whatTitle')}</h2>
            <p className={styles.whatDesc}>{th('whatDesc1')}</p>
            <p className={styles.whatDesc}>{th('whatDesc2')}</p>
            <p className={styles.whatDesc}>{th('whatDesc3')}</p>

            <div className={styles.whatPillars}>
              {[
                { labelKey: 'whatPillar1Label', descKey: 'whatPillar1Desc', color: '#5B8DB8' },
                { labelKey: 'whatPillar2Label', descKey: 'whatPillar2Desc', color: '#80C09B' },
                { labelKey: 'whatPillar3Label', descKey: 'whatPillar3Desc', color: '#5B8DB8' },
                { labelKey: 'whatPillar4Label', descKey: 'whatPillar4Desc', color: '#80C09B' },
              ].map((p, i) => (
                <div key={i} className={styles.whatPillar}>
                  <span className={styles.whatPillarDot} style={{ background: p.color }} />
                  <div>
                    <div className={styles.whatPillarLabel}>{th(p.labelKey)}</div>
                    <div className={styles.whatPillarDesc}>{th(p.descKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rechte Spalte: Illustration */}
          <div className={styles.whatVisual}>
            <WhatIsSVG />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 5 — UMFASSENDE FUNKTIONEN
      ══════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>
            <span className={styles.sectionEyebrowLine} />
            {th('featuresEyebrow')}
          </div>
          <h2 className={styles.sectionTitle}>{th('featuresTitle')}</h2>
          <p className={styles.sectionSubtitle}>{th('featuresSubtitle')}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIconBox}>
                <Icon name={f.icon} size={18} color="#5B8DB8" />
              </div>
              <h3 className={styles.featureCardTitle}>{th(f.titleKey)}</h3>
              <p className={styles.featureCardDesc}>{th(f.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 6 — FÜR JEDE BRANCHE ANPASSBAR
      ══════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>
            <span className={styles.sectionEyebrowLine} />
            {th('usecasesEyebrow')}
          </div>
          <h2 className={styles.sectionTitle}>{th('usecasesTitle')}</h2>
          <p className={styles.sectionSubtitle}>{th('usecasesSubtitle')}</p>
        </div>

        <div className={styles.usecasesGrid}>
          {sectors.map((s, i) => {
            const colors = ['#5B8DB8', '#80C09B', '#5B8DB8']
            return (
              <div key={s.id} className={styles.usecaseCard} style={{ '--uc-color': colors[i] }}>
                <div className={styles.usecaseIconWrap} style={{ background: `${colors[i]}18` }}>
                  <Icon name={s.icon} size={20} color={colors[i]} />
                </div>
                <h3 className={styles.usecaseTitle}>{getSectorText(s, 'title')}</h3>
                <p className={styles.usecaseDesc}>{getSectorText(s, 'desc')}</p>
                <div className={styles.usecaseTags}>
                  {getSectorText(s, 'tags').map((tag) => (
                    <span key={tag} className={styles.usecaseTag} style={{ borderColor: `${colors[i]}40`, color: colors[i] }}>{tag}</span>
                  ))}
                </div>
                <button className={styles.usecaseBtn} style={{ color: colors[i] }} onClick={() => handleSectorClick(s.id)}>
                  {th('areasCta')} <Icon name="arrowRight" size={12} color={colors[i]} />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SEKTION 7 — MIT STRUKTUR ORIENTIERUNG FINDEN
      ══════════════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.logicSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <span className={styles.sectionEyebrowLine} />
              {th('logicEyebrow')}
            </div>
            <h2 className={styles.sectionTitle}>{th('logicTitle')}</h2>
            <p className={styles.sectionSubtitle}>{th('logicDesc')}</p>
          </div>

          {/* 3 Schritte */}
          <div className={styles.logicSteps}>
            {steps.map((step, i) => (
              <div key={i} className={styles.logicStep}>
                <div className={styles.logicStepNum}>{String(i+1).padStart(2,'0')}</div>
                <div className={styles.logicStepConnector} />
                <div className={styles.logicStepContent}>
                  <h3 className={styles.logicStepTitle}>{step.title}</h3>
                  <p className={styles.logicStepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vertrauen-Box */}
          <div className={styles.trustBox}>
            <div className={styles.trustIcon}>
              <Icon name="heart" size={20} color="#5B8DB8" />
            </div>
            <div>
              <div className={styles.trustTitle}>{th('trustTitle')}</div>
              <div className={styles.trustDesc}>{th('trustDesc')}</div>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaBox}>
            <div className={styles.ctaEyebrow}>{th('ctaEyebrow')}</div>
            <p className={styles.ctaTitle}>{th('ctaTitle')}</p>
            <button className={styles.btnPrimary} onClick={() => handleSectorClick('pflege')}>
              {th('ctaBtn')}
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
