import { useTranslation } from '../../i18n/LanguageContext'
import Icon from '../ui/Icon'
import CompanySection from './sections/CompanySection'
import BuildingSection from './sections/BuildingSection'
import PeopleSection from './sections/PeopleSection'
import InfraSection from './sections/InfraSection'
import NeedsSection from './sections/NeedsSection'
import BudgetSection from './sections/BudgetSection'
import styles from './CustomerForm.module.css'
import { useState, useMemo } from 'react'

const COMPLETION_KEYS = [
  ['firmenname'],
  ['gesamtflaeche', 'anzahlRaeume'],
  ['anzahlMitarbeiter'],
  [],
  ['sicherheitsbedarf'],
  ['budgetrahmen'],
]

export default function CustomerForm({ formData, onUpdate, vertical }) {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)

  const steps = useMemo(() => [
    { label: t('builder', 'step1'), sub: t('builder', 'step1sub'), comp: <CompanySection  formData={formData} onUpdate={onUpdate} verticalId={vertical?.id} /> },
    { label: t('builder', 'step2'), sub: t('builder', 'step2sub'), comp: <BuildingSection formData={formData} onUpdate={onUpdate} /> },
    { label: t('builder', 'step3'), sub: t('builder', 'step3sub'), comp: <PeopleSection   formData={formData} onUpdate={onUpdate} /> },
    { label: t('builder', 'step4'), sub: t('builder', 'step4sub'), comp: <InfraSection    formData={formData} onUpdate={onUpdate} /> },
    { label: t('builder', 'step5'), sub: t('builder', 'step5sub'), comp: <NeedsSection    formData={formData} onUpdate={onUpdate} /> },
    { label: t('builder', 'step6'), sub: t('builder', 'step6sub'), comp: <BudgetSection   formData={formData} onUpdate={onUpdate} /> },
  ], [t, formData, onUpdate, vertical?.id])

  const isComplete = (idx) => {
    const keys = COMPLETION_KEYS[idx]
    if (!keys || keys.length === 0) return false
    return keys.every(k => formData[k] && String(formData[k]).trim() !== '')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('builder', 'formTitle')}</h2>
        <p className={styles.helper}>{t('builder', 'formHelper')}</p>
      </div>

      {/* Step navigation */}
      <div className={styles.stepNav}>
        {steps.map((step, idx) => {
          const done = isComplete(idx)
          const active = idx === activeStep
          return (
            <button
              key={idx}
              className={`${styles.step} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className={styles.stepNum}>
                {done ? <Icon name="check" size={10} color="var(--ctx-accent, var(--primary))" /> : String(idx + 1).padStart(2, '0')}
              </div>
              <div className={styles.stepText}>
                <span className={styles.stepLabel}>{step.label}</span>
                <span className={styles.stepSub}>{step.sub}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
      </div>

      {/* Active step content */}
      <div className={styles.body}>
        {steps[activeStep]?.comp}
      </div>
    </div>
  )
}
