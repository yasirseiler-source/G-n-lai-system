import { useState } from 'react'
import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './EmployeeLogin.module.css'

export default function EmployeeLogin({ onLogin, loginError, onClearError }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    onLogin(email.trim(), password)
  }

  const errorMsg = loginError ? t('auth', loginError) : ''

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <img src="/wiseness-logo.jpg" alt="Wiseness" className={styles.logo} />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{t('auth', 'loginTitle')}</h1>
          <p className={styles.subtitle}>{t('auth', 'loginSubtitle')}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>{t('auth', 'username')}</label>
            <div className={styles.inputWrap}>
              <Icon name="briefcase" size={14} color="var(--text-muted)" />
              <input
                className={styles.input}
                type="email"
                placeholder={t('auth', 'usernamePh')}
                value={email}
                autoComplete="email"
                onChange={(e) => { setEmail(e.target.value); onClearError() }}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('auth', 'password')}</label>
            <div className={styles.inputWrap}>
              <Icon name="settings" size={14} color="var(--text-muted)" />
              <input
                className={styles.input}
                type={showPw ? 'text' : 'password'}
                placeholder={t('auth', 'passwordPh')}
                value={password}
                autoComplete="current-password"
                onChange={(e) => { setPassword(e.target.value); onClearError() }}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPw((v) => !v)} tabIndex={-1}>
                <Icon name={showPw ? 'check' : 'info'} size={13} color="var(--text-muted)" />
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className={styles.errorMsg}>
              <Icon name="info" size={12} color="var(--status-red)" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!email.trim() || !password.trim()}
          >
            {t('auth', 'submit')}
            <Icon name="arrowRight" size={14} color="#fff" />
          </button>
        </form>
      </div>
    </div>
  )
}
