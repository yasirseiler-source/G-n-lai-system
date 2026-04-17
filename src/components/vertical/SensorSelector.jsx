import { useState } from 'react'
import { useTranslation } from '../../i18n/LanguageContext'
import styles from './SensorSelector.module.css'

export default function SensorSelector({ vertical, sensors, onChange, rooms = 1 }) {
  const { t } = useTranslation()
  const [mode, setMode] = useState('auto')

  const getSensorTranslation = (sensorName, type = 'name') => {
    const keyMap = {
      'Acil Cagri Butonu': 'acilCagriButonu',
      'Hareket Sensoru': 'hareketSensoru',
      'Kapi Sensoru': 'kapiSensoru',
      'Ortam Iklim Sensoru': 'ortamIklimSensoru',
      'Yatak / Aktivite Sensoru': 'yatakAktiviteSensoru',
      'Erisim Kontrolu': 'erisimKontrolu',
      'Ortak Alan Kamerasi': 'ortakAlanKamerasi',
      'Sicaklik Sensoru': 'sicaklikSensoru',
      'Titresim Sensoru': 'titresimSensoru',
      'Guc Olcumu': 'gucOlcumu',
      'Calisma Suresi Sayaci': 'calismaSuresiSayaci',
      'RFID / Malzeme Takibi': 'rfidMalzemeTakibi',
      'Uretim Alani Kamerasi': 'uretimAlaniKamerasi',
      'Oda Doluluk Sensoru': 'odaDolulukSensoru',
      'Iklim Sensoru': 'iklimSensoru',
      'Enerji Tuketimi': 'enerjiTuketimi',
      'Cihaz Durumu': 'cihazDurumu',
      'Giris Alani Kamerasi': 'girisAlaniKamerasi',
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
