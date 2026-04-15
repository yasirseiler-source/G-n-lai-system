import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * EmployeesContext – Mitarbeiter-State mit Supabase als Datenquelle
 *
 * Alle CRUD-Operationen schreiben direkt in die Supabase `users`-Tabelle.
 *
 * SICHERHEITSHINWEIS (Produktion):
 * - Passwoerter sollten serverseitig gehasht werden (bcrypt/argon2).
 * - Rollenpruefung sollte ueber RLS-Policies in Supabase erfolgen.
 */

const EmployeesContext = createContext(null)

/** Supabase-Zeile → Frontend-Objekt */
function mapUser(user) {
  return {
    employeeId: user.id,
    fullName: user.name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    commissionType: user.commission_type,
    commissionValue: Number(user.commission_value ?? 0),
    languagePreference: user.language_preference ?? 'de',
    createdAt: user.created_at,
  }
}

/** Frontend-Objekt → Supabase-Payload (ohne id/created_at) */
function toDbPayload(data, includePassword = false) {
  const payload = {
    name: data.fullName,
    email: data.email,
    role: data.role,
    is_active: data.isActive !== false,
    commission_type: data.commissionType,
    commission_value: Number(data.commissionValue),
    language_preference: data.languagePreference || 'de',
  }
  if (includePassword && data.password) {
    payload.password = data.password
  }
  return payload
}

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function loadEmployees() {
      if (!supabase) return

      const { data, error } = await supabase
        .from('users')
        .select('id, created_at, name, email, role, commission_type, commission_value, is_active, language_preference')

      if (error) {
        console.error('[EmployeesContext] Laden fehlgeschlagen:', error)
        return
      }

      setEmployees((data || []).map(mapUser))
    }

    loadEmployees()
  }, [])

  /**
   * Mitarbeiter hinzufuegen – INSERT in Supabase
   */
  const addEmployee = useCallback(async (data) => {
    if (!supabase) return null
    const dbPayload = toDbPayload(data, true)

    const { data: inserted, error } = await supabase
      .from('users')
      .insert(dbPayload)
      .select()
      .single()

    if (error) {
      console.error('[EmployeesContext] INSERT fehlgeschlagen:', error)
      return null
    }

    const mapped = mapUser(inserted)
    setEmployees(prev => [...prev, mapped])
    return mapped
  }, [])

  /**
   * Mitarbeiter aktualisieren – UPDATE in Supabase
   */
  const updateEmployee = useCallback(async (id, data) => {
    if (!supabase) return null
    const dbPayload = toDbPayload(data, !!data.password)

    const { error } = await supabase
      .from('users')
      .update(dbPayload)
      .eq('id', id)

    if (error) {
      console.error('[EmployeesContext] UPDATE fehlgeschlagen:', error)
      return null
    }

    const updated = {
      employeeId: id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      isActive: data.isActive !== false,
      commissionType: data.commissionType,
      commissionValue: Number(data.commissionValue),
      languagePreference: data.languagePreference || 'de',
      createdAt: data.createdAt,
    }

    setEmployees(prev => prev.map(e =>
      e.employeeId === id ? updated : e
    ))

    return updated
  }, [])

  /**
   * Aktivieren / Deaktivieren – UPDATE is_active in Supabase
   */
  const toggleActive = useCallback(async (id) => {
    const emp = employees.find(e => e.employeeId === id)
    if (!emp || !supabase) return

    const newStatus = !emp.isActive

    const { error } = await supabase
      .from('users')
      .update({ is_active: newStatus })
      .eq('id', id)

    if (error) {
      console.error('[EmployeesContext] Toggle-Status fehlgeschlagen:', error)
      return
    }

    setEmployees(prev => prev.map(e =>
      e.employeeId === id ? { ...e, isActive: newStatus } : e
    ))
  }, [employees])

  return (
    <EmployeesContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      toggleActive,
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
