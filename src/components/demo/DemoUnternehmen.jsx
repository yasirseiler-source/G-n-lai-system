import { useState, useEffect } from 'react'
import styles from './DemoUnternehmen.module.css'
import DemoAccessGate from './DemoAccessGate'
import FounderQuote from '../common/FounderQuote'

// ─── Data ───────────────────────────────────────────────────────────────────
const DATA = {
  critical: {
    missing: [
      { name: 'Emre Yilmaz', dept: 'Konfektionierung', reason: 'Unentschuldigt' },
      { name: 'Zehra Acar',  dept: 'Zuschnitt', reason: 'Krankmeldung' },
      { name: 'Burak Demir', dept: 'Verpackung', reason: 'Unentschuldigt' },
      { name: 'Seda Koc',    dept: 'Qualität', reason: 'Krankmeldung' },
      { name: 'Murat Cetin', dept: 'Konfektionierung', reason: 'Unentschuldigt' },
      { name: 'Aysel Kara',  dept: 'Konfektionierung', reason: 'Krankmeldung' },
      { name: 'Cem Arslan',  dept: 'Stoff', reason: 'Unentschuldigt' },
      { name: 'Gul Sahin',   dept: 'Zuschnitt', reason: 'Krankmeldung' },
    ],
    lowPerformance: [
      { name: 'Halil Yildirim', dept: 'Konfektionierung', perf: 42 },
      { name: 'Fatma Oz',       dept: 'Verpackung',       perf: 38 },
      { name: 'Serkan Aydin',   dept: 'Zuschnitt',        perf: 45 },
      { name: 'Derya Polat',    dept: 'Konfektionierung', perf: 41 },
      { name: 'Ibrahim Kilic',  dept: 'Qualität',         perf: 39 },
    ],
    absenteeism: [
      { name: 'Tuncay Gunes', dept: 'Konfektionierung', days: 7,  period: 'letzte 30 Tage' },
      { name: 'Melek Yalcin', dept: 'Verpackung',       days: 5,  period: 'letzte 30 Tage' },
      { name: 'Okan Dogan',   dept: 'Stoff',            days: 6,  period: 'letzte 30 Tage' },
    ],
  },
  orders: [
    { no: 'AU-2026-0341', customer: 'H&M',      product: 'Herren-Poloshirt', qty: 12000, deadline: '15.04.2026', progress: 72, status: 'green' },
    { no: 'AU-2026-0342', customer: 'Zara',      product: 'Damen-Bluse',     qty: 8500,  deadline: '10.04.2026', progress: 45, status: 'yellow' },
    { no: 'AU-2026-0343', customer: 'LC Waikiki',product: 'Kinder-Jogginganzug', qty: 15000, deadline: '20.04.2026', progress: 28, status: 'green' },
    { no: 'AU-2026-0344', customer: 'Mango',     product: 'Damen-Rock',      qty: 6000,  deadline: '08.04.2026', progress: 61, status: 'orange' },
    { no: 'AU-2026-0345', customer: 'DeFacto',   product: 'Herren-Hemd',     qty: 10000, deadline: '25.04.2026', progress: 15, status: 'green' },
    { no: 'AU-2026-0346', customer: 'Koton',     product: 'Damen-Hose',      qty: 9000,  deadline: '05.04.2026', progress: 88, status: 'red' },
    { no: 'AU-2026-0347', customer: 'Boyner',    product: 'Herren-T-Shirt',  qty: 7500,  deadline: '18.04.2026', progress: 52, status: 'yellow' },
  ],
  production: [
    { name: 'Stoff-Produktion', unit: 'm',    target: 2800, actual: 2540 },
    { name: 'Zuschnitt',        unit: 'Stk.', target: 3200, actual: 2880 },
    { name: 'Konfektionierung', unit: 'Stk.', target: 2500, actual: 2050 },
    { name: 'Qualitätskontrolle', unit: 'Stk.', target: 2400, actual: 2280 },
    { name: 'Verpackung',       unit: 'Stk.', target: 2200, actual: 1870 },
  ],
  machines: [
    { name: 'Webmaschine',   total: 14, active: 12, maint: 1, broken: 1, util: 86 },
    { name: 'Schneidemaschine', total: 8, active: 7, maint: 1, broken: 0, util: 88 },
    { name: 'Nähmaschine',   total: 48, active: 42, maint: 3, broken: 3, util: 88 },
    { name: 'Overlockmaschine', total: 20, active: 18, maint: 1, broken: 1, util: 90 },
    { name: 'Bügel-/Presse', total: 10, active: 9,  maint: 1, broken: 0, util: 90 },
    { name: 'Verpackungsmaschine', total: 6, active: 5, maint: 0, broken: 1, util: 83 },
  ],
}

const navItems = [
  { id: 'kritik',    icon: '⚠', label: 'Krit. Personal',  badge: '16', badgeType: 'red' },
  { id: 'auftraege', icon: '☰', label: 'Aufträge',         badge: '7',  badgeType: 'muted' },
  { id: 'produktion',icon: '⚙', label: 'Produktionsfluss', badge: '',   badgeType: '' },
  { id: 'maschinen', icon: '⚒', label: 'Maschinen',        badge: '5',  badgeType: 'orange' },
  { id: 'personal',  icon: '♟', label: 'Personal',         badge: '350',badgeType: 'muted' },
]

function fmt(n) { return n.toLocaleString('de-DE') }
function pctColor(p) { return p >= 90 ? 'var(--g)' : p >= 75 ? 'var(--y)' : p >= 60 ? 'var(--o)' : 'var(--r)' }
function statusLabel(s) { return { green: 'Pünktlich', yellow: 'Im Blick', orange: 'Riskant', red: 'Kritisch' }[s] || s }

// Generate personnel data
function genPersonnel() {
  const firstNames = ['Ahmed','Marco','Lisa','Fatima','Jan','Sara','Mehmet','Julia','Thomas','Zeynep',
    'Sebastian','Elif','Christian','Merve','Michael','Seda','Patrick','Ayse','Stefan','Tugba']
  const lastNames = ['Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann',
    'Yilmaz','Kaya','Demir','Celik','Sahin']
  const depts = ['Stoff','Zuschnitt','Konfektionierung','Konfektionierung','Qualität','Verpackung','Wartung','Lager']
  const shifts = ['Früh','Mittel','Nacht']
  const tasks = {
    'Stoff': ['Weber-Operator','Garnvorbereitung','Qualitätskontrolle'],
    'Zuschnitt': ['Schnitt-Operator','Legeoperator','Musteraufbereitung'],
    'Konfektionierung': ['Maschinenbediener','Overlockerin','Vorarbeiterin','Zwischenqualität'],
    'Qualität': ['Qualitätsprüfer','Endkontrolle','Maßkontrolle'],
    'Verpackung': ['Verpackungsmitarbeiter','Etikettierung','Versandvorbereitung'],
    'Wartung': ['Maschinenwartin','Elektriker','Allgemeine Wartung'],
    'Lager': ['Lagerleiter','Staplerfahrer','Wareneingang'],
  }
  const result = []
  for (let i = 1; i <= 100; i++) {
    const dept = depts[Math.floor(Math.random() * depts.length)]
    const shift = shifts[i <= 40 ? 0 : i <= 70 ? 1 : 2]
    const taskList = tasks[dept]
    result.push({
      id: `WIS-${1000 + i}`,
      name: firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)],
      dept,
      shift,
      task: taskList[Math.floor(Math.random() * taskList.length)],
      performance: Math.floor(Math.random() * 35) + 60,
      status: Math.random() > 0.15 ? 'Aktiv' : Math.random() > 0.5 ? 'Urlaub' : 'Krankmeldung',
    })
  }
  return result
}

const personnel = genPersonnel()

// ─── Component ──────────────────────────────────────────────────────────────
export default function DemoUnternehmen({ onBack }) {
  const [unlocked, setUnlocked] = useState(false)
  if (!unlocked) return <DemoAccessGate dashboardId="unternehmen" onUnlock={() => setUnlocked(true)} onBack={onBack} />
  return <UnternehmenDashboard onBack={onBack} />
}

function UnternehmenDashboard({ onBack }) {
  const [section, setSection] = useState('kritik')
  const [clock, setClock] = useState({ time: '--:--:--', date: '--', shift: 'Früh' })
  const [lastUpdate, setLastUpdate] = useState('--')
  const [production, setProduction] = useState(DATA.production)
  const [orders, setOrders] = useState(DATA.orders)
  const [filterSearch, setFilterSearch] = useState('')
  const [filterShift, setFilterShift] = useState('')
  const [filterDept, setFilterDept] = useState('')

  // Clock
  useEffect(() => {
    function tick() {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const hour = now.getHours()
      const shift = hour >= 6 && hour < 14 ? 'Frühschicht' : hour >= 14 && hour < 22 ? 'Mittelschicht' : 'Nachtschicht'
      const days = ['So','Mo','Di','Mi','Do','Fr','Sa']
      const months = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
      setClock({
        time: `${h}:${m}:${s}`,
        date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${days[now.getDay()]}`,
        shift,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Simulate live updates
  useEffect(() => {
    const id = setInterval(() => {
      setProduction(prev => prev.map(p => ({
        ...p,
        actual: Math.max(Math.round(p.target * 0.6), Math.min(p.target, p.actual + (Math.floor(Math.random() * 21) - 8))),
      })))
      setOrders(prev => prev.map(o => ({ ...o, progress: Math.min(99, o.progress + Math.floor(Math.random() * 2)) })))
      const now = new Date()
      setLastUpdate(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`)
    }, 45000)
    return () => clearInterval(id)
  }, [])

  // Filter personnel
  const filteredPersonnel = personnel.filter(p => {
    if (filterSearch && !p.name.toLowerCase().includes(filterSearch.toLowerCase()) && !p.id.toLowerCase().includes(filterSearch.toLowerCase())) return false
    if (filterShift && p.shift !== filterShift) return false
    if (filterDept && p.dept !== filterDept) return false
    return true
  }).slice(0, 60)

  const totalTarget = production.reduce((s, p) => s + p.target, 0)
  const totalActual = production.reduce((s, p) => s + p.actual, 0)
  const avgPct = Math.round(totalActual / totalTarget * 100)

  return (
    <div className={styles.root}>
      {/* TOPBAR */}
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          Wiseness Unternehmen <span>Produktionspanel</span>
        </div>
        <div className={styles.topbarSep} />
        <div className={styles.topbarInfo}>
          <span className={styles.liveDot} /> <strong>Live</strong>
        </div>
        <div className={styles.topbarSep} />
        <div className={styles.shiftBadge}>{clock.shift}</div>
        <button className={styles.backBtn} onClick={onBack}>← Zurück</button>
        <div className={styles.topbarRight}>
          <div>
            <div className={styles.topbarClock}>{clock.time}</div>
            <div className={styles.topbarDate}>{clock.date}</div>
          </div>
        </div>
      </header>

      {/* FOUNDER QUOTE */}
      <FounderQuote textKey="landing" accentColor="#5B8DB8" />

      {/* LAYOUT */}
      <div className={styles.layout}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLabel}>Panel</div>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`${styles.navItem} ${section === item.id ? styles.navActive : ''}`}
              onClick={() => setSection(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className={`${styles.navBadge} ${item.badgeType === 'red' ? styles.badgeRed : item.badgeType === 'orange' ? styles.badgeOrange : styles.badgeMuted}`}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
          <div className={styles.sidebarFooter}>
            <div>Gesamt Personal: <strong>350</strong></div>
            <div>Aktive Schicht: <strong>{clock.shift}</strong></div>
            <div style={{ marginTop: 6, fontSize: 10, color: '#9aa0a6' }}>
              Letzte Aktualisierung: <span>{lastUpdate}</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles.mainContent}>

          {/* KRITIK PERSONAL */}
          {section === 'kritik' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Kritisches Personal <span className={styles.count}>Heutiger Stand</span></div>
              <div className={styles.cardsRow3}>
                {/* Missing */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardLabel}>Fehlende Mitarbeiter</span>
                  </div>
                  <div className={`${styles.cardCount} ${styles.countRed}`}>{DATA.critical.missing.length}</div>
                  <ul className={styles.cardList}>
                    {DATA.critical.missing.map((p, i) => (
                      <li key={i}>
                        <span><span className={styles.itemName}>{p.name}</span> <span className={styles.itemDept}>· {p.dept}</span></span>
                        <span className={`${styles.itemValue} ${styles.valueRed}`}>{p.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Low performance */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardLabel}>Geringe Leistung</span>
                  </div>
                  <div className={`${styles.cardCount} ${styles.countOrange}`}>{DATA.critical.lowPerformance.length}</div>
                  <ul className={styles.cardList}>
                    {DATA.critical.lowPerformance.map((p, i) => (
                      <li key={i}>
                        <span><span className={styles.itemName}>{p.name}</span> <span className={styles.itemDept}>· {p.dept}</span></span>
                        <span className={`${styles.itemValue} ${styles.valueOrange}`}>{p.perf} %</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Absenteeism */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardLabel}>Fehlzeiten</span>
                  </div>
                  <div className={`${styles.cardCount} ${styles.countYellow}`}>{DATA.critical.absenteeism.length}</div>
                  <ul className={styles.cardList}>
                    {DATA.critical.absenteeism.map((p, i) => (
                      <li key={i}>
                        <span><span className={styles.itemName}>{p.name}</span> <span className={styles.itemDept}>· {p.dept}</span></span>
                        <span className={`${styles.itemValue} ${styles.valueOrange}`}>{p.days} T. / {p.period}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* AUFTRÄGE */}
          {section === 'auftraege' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Aufträge <span className={styles.count}>Aktive Aufträge</span></div>
              <div className={styles.summaryRow}>
                {[
                  { label: 'Aufträge gesamt', val: orders.length, cls: '' },
                  { label: 'Pünktlich', val: orders.filter(o=>o.status==='green').length, cls: styles.valGreen },
                  { label: 'Im Blick', val: orders.filter(o=>o.status==='yellow').length, cls: styles.valYellow },
                  { label: 'Riskant', val: orders.filter(o=>o.status==='orange').length, cls: styles.valOrange },
                  { label: 'Kritisch', val: orders.filter(o=>o.status==='red').length, cls: styles.valRed },
                ].map((s, i) => (
                  <div key={i} className={styles.summaryBox}>
                    <div className={styles.summaryLabel}>{s.label}</div>
                    <div className={`${styles.summaryVal} ${s.cls}`}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead><tr><th>Auftr.-Nr.</th><th>Kunde</th><th>Produkt</th><th>Menge</th><th>Lieferung</th><th>Fortschritt</th><th>Status</th></tr></thead>
                  <tbody>
                    {orders.map(o => {
                      const cMap = { green: '#34a853', yellow: '#f9ab00', orange: '#e8710a', red: '#d93025' }
                      const bgMap = { green: '#e6f4ea', yellow: '#fef7e0', orange: '#fef3e0', red: '#fce8e6' }
                      const c = cMap[o.status], bg = bgMap[o.status]
                      return (
                        <tr key={o.no}>
                          <td style={{ fontWeight: 600 }}>{o.no}</td>
                          <td>{o.customer}</td><td>{o.product}</td>
                          <td>{fmt(o.qty)} Stk.</td><td>{o.deadline}</td>
                          <td>
                            <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
                              <div className={styles.progressBar} style={{ width: 100 }}>
                                <div style={{ height:'100%', borderRadius:3, background:c, width:`${o.progress}%`, transition:'width .6s' }} />
                              </div>
                              <span style={{ fontWeight:600, fontSize:12 }}>{o.progress} %</span>
                            </div>
                          </td>
                          <td>
                            <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:12, fontSize:11, fontWeight:600, background:bg, color:c }}>
                              <span style={{ width:6, height:6, borderRadius:'50%', background:c, display:'inline-block' }} />
                              {statusLabel(o.status)}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRODUKTION */}
          {section === 'produktion' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Produktionsfluss <span className={styles.count}>Tagesleistung</span></div>
              <div className={styles.summaryRow4}>
                {[
                  { label: 'Gesamt-Effizienz', val: `${avgPct} %` },
                  { label: 'Aktive Mitarbeiter', val: personnel.filter(p=>p.status==='Aktiv').length },
                  { label: 'Tagesz. (Stk.)', val: fmt(totalTarget) },
                  { label: 'Erreicht', val: fmt(totalActual) },
                ].map((s, i) => (
                  <div key={i} className={styles.summaryBox}>
                    <div className={styles.summaryLabel}>{s.label}</div>
                    <div className={styles.summaryVal}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className={styles.flowContainer}>
                {production.map((p, i) => {
                  const pct = Math.round(p.actual / p.target * 100)
                  const c = pctColor(pct)
                  return (
                    <div key={i} className={styles.flowStep}>
                      <div className={styles.flowStepName}>{p.name}</div>
                      <div className={styles.flowPct} style={{ color: c }}>{pct} %</div>
                      <div className={styles.progressBar} style={{ height: 8, margin: '6px 0' }}>
                        <div style={{ height:'100%', borderRadius:3, background:c, width:`${pct}%`, transition:'width .6s' }} />
                      </div>
                      <div style={{ fontSize:11, color:'#5f6368' }}>Ziel: <strong>{fmt(p.target)} {p.unit}</strong></div>
                      <div style={{ fontSize:11, color:'#5f6368' }}>Erreicht: <strong>{fmt(p.actual)} {p.unit}</strong></div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* MASCHINEN */}
          {section === 'maschinen' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Maschinen <span className={styles.count}>Aktueller Status</span></div>
              <div className={styles.summaryRow4}>
                {[
                  { label: 'Maschinen gesamt', val: DATA.machines.reduce((s,m)=>s+m.total,0) },
                  { label: 'Aktiv', val: DATA.machines.reduce((s,m)=>s+m.active,0), cls: styles.valGreen },
                  { label: 'In Wartung', val: DATA.machines.reduce((s,m)=>s+m.maint,0), cls: styles.valYellow },
                  { label: 'Defekt', val: DATA.machines.reduce((s,m)=>s+m.broken,0), cls: styles.valRed },
                ].map((s, i) => (
                  <div key={i} className={styles.summaryBox}>
                    <div className={styles.summaryLabel}>{s.label}</div>
                    <div className={`${styles.summaryVal} ${s.cls || ''}`}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className={styles.machineGrid}>
                {DATA.machines.map((m, i) => {
                  const c = pctColor(m.util)
                  return (
                    <div key={i} className={styles.machineCard}>
                      <div className={styles.machineName}>{m.name}</div>
                      <div className={styles.machineStats}>
                        <div className={styles.machineStat}>
                          <div style={{ color:'#5f6368', marginBottom:2 }}>Aktiv</div>
                          <strong style={{ fontSize:18 }}>{m.active} <span style={{ fontSize:12, fontWeight:400, color:'#9aa0a6' }}>/ {m.total}</span></strong>
                        </div>
                        <div className={styles.machineStat}>
                          <div style={{ color:'#5f6368', marginBottom:2 }}>Defekt</div>
                          <strong style={{ fontSize:18, color: m.broken > 0 ? '#d93025' : 'inherit' }}>{m.broken}</strong>
                        </div>
                      </div>
                      <div>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#5f6368', marginBottom:4 }}>
                          <span>Auslastung</span><strong>{m.util} %</strong>
                        </div>
                        <div className={styles.progressBar} style={{ height: 8 }}>
                          <div style={{ height:'100%', borderRadius:3, background:c, width:`${m.util}%`, transition:'width .6s' }} />
                        </div>
                      </div>
                      {m.maint > 0 && <div style={{ marginTop:8, fontSize:11, color:'#f9ab00' }}>{m.maint} Maschine(n) in Wartung</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* PERSONAL */}
          {section === 'personal' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Personal <span className={styles.count}>350 registrierte Mitarbeiter</span></div>
              <div className={styles.filtersBar}>
                <input
                  className={styles.filterInput}
                  type="text"
                  placeholder="Name oder Personalnr. suchen..."
                  value={filterSearch}
                  onChange={e => setFilterSearch(e.target.value)}
                  style={{ width: 220 }}
                />
                <select className={styles.filterInput} value={filterShift} onChange={e => setFilterShift(e.target.value)}>
                  <option value="">Alle Schichten</option>
                  <option value="Früh">Frühschicht</option>
                  <option value="Mittel">Mittelschicht</option>
                  <option value="Nacht">Nachtschicht</option>
                </select>
                <select className={styles.filterInput} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                  <option value="">Alle Abteilungen</option>
                  <option value="Stoff">Stoff</option>
                  <option value="Zuschnitt">Zuschnitt</option>
                  <option value="Konfektionierung">Konfektionierung</option>
                  <option value="Qualität">Qualität</option>
                  <option value="Verpackung">Verpackung</option>
                  <option value="Wartung">Wartung</option>
                  <option value="Lager">Lager</option>
                </select>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>Personal-Nr.</th><th>Name</th><th>Abteilung</th><th>Schicht</th><th>Aufgabe</th><th>Leistung</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {filteredPersonnel.map(p => {
                      const pCol = p.performance >= 80 ? '#34a853' : p.performance >= 60 ? '#f9ab00' : p.performance >= 50 ? '#e8710a' : '#d93025'
                      const sBg = p.status === 'Aktiv' ? '#e6f4ea' : p.status === 'Urlaub' ? '#fef7e0' : '#fef3e0'
                      const sC  = p.status === 'Aktiv' ? '#34a853' : p.status === 'Urlaub' ? '#f9ab00' : '#e8710a'
                      return (
                        <tr key={p.id}>
                          <td style={{ fontWeight:600, color:'#9aa0a6' }}>{p.id}</td>
                          <td style={{ fontWeight:500 }}>{p.name}</td>
                          <td>{p.dept}</td>
                          <td>{p.shift}</td>
                          <td style={{ fontSize:12 }}>{p.task}</td>
                          <td>
                            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600 }}>
                              <div style={{ width:50, height:5, background:'#eee', borderRadius:3, overflow:'hidden' }}>
                                <div style={{ width:`${p.performance}%`, height:'100%', borderRadius:3, background:pCol }} />
                              </div>
                              {p.performance} %
                            </div>
                          </td>
                          <td>
                            <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:12, fontSize:11, fontWeight:600, background:sBg, color:sC }}>
                              <span style={{ width:6, height:6, borderRadius:'50%', background:sC, display:'inline-block' }} />
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                    {filteredPersonnel.length === 60 && (
                      <tr><td colSpan={7} style={{ textAlign:'center', color:'#9aa0a6', fontSize:12, padding:12 }}>
                        Suchen Sie weiter, um mehr anzuzeigen.
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
