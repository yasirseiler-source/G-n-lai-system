import { useTranslation } from '../../i18n/LanguageContext'
import styles from './ModuleSelector.module.css'

export default function ModuleSelector({ vertical, selected, onToggle }) {
  const { t } = useTranslation()
  
  const getModuleTranslation = (moduleName, type = 'name') => {
    const category = vertical.id === 'davranis' ? 'modules_davranis' :
                    vertical.id === 'tehlike' ? 'modules_tehlike' : 'modules_alan'
    
    const keyMap = {
      'Davranış Analizi': 'davranisAnalizi',
      'Grup Dinamikleri': 'grupDinamikleri',
      'Çatışma Tespiti': 'catismaTespiti',
      'Zorbalık Sinyalleri': 'zorbalikSinyalleri',
      'Duygusal Durum': 'duygusalDurum',
      'Öğretmen Bildirim Sistemi': 'ogretmenBildirim',
      'Müdür Yönlendirmesi': 'mudurYonlendirmesi',
      'Sınıf Yönetimi': 'sinifYonetimi',
      'Öğrenci Takip': 'ogrenciTakip',
      'Sosyal Risk Haritası': 'sosyalRiskHaritasi',
      'Davranış Trendleri': 'davranisTrendleri',
      'Duygusal Yoğunluk': 'duygusalYogunluk',
      'Şiddet Tespiti': 'siddetTespiti',
      'Hırsızlık Tespiti': 'hirsizlikTespiti',
      'Eskalasyon Analizi': 'eskalasyonAnalizi',
      'Tehdit Seviyesi': 'tehditSeviyesi',
      'Acil Durum Algılama': 'acilDurumAlgilama',
      'Güvenlik Bildirimleri': 'guvenlikBildirimleri',
      'Olay Yönetimi': 'olayYonetimi',
      'Risk Seviyesi': 'riskSeviyesi',
      'Tehlike Haritası': 'tehlikeHaritasi',
      'Şüpheli Davranış': 'supheliDavranis',
      'Giriş‑Çıkış Kontrolü': 'girisCikisKontrolu',
      'Alan Isı Haritası': 'alanIsiHaritasi',
      'Kamera Bölgeleri': 'kameraBolgeleri',
      'Alan Yönetimi': 'alanYonetimi',
      'Ziyaretçi Kayıt': 'ziyaretciKayit',
      'Bölge Kullanımı': 'bolgeKullanimi',
      'Yapısal Riskler': 'yapisalRiskler',
      'Bölge Güvenliği': 'bolgeGuvenligi',
      'Hareket Yolları': 'hareketYollari',
    }
    
    if (moduleName === 'Ziyaretçi Akışı') {
      const key = category === 'modules_alan' ? 'ziyaretciAkisiAlan' : 'ziyaretciAkisi'
      return t(category, type === 'desc' ? key + 'Desc' : key) || moduleName
    }
    
    const key = keyMap[moduleName]
    if (!key) return moduleName
    
    return t(category, type === 'desc' ? key + 'Desc' : key) || moduleName
  }

  const groups = {
    recommended: vertical.modules.filter(m => m.group === 'recommended'),
    operation: vertical.modules.filter(m => m.group === 'operation'),
    security: vertical.modules.filter(m => m.group === 'security'),
  }

  const activeCount = selected.length
  const totalCount = vertical.modules.length

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('builder', 'modulesTitle')}</h3>
        <span className={styles.badge}>
          {activeCount} / {totalCount} {t('selector', 'activeOf')}
        </span>
      </div>

      {Object.entries(groups).map(([groupKey, modules]) => (
        <div key={groupKey} className={styles.group}>
          <h4 className={styles.groupTitle}>
            {t('builder', groupKey === 'recommended' ? 'groupRecommended' : 
               groupKey === 'operation' ? 'groupOperation' : 'groupSecurity')}
          </h4>
          <div className={styles.grid}>
            {modules.map((module) => {
              const isActive = selected.includes(module.name)
              const translatedName = getModuleTranslation(module.name, 'name')
              const translatedDesc = getModuleTranslation(module.name, 'desc')
              
              return (
                <button
                  key={module.name}
                  className={`${styles.card} ${isActive ? styles.active : ''}`}
                  onClick={() => onToggle(module.name)}
                >
                  <div className={styles.cardHeader}>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => {}}
                      className={styles.checkbox}
                    />
                    <span className={`${styles.status} ${isActive ? styles.statusActive : ''}`}>
                      {isActive ? t('selector', 'active') : t('selector', 'inactive')}
                    </span>
                  </div>
                  <h5 className={styles.cardTitle}>{translatedName}</h5>
                  <p className={styles.cardDesc}>{translatedDesc}</p>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
import { useState } from 'react'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './SensorSelector.module.css'

export default function SensorSelector({ vertical, sensors, onChange, rooms = 1 }) {
  const { t } = useTranslation()
  const [mode, setMode] = useState('auto')

  const getSensorTranslation = (sensorName, type = 'name') => {
    const keyMap = {
      'Kamera (davranış)': 'kameraDavranis',
      'Ses analizi': 'sesAnalizi',
      'Hareket sensörü': 'hareketSensoru',
      'Kapı sensörü': 'kapiSensoru',
      'Kamera (güvenlik)': 'kameraGuvenlik',
      'Alarm sensörü': 'alarmSensoru',
      'Erişim kontrolü': 'erisimKontrolu',
      'Acil durum butonu': 'acilDurumButonu',
      'Alan doluluk sensörü': 'alanDolulukSensoru',
      'Ortam iklim sensörü': 'ortamIklimSensoru',
      'Giriş alanı kamerası': 'girisAlaniKamerasi',
    }
    
    const key = keyMap[sensorName]
    if (!key) return sensorName
    
    return t('sensors', type === 'desc' ? key + 'Desc' : key) || sensorName
  }

  const handleToggle = (name) => {
    const current = sensors.find(s => s.name === name)
    if (current) {
      onChange(sensors.filter(s => s.name !== name))
    } else {
      const sensorDef = vertical.sensors.find(s => s.name === name)
      const autoQty = Math.ceil(rooms * (sensorDef?.autoCount || 1))
      onChange([...sensors, { name, qty: autoQty }])
    }
  }

  const handleQtyChange = (name, qty) => {
    const val = parseInt(qty) || 0
    onChange(sensors.map(s => s.name === name ? { ...s, qty: val } : s))
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('selector', 'recommendedSensors')}</h3>
        <div className={styles.modeSwitch}>
          <button 
            className={`${styles.modeBtn} ${mode === 'auto' ? styles.modeActive : ''}`}
            onClick={() => setMode('auto')}
          >
            {t('selector', 'automatic')}
          </button>
          <button 
            className={`${styles.modeBtn} ${mode === 'manual' ? styles.modeActive : ''}`}
            onClick={() => setMode('manual')}
          >
            {t('selector', 'manual')}
          </button>
        </div>
      </div>
      
      <p className={styles.hint}>
        {mode === 'auto' ? t('selector', 'autoHint') : t('selector', 'manualHint')}
      </p>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>{t('selector', 'sensorType')}</span>
          <span>{t('selector', 'unit')}</span>
          <span>{t('selector', 'qty')}</span>
        </div>
        
        {vertical.sensors.map((sensor) => {
          const selected = sensors.find(s => s.name === sensor.name)
          const isActive = !!selected
          const translatedName = getSensorTranslation(sensor.name, 'name')
          const translatedDesc = getSensorTranslation(sensor.name, 'desc')
          
          return (
            <div 
              key={sensor.name} 
              className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
              onClick={() => handleToggle(sensor.name)}
            >
              <div className={styles.sensorInfo}>
                <input 
                  type="checkbox" 
                  checked={isActive}
                  onChange={() => {}}
                  className={styles.checkbox}
                />
                <div>
                  <div className={styles.sensorName}>{translatedName}</div>
                  <div className={styles.sensorDesc}>{translatedDesc}</div>
                </div>
              </div>
              
              <span className={styles.unit}>{sensor.unit}</span>
              
              <div className={styles.qtyControl} onClick={e => e.stopPropagation()}>
                {mode === 'auto' ? (
                  <span className={styles.autoQty}>
                    {isActive ? selected?.qty : Math.ceil(rooms * sensor.autoCount)}
                  </span>
                ) : (
                  <input
                    type="number"
                    min="0"
                    value={selected?.qty || ''}
                    onChange={(e) => handleQtyChange(sensor.name, e.target.value)}
                    className={styles.qtyInput}
                    placeholder="0"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './HeroSection.module.css'

export default function HeroSection({ vertical, includedModules = [] }) {
  const { t } = useTranslation()

  const getModuleTranslation = (moduleName) => {
    const category = vertical.id === 'davranis' ? 'modules_davranis' :
                    vertical.id === 'tehlike' ? 'modules_tehlike' : 'modules_alan'
    
    const keyMap = {
      'Davranış Analizi': 'davranisAnalizi',
      'Grup Dinamikleri': 'grupDinamikleri',
      'Çatışma Tespiti': 'catismaTespiti',
      'Zorbalık Sinyalleri': 'zorbalikSinyalleri',
      'Duygusal Durum': 'duygusalDurum',
      'Öğretmen Bildirim Sistemi': 'ogretmenBildirim',
      'Müdür Yönlendirmesi': 'mudurYonlendirmesi',
      'Sınıf Yönetimi': 'sinifYonetimi',
      'Öğrenci Takip': 'ogrenciTakip',
      'Sosyal Risk Haritası': 'sosyalRiskHaritasi',
      'Davranış Trendleri': 'davranisTrendleri',
      'Duygusal Yoğunluk': 'duygusalYogunluk',
      'Şiddet Tespiti': 'siddetTespiti',
      'Hırsızlık Tespiti': 'hirsizlikTespiti',
      'Eskalasyon Analizi': 'eskalasyonAnalizi',
      'Tehdit Seviyesi': 'tehditSeviyesi',
      'Acil Durum Algılama': 'acilDurumAlgilama',
      'Güvenlik Bildirimleri': 'guvenlikBildirimleri',
      'Olay Yönetimi': 'olayYonetimi',
      'Risk Seviyesi': 'riskSeviyesi',
      'Tehlike Haritası': 'tehlikeHaritasi',
      'Şüpheli Davranış': 'supheliDavranis',
      'Giriş‑Çıkış Kontrolü': 'girisCikisKontrolu',
      'Alan Isı Haritası': 'alanIsiHaritasi',
      'Kamera Bölgeleri': 'kameraBolgeleri',
      'Alan Yönetimi': 'alanYonetimi',
      'Ziyaretçi Kayıt': 'ziyaretciKayit',
      'Bölge Kullanımı': 'bolgeKullanimi',
      'Yapısal Riskler': 'yapisalRiskler',
      'Bölge Güvenliği': 'bolgeGuvenligi',
      'Hareket Yolları': 'hareketYollari',
    }
    
    if (moduleName === 'Ziyaretçi Akışı') {
      const key = category === 'modules_alan' ? 'ziyaretciAkisiAlan' : 'ziyaretciAkisi'
      return t(category, key) || moduleName
    }
    
    const key = keyMap[moduleName]
    if (!key) return moduleName
    
    return t(category, key) || moduleName
  }

  const displayModules = includedModules.slice(0, 4)
  const hasMore = includedModules.length > 4

  return (
    <div 
      className={styles.hero}
      style={{ 
        backgroundImage: `linear-gradient(135deg, ${vertical.gradientFrom} 0%, ${vertical.gradientTo} 100%)` 
      }}
    >
      <div className={styles.content}>
        <span className={styles.subtitle}>{vertical.subtitle}</span>
        <h1 className={styles.title}>{vertical.heroTitle}</h1>
        <p className={styles.text}>{vertical.heroText}</p>
        
        {displayModules.length > 0 && (
          <div className={styles.modules}>
            <span className={styles.modulesLabel}>{t('hero', 'includedModules')}:</span>
            <div className={styles.modulesList}>
              {displayModules.map((name, i) => (
                <span key={name} className={styles.moduleTag}>
                  {getModuleTranslation(name)}
                  {i < displayModules.length - 1 && <span className={styles.separator}>•</span>}
                </span>
              ))}
              {hasMore && (
                <span className={styles.more}>
                  +{includedModules.length - 4} {t('hero', 'moreSuffix')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div 
        className={styles.image}
        style={{ backgroundImage: `url(${vertical.heroImage})` }}
      />
    </div>
  )
}
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './KPICards.module.css'

export default function KPICards({ vertical, values, onChange }) {
  const { t } = useTranslation()

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{t('kpi', 'title')}</h3>
      <p className={styles.helper}>{t('builder', 'kpiHelper')}</p>
      
      <div className={styles.grid}>
        {vertical.kpis.map((kpi) => {
          const value = values[kpi.key] || ''
          
          return (
            <div key={kpi.key} className={styles.card}>
              <label className={styles.label}>
                <span className={styles.icon}>{kpi.icon}</span>
                {kpi.label}
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
