import { useState } from 'react'
import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './FinalPage.module.css'
import { submitLead } from '../../services/leadService'

function DonutChart({ active, total, labelActive, labelOf }) {
  const r = 44, cx = 52, cy = 52, circ = 2 * Math.PI * r
  const pct = total > 0 ? active / total : 0
  return (
    <div className={styles.donutWrap}>
      <svg width="104" height="104" viewBox="0 0 104 104">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--primary)" strokeWidth="10"
          strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="butt"
          transform="rotate(-90 52 52)" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
        <text x="52" y="48" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--primary)" fontFamily="Montserrat,sans-serif">{active}</text>
        <text x="52" y="63" textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="Montserrat,sans-serif">{total} {labelOf}</text>
      </svg>
      <span className={styles.donutLabel}>{labelActive}</span>
    </div>
  )
}

function SizeBar({ systemSize, sizeMap }) {
  const sizes = ['S', 'M', 'L', 'XL']
  return (
    <div className={styles.sizeBar}>
      {sizes.map((s) => {
        const info = sizeMap[s]
        const active = s === systemSize
        const past = sizes.indexOf(s) <= sizes.indexOf(systemSize)
        return (
          <div key={s} className={styles.sizeSegment}>
            <div className={styles.sizeSegBar} style={{ background: past ? info.color : 'var(--border)', opacity: active ? 1 : past ? 0.5 : 0.3 }} />
            <span className={styles.sizeSegLabel} style={{ color: active ? info.color : 'var(--text-muted)', fontWeight: active ? 800 : 500 }}>{s}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function FinalPage({ state, vertical, onBack, currentEmployee }) {
  const { t, lang } = useTranslation()
  const { selectedModules, selectedSensors, systemSize, cameraCount, technicalHints, formData, effectiveSensorQty, totalModules } = state

  const sizeMap = {
    S:  { label: t('sidebar', 'sizeSmall'),  desc: '10 odaya kadar, 20 çalışana kadar',       color: 'var(--status-green)',  pct: 25 },
    M:  { label: t('sidebar', 'sizeMedium'), desc: '10–30 oda, 20–50 çalışan',                color: 'var(--primary)',        pct: 50 },
    L:  { label: t('sidebar', 'sizeLarge'),  desc: '30–60 oda, 50–100 çalışan',               color: 'var(--status-yellow)', pct: 75 },
    XL: { label: t('sidebar', 'sizeXL'),     desc: '60\'tan fazla oda, 100\'den fazla çalışan', color: 'var(--status-red)',    pct: 100 },
  }

  const needsKeys = [
    { key: 'sicherheitsbedarf',    label: t('needs', 'security') },
    { key: 'automatisierungsbedarf', label: t('needs', 'automation') },
    { key: 'wartungsbedarf',       label: t('needs', 'maintenance') },
    { key: 'kommunikationsbedarf', label: t('form', 'needsCommunication') },
    { key: 'notfallmanagement',    label: t('needs', 'emergency') },
  ]
  const lvls = [t('form','needsNone'), t('form','needsLow'), t('form','needsMedium'), t('form','needsHigh'), t('form','needsVeryHigh')]
  const bClrs = ['var(--border)', 'var(--status-green)', '#E8A020', '#D4640A', 'var(--status-red)']

  const size = sizeMap[systemSize] || sizeMap.S
  const modules = Array.from(selectedModules)
  const sensors = Array.from(selectedSensors)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const bars = needsKeys.map(({ key, label }) => {
    const idx = lvls.indexOf(formData[key] || '')
    return { label, pct: idx <= 0 ? 0 : (idx / (lvls.length - 1)) * 100, color: bClrs[Math.max(idx, 0)], val: formData[key] || '' }
  }).filter(b => b.pct > 0)

  async function handleSend() {
    setSending(true)
    const result = await submitLead({
      source: currentEmployee ? 'employee' : 'public',
      formData,
      employee: currentEmployee || null,
      lang,
      extra: { vertical: vertical?.id, selectedModules: modules, selectedSensors: sensors, effectiveSensorQty, systemSize, cameraCount, technicalHints },
    })
    setSending(false)
    if (result.ok) setSent(true)
  }

  if (sent) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIconWrap}><Icon name="check" size={28} color="var(--status-green)" /></div>
          <h1 className={styles.successTitle}>{t('final', 'successTitle')}</h1>
          <p className={styles.successText}>{t('final', 'successText')}</p>
          {formData.firmenname && <div className={styles.successMeta}>{formData.firmenname}{formData.email && ` · ${formData.email}`}</div>}
          <button className={styles.backBtn} onClick={onBack}>{t('final', 'backHomeBtn')}</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backLink} onClick={onBack}>
          <Icon name="chevronRight" size={14} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
          {t('final', 'backBtn')}
        </button>
        <div>
          <h1 className={styles.pageTitle}>{t('final', 'pageTitle')}</h1>
          <p className={styles.pageSubtitle}>{t('final', 'pageSubtitle')}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="chart" size={14} color="var(--text-muted)" /><span>{t('final', 'systemAnalysis')}</span></div>
            <div className={styles.analysisRow}>
              <DonutChart active={modules.length} total={totalModules || 10} labelActive={t('final', 'activeModules')} labelOf={t('final', 'ofTotal')} />
              <div className={styles.analysisMid}>
                <div className={styles.analysisSub}>{t('final', 'systemSize')}</div>
                <SizeBar systemSize={systemSize} sizeMap={sizeMap} />
                <div className={styles.sizeReadout}>
                  <span className={styles.sizeCode} style={{ color: size.color }}>{systemSize}</span>
                  <span className={styles.sizeName}>{size.label}</span>
                </div>
                <div className={styles.sizeDesc}>{size.desc}</div>
              </div>
              <div className={styles.cameraBlock}>
                <Icon name="camera" size={18} color="var(--primary)" />
                <div className={styles.cameraNum}>{cameraCount}</div>
                <div className={styles.cameraLabel}>{t('final', 'recommendedCam')}</div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="layers" size={14} color="var(--text-muted)" /><span>{t('final', 'modules')}</span><span className={styles.countTag}>{modules.length}</span></div>
            <div className={styles.tagList}>
              {modules.map(m => <span key={m} className={styles.tag}>{m}</span>)}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="radio" size={14} color="var(--text-muted)" /><span>{t('final', 'sensors')}</span><span className={styles.countTag}>{sensors.length}</span></div>
            <div className={styles.sensorTable}>
              <div className={styles.sensorTableHead}><span>{t('final', 'sensorType')}</span><span>{t('final', 'sensorQty')}</span></div>
              {sensors.map(s => (
                <div key={s} className={styles.sensorRow}>
                  <span className={styles.sensorDot} /><span className={styles.sensorName}>{s}</span>
                  {effectiveSensorQty?.[s] !== undefined && <span className={styles.sensorQty}>{effectiveSensorQty[s]}×</span>}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="target" size={14} color="var(--text-muted)" /><span>{t('final', 'needsAnalysis')}</span></div>
            {bars.length === 0 ? <p className={styles.noData}>{t('final', 'noNeedsData')}</p> : (
              <div className={styles.needsChart}>
                {bars.map(b => (
                  <div key={b.label} className={styles.needsRow}>
                    <span className={styles.needsLabel}>{b.label}</span>
                    <div className={styles.needsTrack}><div className={styles.needsFill} style={{ width: `${b.pct}%`, background: b.color }} /></div>
                    <span className={styles.needsVal}>{b.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="tool" size={14} color="var(--text-muted)" /><span>{t('final', 'technicalNotes')}</span></div>
            <ul className={styles.hintList}>
              {technicalHints.map((h, i) => (
                <li key={i} className={styles.hintItem}><div className={styles.hintNum}>{i + 1}</div>{h}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="file" size={14} color="var(--text-muted)" /><span>{t('final', 'projectSummary')}</span></div>
            <table className={styles.sumTable}>
              <tbody>
                {[
                  [t('final','lblCompany'),       formData.firmenname],
                  [t('final','lblContact'),        formData.ansprechpartner],
                  [t('final','lblLocation'),       formData.standort],
                  [t('final','lblSector'),         formData.branche],
                  [t('final','lblObjectType'),     formData.objekttyp],
                  [t('final','lblArea'),           formData.gesamtflaeche && `${formData.gesamtflaeche} m²`],
                  [t('final','lblRooms'),          formData.anzahlRaeume],
                  [t('final','lblFloors'),         formData.anzahlEtagen],
                  [t('final','lblEmployees'),      formData.anzahlMitarbeiter],
                  [t('final','lblResidents'),      formData.anzahlBewohner],
                  [t('final','lblBudget'),         formData.budgetrahmen],
                  [t('final','lblPriority'),       formData.prioritaet],
                  [t('final','lblTimeline'),       formData.umsetzungszeitraum],
                  [t('final','lblSectorType'),     vertical?.title],
                  [t('final','lblSystemSize'),     `${systemSize} – ${size.label}`, true],
                  [t('final','lblRecCameras'),     `${cameraCount} ${t('final','units')}`, true],
                  [t('final','lblActiveModules'),  `${modules.length} / ${totalModules || 10}`, true],
                ].filter(([, v]) => !!v).map(([label, value, hl]) => (
                  <tr key={label} className={hl ? styles.sumRowHl : styles.sumRow}>
                    <td className={styles.sumLabel}>{label}</td>
                    <td className={styles.sumValue}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {formData.freitextWuensche && (
            <div className={styles.card}>
              <div className={styles.cardHead}><Icon name="messageSquare" size={14} color="var(--text-muted)" /><span>{t('final', 'individualReqs')}</span></div>
              <p className={styles.freitext}>{formData.freitextWuensche}</p>
            </div>
          )}

          <div className={styles.card}>
            <div className={styles.cardHead}><Icon name="send" size={14} color="var(--text-muted)" /><span>{t('final', 'sendRequest')}</span></div>
            <p className={styles.sendText}>{t('final', 'sendText')}</p>
            <button className={styles.sendBtn} onClick={handleSend} disabled={sending}>
              {sending ? t('final', 'sending') : t('final', 'sendBtn')}
              {!sending && <Icon name="arrowRight" size={14} color="#fff" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
