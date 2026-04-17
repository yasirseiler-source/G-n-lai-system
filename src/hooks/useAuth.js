import { useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * useAuth – Authentifizierung ueber Supabase `users`-Tabelle
 *
 * SICHERHEITSHINWEIS (Produktion):
 * - Passwoerter sollten serverseitig gehasht werden (bcrypt/argon2).
 * - Aktuell: Klartext-Passwortvergleich in der DB-Abfrage.
 */
export function useAuth() {
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [loginError, setLoginError] = useState('')

  async function login(email, password) {
    setLoginError('')

    if (!supabase) {
      setLoginError('errorCreds')
      console.error('[useAuth] Supabase nicht konfiguriert')
      return { ok: false }
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle()

    if (error) {
      console.error('[useAuth] Login-Abfrage fehlgeschlagen:', error)
      setLoginError('errorCreds')
      return { ok: false }
    }

    if (!data) {
      setLoginError('errorCreds')
      return { ok: false }
    }

    if (!data.is_active) {
      setLoginError('errorInactive')
      return { ok: false }
    }

    const mappedUser = {
      employeeId: data.id,
      fullName: data.name,
      email: data.email,
      role: data.role,
      isActive: data.is_active,
      commissionType: data.commission_type,
      commissionValue: Number(data.commission_value ?? 0),
      languagePreference: data.language_preference ?? 'de',
      createdAt: data.created_at,
    }

    setCurrentEmployee(mappedUser)

    return {
      ok: true,
      langPref: mappedUser.languagePreference,
      role: mappedUser.role,
    }
  }

  function logout() {
    setCurrentEmployee(null)
  }

  const isAdmin = currentEmployee?.role === 'admin'

  function refreshCurrentEmployee(updatedEmp) {
    if (updatedEmp && currentEmployee?.employeeId === updatedEmp.employeeId) {
      setCurrentEmployee(updatedEmp)
    }
  }

  return {
    currentEmployee,
    login,
    logout,
    loginError,
    setLoginError,
    isAdmin,
    refreshCurrentEmployee,
  }
}
