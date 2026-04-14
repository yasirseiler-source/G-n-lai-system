import { createContext, useContext, useState, useCallback } from 'react'
import { employees as initialEmployees } from '../data/employees'

/**
 * EmployeesContext – Gemeinsamer Mitarbeiter-State für AdminPanel + useAuth
 *
 * ⚠️ SICHERHEITSHINWEIS:
 * - Daten leben nur im React-State (Reload = Reset auf Demo-Daten).
 * - Im Produktionsbetrieb:
 *   GET    /api/employees   → initiale Liste laden
 *   POST   /api/employees   → neuen Mitarbeiter anlegen
 *   PATCH  /api/employees/:id → Mitarbeiter aktualisieren
 * - Passwörter MÜSSEN serverseitig mit bcrypt/argon2 gehasht werden.
 * - Rollenprüfung MUSS serverseitig erfolgen.
 */

const EmployeesContext = createContext(null)

export function EmployeesProvider({ children }) {
  // TODO (Backend): GET /api/employees → initiale Liste aus DB laden
  const [employees, setEmployees] = useState(() =>
    initialEmployees.map(e => ({ ...e }))
  )

  /**
   * Mitarbeiter hinzufügen
   * TODO (Backend): POST /api/employees → gibt neue employeeId + createdAt zurück
   */
  const addEmployee = useCallback((data) => {
    const newEmp = {
      ...data,
      commissionValue: Number(data.commissionValue),
      employeeId: `emp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    console.log('[EmployeesContext] POST /api/employees', {
      ...newEmp,
      _demoPassword: '***', // Passwort nicht loggen
    })
    setEmployees(prev => [...prev, newEmp])
    return newEmp
  }, [])

  /**
   * Mitarbeiter aktualisieren
   * TODO (Backend): PATCH /api/employees/:id
   * - Provision MUSS serverseitig aus DB gelesen werden
   * - Passwort MUSS serverseitig gehasht gespeichert werden
   */
  const updateEmployee = useCallback((id, data) => {
    const updated = {
      ...data,
      commissionValue: Number(data.commissionValue),
    }
    console.log('[EmployeesContext] PATCH /api/employees/' + id, {
      ...updated,
      _demoPassword: updated._demoPassword ? '***' : undefined,
    })
    setEmployees(prev => prev.map(e =>
      e.employeeId === id ? updated : e
    ))
    return updated
  }, [])

  /**
   * Aktivieren / Deaktivieren
   * TODO (Backend): PATCH /api/employees/:id { isActive }
   */
  const toggleActive = useCallback((id) => {
    setEmployees(prev => prev.map(e =>
      e.employeeId === id ? { ...e, isActive: !e.isActive } : e
    ))
  }, [])

  /**
   * Mitarbeiter per Login-Daten finden
   * ⚠️ Nur Demo – Produktionsbetrieb: POST /api/auth/login → Token
   */
  const findByCredentials = useCallback((username, password) => {
    return employees.find(
      e => e.username === username && e._demoPassword === password
    ) || null
  }, [employees])

  return (
    <EmployeesContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      toggleActive,
      findByCredentials,
    }}>
      {children}
    </EmployeesContext.Provider>
  )
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext)
  if (!ctx) throw new Error('useEmployees must be used within EmployeesProvider')
  return ctx
}
