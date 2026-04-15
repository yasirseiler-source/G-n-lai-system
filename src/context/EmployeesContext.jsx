import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const EmployeesContext = createContext(null)

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function loadEmployees() {
      const { data, error } = await supabase
        .from('users')
        .select('id, created_at, name, email, role, commission_type, commission_value, is_active, language_preference')

      if (error) {
        console.error('[EmployeesContext] GET /users failed', error)
        return
      }

      const mapped = (data || []).map((user) => ({
        employeeId: user.id,
        fullName: user.name,
        username: user.email,
        role: user.role,
        isActive: user.is_active,
        commissionType: user.commission_type,
        commissionValue: Number(user.commission_value ?? 0),
        languagePreference: user.language_preference ?? 'de',
        createdAt: user.created_at,
      }))

      setEmployees(mapped)
    }

    loadEmployees()
  }, [])

  const addEmployee = useCallback((data) => {
    const newEmp = {
      ...data,
      commissionValue: Number(data.commissionValue),
      employeeId: `emp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    console.log('[EmployeesContext] POST /api/employees', {
      ...newEmp,
      _demoPassword: '***',
    })

    setEmployees((prev) => [...prev, newEmp])
    return newEmp
  }, [])

  const updateEmployee = useCallback(async (id, data) => {
    const updated = {
      ...data,
      commissionValue: Number(data.commissionValue),
    }

    const dbPayload = {
      name: updated.fullName,
      email: updated.username,
      role: updated.role,
      is_active: updated.isActive,
      commission_type: updated.commissionType,
      commission_value: updated.commissionValue,
      language_preference: updated.languagePreference,
    }

    const { error } = await supabase
      .from('users')
      .update(dbPayload)
      .eq('id', id)

    if (error) {
      console.error('[EmployeesContext] PATCH /users failed', error)
      return null
    }

    setEmployees((prev) =>
      prev.map((e) => (e.employeeId === id ? updated : e))
    )

    return updated
  }, [])

  const toggleActive = useCallback(async (id) => {
    const emp = employees.find((e) => e.employeeId === id)
    if (!emp) return

    const newStatus = !emp.isActive

    const { error } = await supabase
      .from('users')
      .update({ is_active: newStatus })
      .eq('id', id)

    if (error) {
      console.error('[EmployeesContext] PATCH is_active failed', error)
      return
    }

    setEmployees((prev) =>
      prev.map((e) =>
        e.employeeId === id ? { ...e, isActive: newStatus } : e
      )
    )
  }, [employees])

  const findByCredentials = useCallback((username, password) => {
    return (
      employees.find(
        (e) => e.username === username && e._demoPassword === password
      ) || null
    )
  }, [employees])

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        toggleActive,
        findByCredentials,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  )
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext)
  if (!ctx) throw new Error('useEmployees must be used within EmployeesProvider')
  return ctx
}
