import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [loginError, setLoginError] = useState('')

  async function login(email, password) {
    setLoginError('')

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (error || !data) {
      setLoginError('Login fehlgeschlagen')
      return { ok: false }
    }

    setCurrentEmployee(data)

    return {
  ok: true,
  langPref: 'de',
  role: data.role
    }
  }

  function logout() {
    setCurrentEmployee(null)
  }

  const isAdmin = currentEmployee?.role === 'admin'

  function refreshCurrentEmployee() {
    // später erweitern
  }

  return {
    currentEmployee,
    login,
    logout,
    loginError,
    setLoginError,
    isAdmin,
    refreshCurrentEmployee
  }
}
