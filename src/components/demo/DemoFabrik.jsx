import { useState, useEffect, useRef } from 'react'
import styles from './DemoFabrik.module.css'
import DemoAccessGate from './DemoAccessGate'
import FounderQuote from '../common/FounderQuote'

// ─── Data ───────────────────────────────────────────────────────────────────
const tickerItems = [
  ['Shredder', 'AKTIV'], ['Ofentemperatur', '1.248 °C'], ['Separator Auslastung', '78 %'],
  ['Durchsatz gesamt', '14.830 kg/h'], ['Mitarbeiter aktiv', '24 / 24'], ['Qualitätsprüfung', 'IN BETRIEB'],
]

const flowSteps = [
  { icon: '🚛', name: 'Annahme' }, { icon: '⚙️', name: 'Zerkleinern' }, { icon: '🔀', name: 'Trennen' },
  { icon: '🔥', name: 'Weiterverarbeiten' }, { icon: '🔬', name: 'Qualitätsprüfung' }, { icon: '🗄️', name: 'Lagerung' },
]

const initialMachines = [
  { id: 0, icon: '⚙️', name: 'Shredder', orig: 'Zerkleinerer', l: 82, t: 94, maxT: 200, status: 'ok' },
  { id: 1, icon: '🔀', name: 'Separator', orig: 'Materialtrennmaschine', l: 78, t: 62, maxT: 200, status: 'ok' },
  { id: 2, icon: '🔥', name: 'Schmelzofen', orig: 'Metallverarbeitung', l: 91, t: 1248, maxT: 1500, status: 'ok' },
  { id: 3, icon: '📦', name: 'Förderband', orig: 'Materialtransport', l: 74, t: 48, maxT: 200, status: 'ok' },
  { id: 4, icon: '🗜️', name: 'Presse', orig: 'Verdichtungsmaschine', l: 69, t: 71, maxT: 200, status: 'ok' },
]

const depts = [
  { id: 'pd0', icon: '🚛', name: 'Annahme', orig: 'Materialannahme', count: 4 },
  { id: 'pd1', icon: '🏗️', name: 'Produktion', orig: 'Verarbeitung', count: 8 },
  { id: 'pd2', icon: '🔍', name: 'Sortierung', orig: 'Materialklassifizierung', count: 5 },
  { id: 'pd3', icon: '🔬', name: 'Labor', orig: 'Qualitätsprüfung', count: 3 },
  { id: 'pd4', icon: '🗄️', name: 'Lager', orig: 'Materiallagerung', count: 4 },
]

const metals = [
  { no: 1, name: 'Kupfer',    stock: 1200, exp: 1100, precious: false },
  { no: 2, name: 'Aluminium', stock: 2000, exp: 1850, precious: false },
  { no: 3, name: 'Stahl',     stock: 5000, exp: 4700, precious: false },
  { no: 4, name: 'Zink',      stock: 800,  exp: 720,  precious: false },
  { no: 5, name: 'Blei',      stock: 600,  exp: 540,  precious: false },
  { no: 6, name: 'Nickel',    stock: 300,  exp: 270,  precious: false },
  { no: 7, name: 'Messing',   stock: 900,  exp: 810,  precious: false },
  { no: 8, name: 'Edelstahl', stock: 1500, exp: 1400, precious: false },
  { no: 9, name: 'Bronze',    stock: 700,  exp: 630,  precious: false },
  { no: 10, name: 'Chrom',    stock: 200,  exp: 180,  precious: false },
  { no: 11, name: 'Kobalt',   stock: 150,  exp: 130,  precious: false },
  { no: 12, name: 'Titan',    stock: 250,  exp: 230,  precious: false },
  { no: 13, name: 'Magnesium',stock: 400,  exp: 360,  precious: false },
  { no: 14, name: 'Silber (Restanteil)', stock: 50, exp: 45, precious: true },
  { no: 15, name: 'Gold (Restanteil)',   stock: 20, exp: 18, precious: true },
  { no: 16, name: 'Palladium',           stock: 15, exp: 13, precious: true },
  { no: 17, name: 'Platin',              stock: 10, exp: 9,  precious: true },
  { no: 18, name: 'Zinn',     stock: 350, exp: 320, precious: false },
  { no: 19, name: 'Mangan',   stock: 600, exp: 550, precious: false },
  { no: 20, name: 'Wolfram',  stock: 180, exp: 160, precious: false },
]

function lossColor(pct) {
  if (pct < 5)  return { cls: 'g', label: `${pct.toFixed(2).replace('.', ',')} %` }
  if (pct < 10) return { cls: 'y', label: `${pct.toFixed(2).replace('.', ',')} %` }
  return { cls: 'r', label: `${pct.toFixed(2).replace('.', ',')} %` }
}

function barClass(l) {
  if (l >= 90) return styles.fillYellow
  if (l >= 50) return styles.fillGreen
  return styles.fillGreen
}

function rnd(v, d) { return Math.max(2, Math.min(98, v + (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * d) + 1))) }
function rndT(v, d, mx) { return Math.max(30, Math.min(mx, v + (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * d) + 1))) }

// ─── Component ──────────────────────────────────────────────────────────────
export default function DemoFabrik({ onBack }) {
  const [unlocked, setUnlocked] = useState(false)
  if (!unlocked) return <DemoAccessGate dashboardId="fabrik" onUnlock={() => setUnlocked(true)} onBack={onBack} />
  return <FabrikDashboard onBack={onBack} />
}

function FabrikDashboard({ onBack }) {
  const [clock, setClock] = useState('')
  const [rt, setRt] = useState(4 * 3600 + 12 * 60 + 8)
  const [tp, setTp] = useState(14830)
  const [proc, setProc] = useState(15225)
  const [tpDelta, setTpDelta] = useState(14)
  const [procDelta, setProcDelta] = useState(8)
  const [machines, setMachines] = useState(initialMachines)
  const [flowActive, setFlowActive] = useState(-1)
  const [dotBlink, setDotBlink] = useState({})

  // Clock
  useEffect(() => {
    function tick() {
      const n = new Date(), p = x => String(x).padStart(2, '0')
      setClock(`${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Runtime
  useEffect(() => {
    const id = setInterval(() => setRt(r => r + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // KPI update
  useEffect(() => {
    const id = setInterval(() => {
      const d = Math.floor(Math.random() * 18) + 6
      setTp(prev => prev + d)
      setTpDelta(d)
      const pd = Math.floor(Math.random() * 10) + 4
      setProc(prev => prev + pd)
      setProcDelta(pd)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  // Machine update
  useEffect(() => {
    const id = setInterval(() => {
      setMachines(prev => prev.map((m, i) => ({
        ...m,
        l: rnd(m.l, 2),
        t: rndT(m.t, i === 2 ? 3 : 2, m.maxT),
      })))
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // Flow pulse
  useEffect(() => {
    let fp = 0
    const id = setInterval(() => {
      setFlowActive(fp)
      setTimeout(() => setFlowActive(-1), 350)
      fp = (fp + 1) % flowSteps.length
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Personnel dots blink
  useEffect(() => {
    const id = setInterval(() => {
      const deptId = depts[Math.floor(Math.random() * depts.length)].id
      const dotIdx = Math.floor(Math.random() * depts.find(d => d.id === deptId).count)
      setDotBlink({ [deptId + dotIdx]: true })
      setTimeout(() => setDotBlink({}), 500)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  function fmtRt(s) {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }
  function fmtDE(n) { return n.toLocaleString('de-DE') }

  const totalStock = metals.reduce((s, m) => s + m.stock, 0)
  const totalExp   = metals.reduce((s, m) => s + m.exp, 0)
  const totalLoss  = totalStock - totalExp

  const sep = machines[1]
  const ofen = machines[2]

  return (
    <div className={styles.root}>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>W</div>
          <div>
            <div className={styles.brandName}>Wiseness Fabrik – Metallverarbeitung</div>
            <div className={styles.brandSub}>Betrieb Live-Dashboard · Schichtübersicht</div>
          </div>
          <button className={styles.backBtn} onClick={onBack}>← Zurück</button>
        </div>
        <div className={styles.topbarRight}>
          <div className={styles.liveBadge}>
            <div className={styles.liveDot} />
            LIVE
          </div>
          <div className={styles.clockBox}>{clock}</div>
        </div>
      </div>

      {/* TICKER */}
      <div className={styles.ticker}>
        <div className={styles.tickerLabel}>LIVE</div>
        <div className={styles.tickerScroll}>
          <div className={styles.tickerInner}>
            {[...tickerItems, ...tickerItems].map(([label, val], i) => (
              <span key={i} className={styles.tickerItem}>
                {label} <b>{i === 1 ? `${fmtDE(ofen.t)} °C` : i === 2 ? `${sep.l} %` : i === 3 ? `${fmtDE(tp)} kg/h` : val}</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FOUNDER QUOTE */}
      <FounderQuote variant="fabrik" accentColor="#477A9E" />

      <div className={styles.main}>
        {/* [1] KPIs */}
        <section>
          <div className={styles.secLabel}>Echtzeit-Kennzahlen</div>
          <div className={styles.kpiRow}>
            <div className={styles.kpi}>
              <div className={styles.kpiStripe} style={{ background: '#5B8DB8' }} />
              <div className={styles.kpiLabel}>Durchsatz</div>
              <div className={styles.kpiVal} style={{ color: '#5B8DB8' }}>{fmtDE(tp)}<span className={styles.kpiUnit}>kg/h</span></div>
              <div className={styles.kpiSub}>▲ steigend &nbsp;<span style={{ color: '#5B8DB8', fontWeight: 700 }}>+{tpDelta} kg/h</span></div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiStripe} style={{ background: '#80C09B' }} />
              <div className={styles.kpiLabel}>Mitarbeiter Aktiv</div>
              <div className={styles.kpiVal} style={{ color: '#80C09B' }}>24<span className={styles.kpiUnit}>/ 24</span></div>
              <div className={styles.kpiSub}>Alle Bereiche besetzt</div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiStripe} style={{ background: '#5B8DB8' }} />
              <div className={styles.kpiLabel}>Maschinenstatus</div>
              <div className={styles.kpiVal} style={{ color: '#5B8DB8' }}>5<span className={styles.kpiUnit}>/ 5</span></div>
              <div className={styles.kpiSub}><span style={{ color: '#22c55e' }}>●</span> Alle Maschinen aktiv</div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiStripe} style={{ background: '#d97706' }} />
              <div className={styles.kpiLabel}>Verarbeitete Menge</div>
              <div className={styles.kpiVal} style={{ color: '#d97706' }}>{fmtDE(proc)}<span className={styles.kpiUnit}>kg</span></div>
              <div className={styles.kpiSub}>▲ <span style={{ color: '#d97706', fontWeight: 700 }}>+{procDelta} kg</span> seit letzter Aktualisierung</div>
            </div>
          </div>
        </section>

        {/* [2] Process Flow */}
        <section>
          <div className={styles.secLabel}>Produktionsprozess – Live-Fluss</div>
          <div className={styles.flowWrap}>
            <div className={styles.flow}>
              {flowSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < flowSteps.length - 1 ? undefined : 1 }}>
                  <div className={styles.flowStep}>
                    <div className={styles.flowIcon} style={{ opacity: flowActive === i ? 0.3 : 1 }}>{step.icon}</div>
                    <div className={styles.flowName}>{step.name}</div>
                    <div className={styles.flowSub}>Aktiv</div>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className={styles.flowConnector}>
                      <div className={styles.flowAnim} style={{ animationDelay: `${i * 0.4}s` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [3] Machines */}
        <section>
          <div className={styles.secLabel}>Maschinenstatus &amp; Auslastung</div>
          <div className={styles.machineGrid}>
            {machines.map(m => {
              const tPct = Math.round(m.t / m.maxT * 100)
              const tFmtted = m.id === 2 ? `${fmtDE(m.t)} °C` : `${m.t} °C`
              return (
                <div key={m.id} className={styles.mcard}>
                  <div className={styles.mcardIcon}>{m.icon}</div>
                  <div className={styles.mcardName}>{m.name}</div>
                  <div className={styles.mcardOrig}>{m.orig}</div>
                  <div><span className={`${styles.mBadge} ${styles.badgeOk}`}>AKTIV</span></div>
                  <div className={styles.barWrap}>
                    <div className={styles.barTop}><span>Auslastung</span><span>{m.l} %</span></div>
                    <div className={styles.barBg}><div className={`${styles.barFill} ${barClass(m.l)}`} style={{ width: `${m.l}%` }} /></div>
                  </div>
                  <div className={styles.barWrap}>
                    <div className={styles.barTop}><span>Temperatur</span><span>{tFmtted}</span></div>
                    <div className={styles.barBg}><div className={`${styles.barFill} ${m.id === 2 ? styles.fillRed : styles.fillGreen}`} style={{ width: `${tPct}%` }} /></div>
                  </div>
                  <div className={styles.mcardRuntime}>⏱ {fmtRt(rt)}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* [4] Personnel */}
        <section>
          <div className={styles.secLabel}>Personalübersicht – Aktive Schicht</div>
          <div className={styles.personnelGrid}>
            {depts.map(d => (
              <div key={d.id} className={styles.pcard}>
                <div className={styles.pcardIcon}>{d.icon}</div>
                <div className={styles.pcardName}>{d.name}</div>
                <div className={styles.pcardOrig}>{d.orig}</div>
                <div className={styles.pcardCount}>{d.count}</div>
                <div className={styles.pcardSub}>Mitarbeiter aktiv</div>
                <div className={styles.dots}>
                  {Array.from({ length: d.count }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.dot}
                      style={{ opacity: dotBlink[d.id + i] ? 0.25 : 1, transition: 'opacity 0.3s' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* [5] Metals Table */}
        <section>
          <div className={styles.secLabel}>Metallbestand – Alle 20 Metalle</div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th><th>Metall</th><th>Lager (kg)</th><th>Erwartet (kg)</th>
                  <th>Verlust (kg)</th><th>Verlust %</th><th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {metals.map(m => {
                  const loss = m.stock - m.exp
                  const pct = (loss / m.stock) * 100
                  const lc = lossColor(pct)
                  const colorMap = { g: '#16a34a', y: '#ca8a04', r: '#dc2626' }
                  const bgMap    = { g: '#dcfce7', y: '#fef9c3', r: '#fee2e2' }
                  return (
                    <tr key={m.no} style={m.precious ? { background: '#fffbeb' } : {}}>
                      <td className={styles.tdNo}>{m.no}</td>
                      <td className={`${styles.tdName} ${m.precious ? styles.tdPrecious : ''}`}>
                        {m.precious ? '★ ' : ''}{m.name}
                      </td>
                      <td className={styles.tdStock}>{fmtDE(m.stock)}</td>
                      <td className={styles.tdExp}>{fmtDE(m.exp)}</td>
                      <td style={{ fontWeight: 700, color: colorMap[lc.cls], textAlign: 'right' }}>{fmtDE(loss)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span style={{ background: bgMap[lc.cls], color: colorMap[lc.cls], fontWeight: 700, fontSize: 10, padding: '2px 7px', borderRadius: 6 }}>{lc.label}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={styles.spark}><span className={styles.sparkFill} style={{ background: m.precious ? '#d97706' : colorMap[lc.cls], animationDelay: `${m.no * 0.2}s` }} /></span>
                      </td>
                    </tr>
                  )
                })}
                <tr className={styles.tfootRow}>
                  <td></td>
                  <td style={{ color: '#1e293b' }}>GESAMT</td>
                  <td style={{ color: '#2563eb', textAlign: 'right', fontWeight: 700 }}>{fmtDE(totalStock)}</td>
                  <td style={{ color: '#64748b', textAlign: 'right' }}>{fmtDE(totalExp)}</td>
                  <td style={{ color: '#dc2626', textAlign: 'right', fontWeight: 700 }}>{fmtDE(totalLoss)}</td>
                  <td style={{ textAlign: 'right' }}><span style={{ background: '#fef9c3', color: '#ca8a04', fontWeight: 700, fontSize: 10, padding: '2px 7px', borderRadius: 6 }}>7,85 %</span></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Legend */}
        <div className={styles.legend}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Legende:</span>
          <div className={styles.legItem}><div className={styles.legDot} style={{ background: '#16a34a' }} />Verlust &lt; 5 % — Optimal</div>
          <div className={styles.legItem}><div className={styles.legDot} style={{ background: '#ca8a04' }} />Verlust 5–10 % — Akzeptabel</div>
          <div className={styles.legItem}><div className={styles.legDot} style={{ background: '#dc2626' }} />Verlust &gt; 10 % — Kritisch</div>
          <div className={styles.legItem}><div className={styles.legDot} style={{ background: '#d97706' }} />★ Edelmetall — Nur Restanteil</div>
        </div>
      </div>

      <div className={styles.footer}>
        Wiseness Fabrik – Metallverarbeitung &nbsp;·&nbsp; Live-Dashboard &nbsp;·&nbsp; Automatische Aktualisierung alle 2 Sekunden
      </div>
    </div>
  )
}
