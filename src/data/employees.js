/**
 * LEGACY / REFERENZ – Diese Datei wird im aktiven Code NICHT importiert.
 *
 * Mitarbeiterdaten werden aus der Supabase `users`-Tabelle geladen
 * (siehe src/context/EmployeesContext.jsx und src/hooks/useAuth.js).
 *
 * Diese Demo-Daten dienen nur noch als Referenz fuer die Datenstruktur.
 */

export const employees = [
  {
    employeeId:         'emp-001',
    fullName:           'Anna Müller',
    username:           'anna',
    // ⚠️ Passwort NIEMALS im Frontend – nur für Demo-Vergleich
    // Produktion: bcrypt/argon2 Hash serverseitig
    _demoPassword:      'demo123',
    role:               'admin',     // 'admin' | 'sales' | 'support'
    isActive:           true,
    commissionType:     'percent',   // 'percent' | 'fixed'
    commissionValue:    5,           // 5% pro Lead
    languagePreference: 'de',        // 'tr' | 'de' | 'en'
    createdAt:          '2024-01-15T08:00:00.000Z',
  },
  {
    employeeId:         'emp-002',
    fullName:           'Kemal Yıldız',
    username:           'kemal',
    _demoPassword:      'demo456',
    role:               'sales',
    isActive:           true,
    commissionType:     'fixed',
    commissionValue:    50,          // 50€ pro Lead
    languagePreference: 'tr',
    createdAt:          '2024-02-10T09:30:00.000Z',
  },
  {
    employeeId:         'emp-003',
    fullName:           'Sophie Wagner',
    username:           'sophie',
    _demoPassword:      'demo789',
    role:               'sales',
    isActive:           true,
    commissionType:     'percent',
    commissionValue:    7,           // 7% pro Lead
    languagePreference: 'de',
    createdAt:          '2024-03-05T10:00:00.000Z',
  },
  {
    employeeId:         'emp-004',
    fullName:           'John Smith',
    username:           'john',
    _demoPassword:      'demo000',
    role:               'support',
    isActive:           false,       // Deaktiviertes Konto
    commissionType:     'fixed',
    commissionValue:    25,
    languagePreference: 'en',
    createdAt:          '2024-04-01T11:00:00.000Z',
  },
]

/**
 * Hilfsfunktion: Sicheres Mitarbeiterobjekt (ohne _demoPassword)
 * Wird nach erfolgreichem Login in den Auth-State gespeichert.
 */
export function sanitizeEmployee(emp) {
  const { _demoPassword, ...safe } = emp
  return safe
}

/**
 * TODO (Backend): Neue Mitarbeiter-Struktur für POST /api/employees
 *
 * {
 *   fullName:           string (required)
 *   username:           string (required, unique)
 *   password:           string (required, min 8 chars – wird serverseitig gehasht)
 *   role:               'admin' | 'sales' | 'support'
 *   isActive:           boolean (default: true)
 *   commissionType:     'percent' | 'fixed'
 *   commissionValue:    number (>= 0)
 *   languagePreference: 'tr' | 'de' | 'en'
 * }
 */
