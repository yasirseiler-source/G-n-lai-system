import { supabase } from './lib/supabase'
import { useState, useCallback, useEffect } from 'react'
import { verticals } from './data/verticals'
import { useIntakeState } from './hooks/useIntakeState'
import { useAuth } from './hooks/useAuth'
import { LanguageProvider } from './i18n/LanguageContext'
import { useTranslation } from './i18n/LanguageContext'
import { EmployeesProvider } from './context/EmployeesContext'
import Navbar from './components/layout/Navbar'
import LandingPage from './components/landing/LandingPage'
import VerticalPage from './components/vertical/VerticalPage'
import FinalPage from './components/summary/FinalPage'
import EmployeeLogin from './components/auth/EmployeeLogin'
import EmployeePortal from './components/auth/EmployeePortal'
import AdminPanel from './components/admin/AdminPanel'
import WhatsAppButton from './components/common/WhatsAppButton'
import './styles/globals.css'

function AppInner() {
  const [page, setPage] = useState('landing')
  const [activeVerticalId, setActiveVerticalId] = useState(null)

  const { currentEmployee, login, logout, loginError, setLoginError, isAdmin, refreshCurrentEmployee } = useAuth()
  const { setLang } = useTranslation()

  const activeVertical = verticals.find((v) => v.id === activeVerticalId) || null
  const state = useIntakeState(activeVertical)

  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase
        .from('users')
        .select('*')

      console.log('SUPABASE DATA:', data)
      console.log('SUPABASE ERROR:', error)
    }

    testSupabase()
  }, [])
  
  const navigate = useCallback(
    (targetPage, verticalId) => {
      if (targetPage === 'landing')          { setPage('landing'); setActiveVerticalId(null); return }
      if (targetPage === 'vertical') {
        const v = verticals.find((vv) => vv.id === verticalId)
        if (!v) return
        if (verticalId !== activeVerticalId) { state.resetForVertical(v); setActiveVerticalId(verticalId) }
        setPage('vertical'); return
      }
      if (targetPage === 'final')            { setPage('final'); return }
      if (targetPage === 'login')            { setPage('login'); return }
      if (targetPage === 'employee-portal')  { setPage('employee-portal'); return }
      if (targetPage === 'admin')            { setPage('admin'); return }
    },
    [activeVerticalId, state]
  )

  async function handleLogin(email, password) {
  const result = await login(email, password)

  if (result.ok) {
    if (result.langPref) setLang(result.langPref)

    if (result.role === 'admin') {
      navigate('admin')
    } else {
      navigate('employee-portal')
    }
  }
}

  function handleLogout() {
    logout()
    navigate('landing')
  }

  const enrichedState = { ...state, totalModules: activeVertical?.modules?.length || 10 }

  return (
    <>
      <Navbar
        currentPage={page}
        activeVertical={activeVertical}
        onNavigate={navigate}
        currentEmployee={currentEmployee}
        isAdmin={isAdmin}
      />

      {/* ── Öffentlicher Flow ── */}
      {page === 'landing' && <LandingPage onNavigate={navigate} />}
      {page === 'vertical' && activeVertical && (
        <VerticalPage vertical={activeVertical} state={enrichedState} onNavigateFinal={() => navigate('final')} />
      )}
      {page === 'final' && (
        <FinalPage state={enrichedState} vertical={activeVertical} onBack={() => navigate('landing')} />
      )}

      {/* ── Mitarbeiter-Login ── */}
      {page === 'login' && (
        <EmployeeLogin onLogin={handleLogin} loginError={loginError} onClearError={() => setLoginError('')} />
      )}

      {/* ── Mitarbeiter-Portal (nur eingeloggt) ── */}
      {page === 'employee-portal' && currentEmployee && (
        <EmployeePortal employee={currentEmployee} onLogout={handleLogout} onNavigateLanding={() => navigate('landing')} />
      )}
      {page === 'employee-portal' && !currentEmployee && (
        <EmployeeLogin onLogin={handleLogin} loginError={loginError} onClearError={() => setLoginError('')} />
      )}

      {/* ── Admin-Panel (nur für Admins) ── */}
      {page === 'admin' && isAdmin && (
        <AdminPanel
          onBack={() => navigate('landing')}
          onEmployeeUpdated={refreshCurrentEmployee}
        />
      )}
      {page === 'admin' && !isAdmin && (
        <EmployeeLogin onLogin={handleLogin} loginError={loginError} onClearError={() => setLoginError('')} />
      )}

      {/* ── WhatsApp Floating Button ── */}
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <EmployeesProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </EmployeesProvider>
  )
}
