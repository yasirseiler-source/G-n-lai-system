import { useState } from 'react'
import Icon from '../ui/Icon'
import { useTranslation } from '../../i18n/LanguageContext'
import { useEmployees } from '../../context/EmployeesContext'
import styles from './AdminPanel.module.css'

/**
 * Admin-Panel – Mitarbeiterverwaltung
 *
 * ⚠️ SICHERHEITSHINWEIS:
 * - Alle Änderungen gehen über EmployeesContext (React-State).
 * - Bei Reload werden Änderungen zurückgesetzt (Demo-Modus).
 * - Im Produktionsbetrieb:
 *   GET    /api/employees          → initiale Liste
 *   POST   /api/employees          → neuen Mitarbeiter anlegen
 *   PATCH  /api/employees/:id      → Mitarbeiter aktualisieren
 * - Passwörter MÜSSEN serverseitig mit bcrypt/argon2 gespeichert werden.
 * - Zugriff NUR nach serverseitiger Rollenprüfung erlauben.
 */

const ROLES = ['admin', 'sales', 'support']
const LANGS = ['tr', 'de', 'en']

function emptyForm() {
  return {
    fullName: '', username: '', _demoPassword: '',
    role: 'sales', isActive: true,
    commissionType: 'percent', commissionValue: 5,
    languagePreference: 'tr',
  }
}

function validate(data, isEdit = false) {
  const errors = {}
  if (!data.fullName?.trim())    errors.fullName = true
  if (!data.username?.trim())    errors.username = true
  if (!isEdit && !data._demoPassword?.trim()) errors._demoPassword = true
  if (
    data.commissionValue === '' ||
    isNaN(Number(data.commissionValue)) ||
    Number(data.commissionValue) < 0
  ) errors.commissionValue = true
  return errors
}

export default function AdminPanel({ onBack, onEmployeeUpdated }) {
  const { t } = useTranslation()
  const { employees, addEmployee, updateEmployee, toggleActive } = useEmployees()

  // panel: null | { mode: 'add' | 'edit', data: {...} }
  const [panel, setPanel]   = useState(null)
  const [errors, setErrors] = useState({})
  const [saved, setSaved]   = useState(null) // employeeId nach Speichern → grüner Rahmen

  // ── Panel öffnen / schließen ──
  function openAdd() {
    setPanel({ mode: 'add', data: emptyForm() })
    setErrors({})
  }

  function openEdit(emp) {
    setPanel({ mode: 'edit', data: { ...emp, _demoPassword: emp._demoPassword || '' } })
    setErrors({})
  }

  function closePanel() { setPanel(null); setErrors({}) }

  function setField(key, val) {
    setPanel(p => ({ ...p, data: { ...p.data, [key]: val } }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: false }))
  }

  // ── Speichern ──
  function handleSave() {
    const isEdit = panel.mode === 'edit'
    const errs   = validate(panel.data, isEdit)
    if (Object.keys(errs).length) { setErrors(errs); return }

    if (isEdit) {
      // Passwort beibehalten wenn Feld leer
      const existing    = employees.find(e => e.employeeId === panel.data.employeeId)
      const passwordVal = panel.data._demoPassword?.trim()
        ? panel.data._demoPassword
        : existing?._demoPassword || ''

      const updated = updateEmployee(panel.data.employeeId, {
        ...panel.data,
        _demoPassword: passwordVal,
      })
      // Eingeloggter Admin soll seinen eigenen State sofort aktualisiert sehen
      onEmployeeUpdated?.(updated)
      setSaved(updated.employeeId)
    } else {
      const newEmp = addEmployee(panel.data)
      setSaved(newEmp.employeeId)
    }

    setTimeout(() => setSaved(null), 2500)
    closePanel()
  }

  // ── Stats ──
  const totalCount  = employees.length
  const activeCount = employees.filter(e => e.isActive).length
  const adminCount  = employees.filter(e => e.role === 'admin').length

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.pageHeader}>
          <button className={styles.backLink} onClick={onBack}>
            <Icon name="chevronRight" size={13} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
            {t('common', 'back')}
          </button>
          <div className={styles.headerText}>
            <h1 className={styles.pageTitle}>{t('admin', 'title')}</h1>
            <p className={styles.pageSub}>{t('admin', 'subtitle')}</p>
          </div>
          <button className={styles.addBtn} onClick={openAdd}>
            <Icon name="plus" size={14} color="#fff" />
            {t('admin', 'addEmployee')}
          </button>
        </div>

        {/* ── Stats-Leiste (live aus Context) ── */}
        <div className={styles.statsBar}>
          <StatItem label={t('admin', 'statTotal')}  value={totalCount}  color="var(--primary)" />
          <StatItem label={t('admin', 'statActive')} value={activeCount} color="var(--status-green)" />
          <StatItem label={t('admin', 'statAdmins')} value={adminCount}  color="var(--status-red)" />
        </div>

        {/* ── API-Hinweis ── */}
        <div className={styles.secNote}>
          <Icon name="info" size={12} color="var(--text-muted)" />
          <span>{t('admin', 'secNote')}</span>
          <code>POST /api/employees · PATCH /api/employees/:id</code>
        </div>

        {/* ── Mitarbeiterliste ── */}
        {employees.length === 0 ? (
          <div className={styles.empty}>{t('admin', 'noEmployees')}</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('admin', 'fullName')}</th>
                  <th>{t('admin', 'username')}</th>
                  <th>{t('admin', 'role')}</th>
                  <th>{t('admin', 'status')}</th>
                  <th>{t('admin', 'commissionType')}</th>
                  <th>{t('admin', 'commissionValue')}</th>
                  <th>{t('admin', 'language')}</th>
                  <th>{t('admin', 'actions')}</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr
                    key={emp.employeeId}
                    className={[
                      !emp.isActive  ? styles.inactiveRow : '',
                      saved === emp.employeeId ? styles.savedRow : '',
                    ].join(' ')}
                  >
                    <td>
                      <div className={styles.nameCell}>
                        <strong>{emp.fullName}</strong>
                        <span className={styles.empIdBadge}>{emp.employeeId}</span>
                      </div>
                    </td>
                    <td><code className={styles.code}>{emp.username}</code></td>
                    <td><RoleBadge role={emp.role} t={t} /></td>
                    <td>
                      <span className={`${styles.statusBadge} ${emp.isActive ? styles.statusActive : styles.statusInactive}`}>
                        {emp.isActive ? t('admin', 'active') : t('admin', 'inactive')}
                      </span>
                    </td>
                    <td>
                      {emp.commissionType === 'percent' ? t('admin', 'percent') : t('admin', 'fixed')}
                    </td>
                    <td>
                      <span className={styles.commValue}>
                        {emp.commissionType === 'percent'
                          ? `${emp.commissionValue}%`
                          : `${emp.commissionValue}€`}
                      </span>
                    </td>
                    <td>{emp.languagePreference?.toUpperCase()}</td>
                    <td>
                      <div className={styles.actionCell}>
                        <button className={styles.editBtn} onClick={() => openEdit(emp)}>
                          {t('admin', 'editBtn')}
                        </button>
                        <button
                          className={emp.isActive ? styles.deactivateBtn : styles.activateBtn}
                          onClick={() => toggleActive(emp.employeeId)}
                        >
                          {emp.isActive ? t('admin', 'deactivateBtn') : t('admin', 'activateBtn')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Side-Panel: Anlegen / Bearbeiten ── */}
      {panel && (
        <>
          <div className={styles.overlay} onClick={closePanel} />
          <div className={styles.sidePanel}>

            <div className={styles.sidePanelHead}>
              <span className={styles.sidePanelTitle}>
                {panel.mode === 'add' ? t('admin', 'addEmployee') : t('admin', 'editEmployee')}
              </span>
              <button className={styles.closeBtn} onClick={closePanel} aria-label="Schließen">
                <Icon name="x" size={14} color="var(--text-muted)" />
              </button>
            </div>

            <div className={styles.sidePanelBody}>

              <FormField label={t('admin', 'fullName')} error={errors.fullName}>
                <input
                  className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                  value={panel.data.fullName}
                  onChange={e => setField('fullName', e.target.value)}
                  placeholder="Max Mustermann"
                />
              </FormField>

              <FormField label={t('admin', 'username')} error={errors.username}>
                <input
                  className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                  value={panel.data.username}
                  onChange={e => setField('username', e.target.value)}
                  placeholder="max.muster"
                  autoComplete="off"
                />
              </FormField>

              <FormField
                label={panel.mode === 'edit' ? t('admin', 'newPassword') : t('admin', 'password')}
                error={errors._demoPassword}
                note={panel.mode === 'edit'
                  ? t('admin', 'passwordEditNote')
                  : t('admin', 'passwordNote')}
              >
                <input
                  className={`${styles.input} ${errors._demoPassword ? styles.inputError : ''}`}
                  type="password"
                  value={panel.data._demoPassword}
                  onChange={e => setField('_demoPassword', e.target.value)}
                  placeholder={panel.mode === 'edit' ? t('admin', 'passwordEditPlaceholder') : ''}
                  autoComplete="new-password"
                />
              </FormField>

              <FormField label={t('admin', 'role')}>
                <select
                  className={styles.select}
                  value={panel.data.role}
                  onChange={e => setField('role', e.target.value)}
                >
                  {ROLES.map(r => (
                    <option key={r} value={r}>
                      {t('admin', r === 'admin' ? 'roleAdmin' : r === 'sales' ? 'roleSales' : 'roleSupport')}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Provision – nur hier festlegbar */}
              <div className={styles.commSection}>
                <div className={styles.commSectionTitle}>
                  <Icon name="tag" size={12} color="var(--primary)" />
                  {t('admin', 'commissionType')}
                </div>
                <div className={styles.row2}>
                  <FormField label={t('admin', 'commissionType')}>
                    <select
                      className={styles.select}
                      value={panel.data.commissionType}
                      onChange={e => setField('commissionType', e.target.value)}
                    >
                      <option value="percent">{t('admin', 'percent')}</option>
                      <option value="fixed">{t('admin', 'fixed')}</option>
                    </select>
                  </FormField>

                  <FormField label={t('admin', 'commissionValue')} error={errors.commissionValue}>
                    <div className={styles.commInput}>
                      <input
                        className={`${styles.input} ${errors.commissionValue ? styles.inputError : ''}`}
                        type="number"
                        min="0"
                        step="0.5"
                        value={panel.data.commissionValue}
                        onChange={e => setField('commissionValue', e.target.value)}
                      />
                      <span className={styles.commUnit}>
                        {panel.data.commissionType === 'percent' ? '%' : '€'}
                      </span>
                    </div>
                  </FormField>
                </div>
                <div className={styles.commNote}>
                  <Icon name="info" size={11} color="var(--primary)" />
                  <span>{t('admin', 'commissionNote')}</span>
                </div>
              </div>

              <FormField label={t('admin', 'language')}>
                <select
                  className={styles.select}
                  value={panel.data.languagePreference}
                  onChange={e => setField('languagePreference', e.target.value)}
                >
                  {LANGS.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                </select>
              </FormField>

              {panel.mode === 'edit' && (
                <FormField label={t('admin', 'status')}>
                  <select
                    className={styles.select}
                    value={panel.data.isActive ? 'true' : 'false'}
                    onChange={e => setField('isActive', e.target.value === 'true')}
                  >
                    <option value="true">{t('admin', 'active')}</option>
                    <option value="false">{t('admin', 'inactive')}</option>
                  </select>
                </FormField>
              )}
            </div>

            <div className={styles.sidePanelFoot}>
              <button className={styles.saveBtn} onClick={handleSave}>
                <Icon name="check" size={13} color="#fff" />
                {t('admin', 'saveBtn')}
              </button>
              <button className={styles.cancelBtn} onClick={closePanel}>
                {t('admin', 'cancelBtn')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Sub-Komponenten ──
function StatItem({ label, value, color }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue} style={{ color }}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

function FormField({ label, children, error, note }) {
  return (
    <div className={styles.formField}>
      <label className={`${styles.fieldLabel} ${error ? styles.fieldLabelError : ''}`}>{label}</label>
      {children}
      {note && <span className={styles.fieldNote}>{note}</span>}
    </div>
  )
}

function RoleBadge({ role, t }) {
  const map   = { admin: 'roleAdmin', sales: 'roleSales', support: 'roleSupport' }
  const color = { admin: styles.roleAdmin, sales: styles.roleSales, support: styles.roleSupport }
  return (
    <span className={`${styles.roleBadge} ${color[role] || ''}`}>
      {t('admin', map[role] || 'roleSales')}
    </span>
  )
}
