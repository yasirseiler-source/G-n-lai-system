import { useTranslation } from '../../i18n/LanguageContext'
import styles from './KPICards.module.css'

export default function KPICards({ vertical, values, onChange }) {
  const { t } = useTranslation()

  // Get KPI label translations
  const getKPILabel = (kpi) => {
    const keyMap = {
      // Davranış KPIs
      'Toplam öğrenci sayısı': 'totalStudents',
      'Öğretmen sayısı': 'teacherCount',
      'Sınıf sayısı': 'classCount',
      'Günlük olay sayısı': 'dailyEvents',
      'Kritik sosyal durumlar': 'criticalSocial',
      // Tehlike KPIs
      'Günlük ziyaretçi sayısı': 'dailyVisitors',
      'Güvenlik personeli': 'securityStaff',
      'Kritik bölgeler': 'criticalZones',
      'Olay geçmişi': 'incidentHistory',
      'Acil durum noktaları': 'emergencyPoints',
      // Alan KPIs
      'Giriş sayısı': 'entryCount',
      'Kamera bölgeleri': 'cameraZones',
      'Ziyaretçi akışı': 'visitorFlow',
      'Kritik yapısal noktalar': 'criticalStructural',
      'Alan büyüklüğü': 'areaSize',
    }
    
    // For now, return the original label since we don't have KPI translations yet
    // You can add KPI translations to translations.js later if needed
    return kpi.label
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{t('kpi', 'title')}</h3>
      <p className={styles.helper}>{t('builder', 'kpiHelper')}</p>
      
      <div className={styles.grid}>
        {vertical.kpis.map((kpi) => {
          const value = values[kpi.key] || ''
          const label = getKPILabel(kpi)
          
          return (
            <div key={kpi.key} className={styles.card}>
              <label className={styles.label}>
                <span className={styles.icon}>{kpi.icon}</span>
                {label}
              </label>
              <input
                type="number"
                min="0"
                value={value}
                onChange={(e) => onChange(kpi.key, e.target.value)}
                className={styles.input}
                placeholder="0"
              />
              {kpi.unit && <span className={styles.unit}>{kpi.unit}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
