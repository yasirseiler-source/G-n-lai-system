import { useState, useCallback } from 'react'
import { useEmployees } from '../context/EmployeesContext'
import { sanitizeEmployee } from '../data/employees'

/**
 * useAuth – Authentifizierungs-Hook (Frontend-Demo)
 *
 * ⚠️ SICHERHEITSHINWEIS:
 * - Login läuft lokal gegen den EmployeesContext – NUR für Demo.
 * - Im Produktionsbetrieb:
 *   POST /api/auth/login → JWT / HttpOnly-Cookie
 *   Jede geschützte Anfrage mit Token absichern
 *   Provision + Rolle IMMER serverseitig prüfen
 *
 * TODO: fetch('POST /api/auth/login', { username, password })
 *       → { token, employee: { employeeId, fullName, role, ... } }
 */
export function useAuth() {
  const { findByCredentials } = useEmployees()
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [loginError, setLoginError]           = useState('')

  const login = useCallback((username, password) => {
    // Demo: lokaler Abgleich via EmployeesContext (inkl. neu angelegter Mitarbeiter)
    // TODO (Backend): POST /api/auth/login
    const found = findByCredentials(username, password)

    if (!found) {
      setLoginError('errorCreds')
      return { ok: false }
    }
    if (!found.isActive) {
      setLoginError('errorInactive')
      return { ok: false }
    }

    const safe = sanitizeEmployee(found)
    setCurrentEmployee(safe)
    setLoginError('')
    return { ok: true, langPref: safe.languagePreference }
  }, [findByCredentials])

  const logout = useCallback(() => {
    setCurrentEmployee(null)
    setLoginError('')
    // TODO (Backend): POST /api/auth/logout → Token invalidieren
  }, [])

  /**
   * Aktualisierten Mitarbeiter nach Admin-Bearbeitung in Session übernehmen.
   * Wird von AdminPanel aufgerufen wenn der eingeloggte Admin sich selbst bearbeitet.
   */
  const refreshCurrentEmployee = useCallback((updatedEmp) => {
    if (currentEmployee && updatedEmp.employeeId === currentEmployee.employeeId) {
      setCurrentEmployee(sanitizeEmployee(updatedEmp))
    }
  }, [currentEmployee])

  return {
    currentEmployee,
    login,
    logout,
    loginError,
    setLoginError,
    isAdmin:    currentEmployee?.role === 'admin',
    isLoggedIn: currentEmployee !== null,
    refreshCurrentEmployee,
  }
}
