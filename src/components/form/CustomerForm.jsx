import { useTranslation } from '../../i18n/LanguageContext'
import Icon from '../ui/Icon'
import CompanySection from './sections/CompanySection'
import BuildingSection from './sections/BuildingSection'
import PeopleSection from './sections/PeopleSection'
import InfraSection from './sections/InfraSection'
import NeedsSection from './sections/NeedsSection'
import BudgetSection from './sections/BudgetSection'
import styles from './CustomerForm.module.css'
import { useState } from 'react'

export default function CustomerForm({ formData, onUpdate, vertical }) {
  const { t } = useTranslation()
  const [openSection, setOpenSection] = useState('company')

  const sections = [
    { id: 'company',   label: t('form', 'company'),  icon: 'briefcase',   comp: <CompanySection  formData={formData} onUpdate={onUpdate} verticalId={vertical?.id} /> },
    { id: 'building',  label: t('form', 'building'), icon: 'grid',        comp: <BuildingSection formData={formData} onUpdate={onUpdate} /> },
    { id: 'people',    label: t('form', 'people'),   icon: 'users',       comp: <PeopleSection   formData={formData} onUpdate={onUpdate} /> },
    { id: 'infra',     label: t('form', 'infra'),    icon: 'settings',    comp: <InfraSection    formData={formData} onUpdate={onUpdate} /> },
    { id: 'needs',     label: t('form', 'needs'),    icon: 'target',      comp: <NeedsSection    formData={formData} onUpdate={onUpdate} /> },
    { id: 'budget',    label: t('form', 'budget'),   icon: 'dollar',      comp: <BudgetSection   formData={formData} onUpdate={onUpdate} /> },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.label}>
          <Icon name="file" size={14} color="var(--text-muted)" />
          <span>{t('form', 'title')}</span>
        </div>
      </div>

      <div className={styles.accordion}>
        {sections.map(({ id, label, icon, comp }, idx) => {
          const open = openSection === id
          return (
            <div key={id} className={`${styles.item} ${open ? styles.open : ''}`}>
              <button className={styles.header} onClick={() => setOpenSection(open ? null : id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <span className={styles.stepNum}>{String(idx + 1).padStart(2, '0')}</span>
                  <Icon name={icon} size={13} color={open ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span className={styles.headerLabel}>{label}</span>
                </div>
                <Icon name="chevronRight" size={13} color="var(--text-muted)" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              {open && <div className={styles.body}>{comp}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
