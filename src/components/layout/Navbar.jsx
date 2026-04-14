import { useState } from 'react'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './Navbar.module.css'

const LANGS = [
  { code: 'tr', label: 'TR' },
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
]

export default function Navbar({ currentPage, activeVertical, onNavigate, currentEmployee, isAdmin }) {
  const { t, lang, setLang } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: 'landing',     label: t('nav', 'overview') },
    { id: 'pflege',      label: t('nav', 'care') },
    { id: 'fabrik',      label: t('nav', 'factory') },
    { id: 'unternehmen', label: t('nav', 'company') },
  ]

  function isActive(id) {
    if (id === 'landing') return currentPage === 'landing'
    return currentPage === 'vertical' && activeVertical?.id === id
  }

  function handleNav(id) {
    setMenuOpen(false)
    id === 'landing' ? onNavigate('landing') : onNavigate('vertical', id)
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Brand */}
        <div className={styles.brand} onClick={() => { setMenuOpen(false); onNavigate('landing') }}>
          <img src="/wiseness-logo.jpg" alt="Wiseness" className={styles.logo} />
          <span className={styles.brandName}>Wiseness</span>
        </div>

        {/* Desktop nav */}
        <div className={styles.nav}>
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.navItem} ${isActive(id) ? styles.active : ''}`}
              onClick={() => handleNav(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop status / lang / employee */}
        <div className={styles.status}>
          <div className={styles.langSwitch}>
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                className={`${styles.langBtn} ${lang === code ? styles.langActive : ''}`}
                onClick={() => setLang(code)}
              >
                {label}
              </button>
            ))}
          </div>
          {currentEmployee?.role === 'admin' && (
            <button
              className={`${styles.empBtn} ${currentPage === 'admin' ? styles.empBtnActive : ''}`}
              onClick={() => onNavigate('admin')}
            >
              {t('nav', 'admin')}
            </button>
          )}
          {currentEmployee ? (
            <button className={`${styles.empBtn} ${styles.empBtnActive}`} onClick={() => onNavigate('employee-portal')}>
              <span className={styles.empDot} />
              {currentEmployee.fullName}
            </button>
          ) : (
            <button className={styles.empBtn} onClick={() => onNavigate('login')}>
              {t('nav', 'employeeLogin')}
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü"
          aria-expanded={menuOpen}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            className={`${styles.mobileNavItem} ${isActive(id) ? styles.active : ''}`}
            onClick={() => handleNav(id)}
          >
            {label}
          </button>
        ))}

        <div className={styles.mobileDivider} />

        {/* Language switcher in mobile menu */}
        <div className={styles.mobileLangRow}>
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              className={`${styles.mobileLangBtn} ${lang === code ? styles.mobileLangActive : ''}`}
              onClick={() => { setLang(code); setMenuOpen(false) }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.mobileDivider} />

        {/* Employee / Admin in mobile menu */}
        {currentEmployee?.role === 'admin' && (
          <button className={styles.mobileNavItem} onClick={() => { onNavigate('admin'); setMenuOpen(false) }}>
            {t('nav', 'admin')}
          </button>
        )}
        {currentEmployee ? (
          <button className={styles.mobileNavItem} onClick={() => { onNavigate('employee-portal'); setMenuOpen(false) }}>
            ● {currentEmployee.fullName}
          </button>
        ) : (
          <button className={styles.mobileNavItem} onClick={() => { onNavigate('login'); setMenuOpen(false) }}>
            {t('nav', 'employeeLogin')}
          </button>
        )}
      </div>
    </>
  )
}
