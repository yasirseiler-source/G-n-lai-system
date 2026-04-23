import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './DemoPflege.module.css'
import DemoAccessGate from './DemoAccessGate'
import FounderQuote from '../common/FounderQuote'

// ─── Data ───────────────────────────────────────────────────────────────────
const initialState = {
  careStats: { completed: 12, waiting: 5, delayed: 2, active: 3 },
  patients: [
    { id: 1, name: 'Halil Yildirim', room: '101', status: 'completed', task: 'Medikament verabreicht', time: '08:30', nurse: 'Anna M.' },
    { id: 2, name: 'Sevim Aktas', room: '102', status: 'waiting', task: 'Morgenpflege', time: '09:15', nurse: 'Thomas K.' },
    { id: 3, name: 'Ahmet Celik', room: '103', status: 'active', task: 'Verbandswechsel', time: '09:30', nurse: 'Maria D.' },
    { id: 4, name: 'Hatice Korkmaz', room: '104', status: 'completed', task: 'Vitalzeichen', time: '08:45', nurse: 'Anna M.' },
    { id: 5, name: 'Mustafa Arslan', room: '105', status: 'delayed', task: 'Physiotherapie', time: '09:00', nurse: 'Lisa A.' },
    { id: 6, name: 'Fatma Sahin', room: '201', status: 'completed', task: 'Medikament verabreicht', time: '08:20', nurse: 'Elena S.' },
    { id: 7, name: 'Ibrahim Dogan', room: '202', status: 'active', task: 'Blutzuckermessung', time: '09:45', nurse: 'Maria D.' },
    { id: 8, name: 'Emine Yilmaz', room: '203', status: 'waiting', task: 'Arztvisite', time: '10:00', nurse: 'Dr. Müller' },
    { id: 9, name: 'Huseyin Kara', room: '204', status: 'completed', task: 'Morgenpflege', time: '07:50', nurse: 'Jonas C.' },
    { id: 10, name: 'Zehra Aydin', room: '205', status: 'delayed', task: 'Blutdruckmessung', time: '09:10', nurse: 'Anna M.' },
    { id: 11, name: 'Ali Demir', room: '206', status: 'completed', task: 'Medikament verabreicht', time: '08:15', nurse: 'Elena S.' },
    { id: 12, name: 'Nuriye Ozcan', room: '301', status: 'waiting', task: 'Wundversorgung', time: '10:15', nurse: 'Maria D.' },
  ],
  tasks: [
    { id: 1, task: 'Medikamentenausgabe – Etage 1', assignee: 'Anna Müller', role: 'Pflegerin', status: 'completed', time: '08:15', priority: 'high' },
    { id: 2, task: 'Morgenpflege – Zimmer 103', assignee: 'Thomas Kaya', role: 'Pfleger', status: 'active', time: '09:30', priority: 'high' },
    { id: 3, task: 'Physiotherapie – Zimmer 105', assignee: 'Lisa Aksoy', role: 'Physioth.', status: 'waiting', time: '10:00', priority: 'normal' },
    { id: 4, task: 'Vitalzeichen – Etage 2', assignee: 'Maria Demir', role: 'Pflegerin', status: 'delayed', time: '09:00', priority: 'high' },
    { id: 5, task: 'Mittagsmedikamente', assignee: 'Elena Sahin', role: 'Pflegerin', status: 'waiting', time: '12:00', priority: 'high' },
    { id: 6, task: 'Zimmerreinigung – Etage 1', assignee: 'Jonas Celik', role: 'Pfleger', status: 'active', time: '09:15', priority: 'normal' },
    { id: 7, task: 'Arztvisite – Etage 2', assignee: 'Dr. Müller', role: 'Arzt', status: 'waiting', time: '10:30', priority: 'high' },
    { id: 8, task: 'Blutzuckermessung – Zimmer 202', assignee: 'Maria Demir', role: 'Pflegerin', status: 'active', time: '09:45', priority: 'normal' },
    { id: 9, task: 'Verbandswechsel – Zimmer 103', assignee: 'Anna Müller', role: 'Pflegerin', status: 'completed', time: '08:50', priority: 'normal' },
    { id: 10, task: 'Mittagessen-Kontrolle', assignee: 'Jonas Celik', role: 'Pfleger', status: 'waiting', time: '11:30', priority: 'normal' },
    { id: 11, task: 'Apothekenlieferung', assignee: 'Elena Sahin', role: 'Pflegerin', status: 'waiting', time: '11:00', priority: 'high' },
    { id: 12, task: 'Verlegungsvorbereitung – Zimmer 301', assignee: 'Thomas Kaya', role: 'Pfleger', status: 'waiting', time: '13:00', priority: 'high' },
  ],
  staff: [
    { id: 1, name: 'Anna Müller', role: 'Pflegerin', shift: '07:00–15:00', task: 'Medikamente', status: 'active', avatar: 'AM' },
    { id: 2, name: 'Thomas Kaya', role: 'Pfleger', shift: '07:00–15:00', task: 'Morgenpflege', status: 'active', avatar: 'TK' },
    { id: 3, name: 'Maria Demir', role: 'Pflegerin', shift: '07:00–15:00', task: 'Vitalzeichen', status: 'active', avatar: 'MD' },
    { id: 4, name: 'Dr. Müller', role: 'Arzt', shift: '08:00–16:00', task: 'Visitevorber.', status: 'active', avatar: 'DM' },
    { id: 5, name: 'Lisa Aksoy', role: 'Physioth.', shift: '08:00–16:00', task: 'Physiotherapie', status: 'waiting', avatar: 'LA' },
    { id: 6, name: 'Jonas Celik', role: 'Pfleger', shift: '07:00–15:00', task: 'Zimmerreinigung', status: 'active', avatar: 'JC' },
    { id: 7, name: 'Elena Sahin', role: 'Pflegerin', shift: '07:00–15:00', task: 'Medikamente', status: 'active', avatar: 'ES' },
    { id: 8, name: 'Max Aydin', role: 'Pfleger', shift: '07:00–15:00', task: 'Allg. Unterstützung', status: 'waiting', avatar: 'MA' },
  ],
  messages: [
    { id: 1, sender: 'Anna M.', text: 'Medikamentenausgabe Etage 1 abgeschlossen. Alle Patienten versorgt.', time: '08:45', type: 'info', avatar: 'AM', role: 'Pflegerin' },
    { id: 2, sender: 'Thomas K.', text: 'Beginne jetzt Morgenpflege in Zimmer 103.', time: '09:05', type: 'info', avatar: 'TK', role: 'Pfleger' },
    { id: 3, sender: 'Dr. Müller', text: 'Für Zimmer 205 neues Rezept ausgestellt. Bitte Pflegepersonal informieren.', time: '09:12', type: 'urgent', avatar: 'DM', role: 'Arzt' },
    { id: 4, sender: 'Maria D.', text: 'Vitalzeichen Etage 2 verzögert, Zimmer 202 hat Vorrang.', time: '09:20', type: 'urgent', avatar: 'MD', role: 'Pflegerin' },
    { id: 5, sender: 'Lisa A.', text: 'Physiotherapieraum bereit. Bereit für 10:00 Uhr Sitzung.', time: '09:25', type: 'info', avatar: 'LA', role: 'Physioth.' },
    { id: 6, sender: 'Jonas C.', text: 'Zimmerreinigung Etage 1 abgeschlossen.', time: '09:35', type: 'info', avatar: 'JC', role: 'Pfleger' },
    { id: 7, sender: 'Elena S.', text: 'Bereite Mittagsmedikamente vor. Fehlmeldung aus der Apotheke.', time: '09:40', type: 'urgent', avatar: 'ES', role: 'Pflegerin' },
    { id: 8, sender: 'System', text: 'Nachtschicht: 1 Pflegeperson fehlt. Leitung wurde informiert.', time: '09:42', type: 'urgent', avatar: 'SY', role: 'System' },
  ],
  risks: [
    { id: 1, title: 'Medikamentenbestand niedrig', desc: 'Paracetamol und Antibiotika reichen noch 3 Tage.', severity: 'high', action: 'Sofortbestellung bei Apotheke erforderlich' },
    { id: 2, title: 'Aufzug Wartung nötig', desc: 'Aufzug B-Block macht Geräusche, Techniker verständigen.', severity: 'medium', action: 'Wartungsunternehmen benachrichtigen' },
    { id: 3, title: 'Personalmangel', desc: 'Nachtschicht: 1 Pflegeperson fehlt.', severity: 'high', action: 'Bereitschaftspersonal kontaktieren' },
    { id: 4, title: 'Infektionsschutz', desc: 'Zimmer 205: Erhöhte Temperatur. Isolierung prüfen.', severity: 'high', action: 'Arzt informiert, Isolierungsprotokoll einleiten' },
    { id: 5, title: 'Generatortest', desc: 'Monatlicher Generatortest diese Woche fällig.', severity: 'low', action: 'Mit technischem Team planen' },
  ],
  criticals: [
    { id: 1, type: 'staff', text: 'Nachtschicht: 1 Pflegerin fehlt', severity: 'high', icon: 'user' },
    { id: 2, type: 'delay', text: 'Zimmer 105: Physiotherapie 45 Min. Verzögerung', severity: 'high', icon: 'clock' },
    { id: 3, type: 'density', text: 'Belegungsrate: 87 %', severity: 'medium', icon: 'bar' },
    { id: 4, type: 'medical', text: 'Zimmer 205: Fieber wird beobachtet', severity: 'high', icon: 'alert' },
  ],
}

const simulationMessages = [
  { sender: 'Anna M.', text: 'Zimmer 201 Medikamentengabe abgeschlossen.', type: 'info', avatar: 'AM', role: 'Pflegerin' },
  { sender: 'Thomas K.', text: 'Patient in Zimmer 103 hat gefrühstückt.', type: 'info', avatar: 'TK', role: 'Pfleger' },
  { sender: 'Dr. Müller', text: 'Dringende Konsultation für Zimmer 205 nötig.', type: 'urgent', avatar: 'DM', role: 'Arzt' },
  { sender: 'Maria D.', text: 'Blutdruckmessungen Etage 2 abgeschlossen. Alles normal.', type: 'info', avatar: 'MD', role: 'Pflegerin' },
  { sender: 'Lisa A.', text: 'Physiotherapiesitzung um 10:00 Uhr bereit.', type: 'info', avatar: 'LA', role: 'Physioth.' },
  { sender: 'Elena S.', text: 'Fehlende Medikamente aus Apotheke erhalten.', type: 'info', avatar: 'ES', role: 'Pflegerin' },
  { sender: 'System', text: 'Zimmer 202 Blutzucker: 145 mg/dL – Im Normbereich.', type: 'info', avatar: 'SY', role: 'System' },
  { sender: 'Dr. Müller', text: 'Morgenvisite abgeschlossen. Medikamente für 3 Patienten aktualisiert.', type: 'info', avatar: 'DM', role: 'Arzt' },
]

const statusConfig = {
  completed: { label: 'Abgeschlossen', color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0' },
  waiting:   { label: 'Wartend',       color: '#eab308', bg: '#fefce8', border: '#fef08a' },
  delayed:   { label: 'Verzögert',     color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  active:    { label: 'Aktiv',         color: '#5B8DB8', bg: '#eff6ff', border: '#bfdbfe' },
}

const severityConfig = {
  high:   { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', label: 'Hoch' },
  medium: { color: '#f97316', bg: '#fff7ed', border: '#fed7aa', label: 'Mittel' },
  low:    { color: '#eab308', bg: '#fefce8', border: '#fef08a', label: 'Niedrig' },
}

const roleColors = {
  'Pflegerin':  { color: '#7c3aed', bg: '#f5f3ff' },
  'Pfleger':    { color: '#0891b2', bg: '#ecfeff' },
  'Arzt':       { color: '#dc2626', bg: '#fef2f2' },
  'Physioth.':  { color: '#059669', bg: '#ecfdf5' },
  'System':     { color: '#64748b', bg: '#f8fafc' },
  'Yonetici':   { color: '#5B8DB8', bg: '#eff6ff' },
}

function avatarColor(initials) {
  const colors = ['#5B8DB8','#80C09B','#8b5cf6','#ec4899','#14b8a6','#f97316','#84cc16','#477A9E']
  let hash = 0
  for (let i = 0; i < initials.length; i++) hash = initials.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function getTimeNow() {
  return new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function DemoPflege({ onBack }) {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <DemoAccessGate dashboardId="pflege" onUnlock={() => setUnlocked(true)} onBack={onBack} />
  }

  return <PflegeDashboard onBack={onBack} />
}

function PflegeDashboard({ onBack }) {
  const [clock, setClock] = useState({ time: '', date: '' })
  const [state, setState] = useState(() => ({ ...initialState, messages: [...initialState.messages] }))
  const [msgFilter, setMsgFilter] = useState('all')
  const [msgInput, setMsgInput] = useState('')
  const chatRef = useRef(null)
  const simMsgIdx = useRef(0)
  const simTaskIdx = useRef(0)

  // Clock
  useEffect(() => {
    function tick() {
      const now = new Date()
      setClock({
        time: now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [state.messages])

  // Simulate new message
  const simulateMsg = useCallback(() => {
    const msgs = simulationMessages
    const idx = simMsgIdx.current % msgs.length
    simMsgIdx.current++
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, { ...msgs[idx], id: prev.messages.length + 1, time: getTimeNow() }],
    }))
  }, [])

  // Simulate task update
  const simulateTask = useCallback(() => {
    setState(prev => {
      const tasks = [...prev.tasks]
      const nonDone = tasks.filter(t => t.status !== 'completed')
      if (!nonDone.length) return prev
      const idx = simTaskIdx.current % nonDone.length
      simTaskIdx.current++
      const task = nonDone[idx]
      const transitions = { waiting: 'active', active: 'completed', delayed: 'active' }
      const newStatus = transitions[task.status]
      if (!newStatus) return prev
      const taskIdx = tasks.findIndex(t => t.id === task.id)
      tasks[taskIdx] = { ...task, status: newStatus }
      // Recalc care stats from tasks
      const counts = { completed: 0, waiting: 0, delayed: 0, active: 0 }
      tasks.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++ })
      return { ...prev, tasks, careStats: counts }
    })
  }, [])

  useEffect(() => {
    const t1 = setInterval(simulateMsg, 18000)
    const t2 = setInterval(simulateTask, 35000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [simulateMsg, simulateTask])

  function sendMessage() {
    if (!msgInput.trim()) return
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, {
        id: prev.messages.length + 1,
        sender: 'Sie',
        text: msgInput.trim(),
        time: getTimeNow(),
        type: 'info',
        avatar: 'SIE',
        role: 'Leitung',
      }],
    }))
    setMsgInput('')
  }

  const filteredMessages = msgFilter === 'all'
    ? state.messages
    : state.messages.filter(m => m.type === msgFilter)

  const sortedTasks = [...state.tasks].sort((a, b) => {
    const ord = { delayed: 0, active: 1, waiting: 2, completed: 3 }
    return (ord[a.status] ?? 4) - (ord[b.status] ?? 4)
  })

  const sortedRisks = [...state.risks].sort((a, b) => {
    const ord = { high: 0, medium: 1, low: 2 }
    return (ord[a.severity] ?? 3) - (ord[b.severity] ?? 3)
  })

  const s = state.careStats
  const total = s.completed + s.waiting + s.delayed + s.active
  const activeStaff = state.staff.filter(st => st.status === 'active').length

  return (
    <div className={styles.root}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B8DB8" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div>
            <h1 className={styles.brandName}>Wiseness Pflege</h1>
            <p className={styles.brandSub}>PFLEGE- UND GESUNDHEITSZENTRUM</p>
          </div>
          <button className={styles.backBtn} onClick={onBack}>
            ← Zurück
          </button>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.clockBox}>
            <div className={styles.clockTime}>{clock.time}</div>
            <div className={styles.clockDate}>{clock.date}</div>
          </div>
          <div className={styles.activeBadge}>
            <span className={styles.greenDot} />
            <span>System Aktiv</span>
          </div>
        </div>
      </header>

      {/* CRITICAL ALERTS */}
      <div className={styles.alertsBar}>
        <div className={styles.alertsInner}>
          <div className={styles.alertLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Kritisch</span>
          </div>
          {state.criticals.map(c => {
            const sev = severityConfig[c.severity]
            return (
              <div
                key={c.id}
                className={`${styles.alertChip} ${c.severity === 'high' ? styles.pulseAlert : ''}`}
                style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
              >
                <span style={{ color: sev.color, fontSize: 12 }}>⚠</span>
                <span style={{ color: sev.color, fontSize: 12 }}>{c.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* FOUNDER QUOTE */}
      <FounderQuote variant="pflege" accentColor="#80C09B" />

      {/* MAIN GRID */}
      <main className={styles.main}>
        {/* LEFT: Care Stats + Staff */}
        <div className={styles.colLeft}>
          {/* Care Stats */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              Täglicher Pflegestatus
            </h2>
            <div className={styles.careGrid}>
              {[
                { key: 'completed', ...statusConfig.completed },
                { key: 'waiting', ...statusConfig.waiting },
                { key: 'delayed', ...statusConfig.delayed },
                { key: 'active', ...statusConfig.active },
              ].map(st => (
                <div key={st.key} className={styles.careStatBox} style={{ background: st.bg, border: `1px solid ${st.border}` }}>
                  <div className={styles.careStatNum} style={{ color: st.color }}>{s[st.key]}</div>
                  <div className={styles.careStatLabel} style={{ color: st.color }}>{st.label}</div>
                  <div className={styles.careBar}>
                    <div
                      className={styles.careBarFill}
                      style={{ background: st.color, width: total ? `${Math.round(s[st.key] / total * 100)}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.recentSection}>
              <p className={styles.recentLabel}>Letzte Vorgänge</p>
              <div className={styles.recentList}>
                {state.patients.slice(0, 8).map(p => {
                  const sc = statusConfig[p.status]
                  return (
                    <div key={p.id} className={styles.recentItem}>
                      <span className={styles.dot} style={{ background: sc.color }} />
                      <span className={styles.recentRoom}>Zi. {p.room}</span>
                      <span className={styles.recentName}>{p.name}</span>
                      <span className={styles.badge} style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sc.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Staff */}
          <div className={`${styles.card} ${styles.cardFlex}`}>
            <h2 className={styles.cardTitle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Personal
              <span className={styles.countBadge}>{activeStaff} aktiv / {state.staff.length} gesamt</span>
            </h2>
            <div className={styles.staffList}>
              {state.staff.map(person => {
                const rc = roleColors[person.role] || { color: '#64748b', bg: '#f8fafc' }
                return (
                  <div key={person.id} className={styles.staffItem}>
                    <div className={styles.avatarWrap}>
                      <div className={styles.avatar} style={{ background: avatarColor(person.avatar) }}>{person.avatar}</div>
                      <span className={`${styles.statusDot} ${person.status === 'active' ? styles.statusGreen : styles.statusGray}`} />
                    </div>
                    <div className={styles.staffInfo}>
                      <div className={styles.staffRow}>
                        <span className={styles.staffName}>{person.name}</span>
                        <span className={styles.roleBadge} style={{ background: rc.bg, color: rc.color }}>{person.role}</span>
                      </div>
                      <div className={styles.staffSub}>{person.shift} – {person.task}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CENTER: Tasks + Risks */}
        <div className={styles.colCenter}>
          <div className={`${styles.card} ${styles.cardFlex}`}>
            <h2 className={styles.cardTitle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              Aufgaben
              <span className={styles.countBadge}>{sortedTasks.filter(t => t.status === 'active').length} aktiv / {sortedTasks.length} gesamt</span>
            </h2>
            <div className={styles.taskList}>
              {sortedTasks.map(t => {
                const sc = statusConfig[t.status]
                const rc = roleColors[t.role] || { color: '#64748b', bg: '#f8fafc' }
                return (
                  <div key={t.id} className={styles.taskItem}>
                    <div className={styles.taskDot} style={{ background: sc.color }} />
                    <div className={styles.taskBody}>
                      <div className={styles.taskRow}>
                        <span className={styles.taskName}>{t.task}</span>
                        {t.priority === 'high' && <span className={styles.priorityDot} />}
                      </div>
                      <div className={styles.taskMeta}>
                        <span className={styles.roleBadge} style={{ background: rc.bg, color: rc.color }}>{t.assignee}</span>
                        <span className={styles.taskTime}>{t.time}</span>
                      </div>
                    </div>
                    <span className={styles.badge} style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sc.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Risks */}
          <div className={styles.card} style={{ maxHeight: '35%', overflow: 'hidden' }}>
            <h2 className={styles.cardTitle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Risiken & Warnungen
            </h2>
            <div className={styles.riskList}>
              {sortedRisks.map(r => {
                const sev = severityConfig[r.severity]
                return (
                  <div key={r.id} className={styles.riskItem} style={{ background: sev.bg, border: `1px solid ${sev.border}` }}>
                    <div className={styles.riskHeader}>
                      <span className={styles.dot} style={{ background: sev.color }} />
                      <span className={styles.riskTitle} style={{ color: sev.color }}>{r.title}</span>
                      <span className={styles.badge} style={{ background: '#fff', color: sev.color, border: `1px solid ${sev.border}` }}>{sev.label}</span>
                    </div>
                    <p className={styles.riskDesc}>{r.desc}</p>
                    <div className={styles.riskAction}>→ {r.action}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Chat */}
        <div className={styles.colRight}>
          <div className={`${styles.card} ${styles.cardFlex} ${styles.chatCard}`}>
            <div className={styles.chatHeader}>
              <h2 className={styles.cardTitle} style={{ marginBottom: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Kommunikation
              </h2>
              <div className={styles.filterRow}>
                {['all', 'urgent', 'info'].map(f => (
                  <button
                    key={f}
                    className={`${styles.filterBtn} ${msgFilter === f ? styles.filterActive : ''}`}
                    onClick={() => setMsgFilter(f)}
                  >
                    {f === 'all' ? 'Alle' : f === 'urgent' ? 'Dringend' : 'Info'}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.chatMessages} ref={chatRef}>
              {filteredMessages.map((m, i) => {
                const rc = roleColors[m.role] || { color: '#64748b', bg: '#f8fafc' }
                if (m.sender === 'System') {
                  return (
                    <div key={m.id} className={styles.sysMsg}>
                      <div className={styles.sysMsgInner}>
                        <span className={styles.sysText}>⚠ {m.text}</span>
                        <span className={styles.msgTime}>{m.time}</span>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={m.id} className={`${styles.msgGroup} ${i === filteredMessages.length - 1 ? styles.slideIn : ''}`}>
                    <div className={styles.msgAvatar} style={{ background: avatarColor(m.avatar) }}>{m.avatar}</div>
                    <div className={styles.msgContent}>
                      <div className={styles.msgMeta}>
                        <span className={styles.msgSender}>{m.sender}</span>
                        <span className={styles.roleBadge} style={{ background: rc.bg, color: rc.color }}>{m.role}</span>
                        {m.type === 'urgent' && <span className={styles.urgentBadge}>Dringend</span>}
                        <span className={styles.msgTime}>{m.time}</span>
                      </div>
                      <div className={styles.msgBubble}>{m.text}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={styles.chatInputArea}>
              <input
                className={styles.chatInput}
                type="text"
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Nachricht schreiben..."
              />
              <button className={styles.sendBtn} onClick={sendMessage}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Senden
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
