import { useState, useEffect } from 'react'
import styles from './DemoAccessGate.module.css'

const DEMO_CODE = 'WISE2026'

export default function DemoAccessGate({ dashboardId, onUnlock, onBack }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  const storageKey = `demo_unlocked_${dashboardId}`

  useEffect(() => {
    const unlocked = sessionStorage.getItem(storageKey)
    if (unlocked === 'true') {
      onUnlock()
    }
  }, [storageKey, onUnlock])

  function handleSubmit(e) {
    e.preventDefault()
    if (code.trim().toUpperCase() === DEMO_CODE) {
      sessionStorage.setItem(storageKey, 'true')
      onUnlock()
    } else {
      setError('Ungültiger Code. Kontaktieren Sie uns für einen Zugang.')
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      setCode('')
    }
  }

  const labels = {
    pflege: { title: 'Pflege-Dashboard', icon: '🏥', sub: 'Wiseness Pflege — Live Demo' },
    fabrik: { title: 'Fabrik-Dashboard', icon: '🏭', sub: 'Wiseness Fabrik — Live Demo' },
    unternehmen: { title: 'Unternehmen-Dashboard', icon: '🏢', sub: 'Wiseness Unternehmen — Live Demo' },
  }
  const label = labels[dashboardId] || { title: 'Demo', icon: '📊', sub: 'Wiseness Live Demo' }

  return (
    <div className={styles.overlay}>
      <div className={`${styles.gate} ${shaking ? styles.shake : ''}`}>
        <button className={styles.backBtn} onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zurück
        </button>

        <div className={styles.icon}>{label.icon}</div>
        <div className={styles.badge}>Demo-Zugang</div>
        <h1 className={styles.title}>{label.title}</h1>
        <p className={styles.sub}>{label.sub}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Bitte Zugangscode eingeben</label>
          <input
            className={styles.input}
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value); setError('') }}
            placeholder="WISE****"
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn}>
            Zugang erhalten
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <p className={styles.hint}>
          Noch keinen Zugangscode?{' '}
          <a href="mailto:info@wiseness.de" className={styles.link}>Kontaktieren Sie uns</a>
        </p>

        <div className={styles.footer}>
          <span className={styles.dot} />
          <span>Wiseness — Interaktive Live-Demo</span>
        </div>
      </div>
    </div>
  )
}
