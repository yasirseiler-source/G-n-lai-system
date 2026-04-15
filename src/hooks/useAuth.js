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
      .maybeSingle()

    if (!data) {
      setLoginError('Login fehlgeschlagen')
      return { ok: false }
    }

    const mappedUser = {
  employeeId: data.id,
  fullName: data.name,
  username: data.email,
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
