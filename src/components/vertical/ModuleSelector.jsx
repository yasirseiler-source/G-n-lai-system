import { useTranslation } from '../../i18n/LanguageContext'
import styles from './ModuleSelector.module.css'

export default function ModuleSelector({ vertical, selected, onToggle }) {
  const { t } = useTranslation()
  
  const getModuleTranslation = (moduleName, type = 'name') => {
    const category = vertical.id === 'davranis' ? 'modules_davranis' :
                    vertical.id === 'tehlike' ? 'modules_tehlike' : 'modules_alan'
    
    const keyMap = {
      'Davranis Analizi': 'davranisAnalizi',
      'Grup Dinamikleri': 'grupDinamikleri',
      'Catisma Tespiti': 'catismaTespiti',
      'Zorbalik Sinyalleri': 'zorbalikSinyalleri',
      'Duygusal Durum': 'duygusalDurum',
      'Ogretmen Bildirim Sistemi': 'ogretmenBildirim',
      'Mudur Yonlendirmesi': 'mudurYonlendirmesi',
      'Sinif Yonetimi': 'sinifYonetimi',
      'Ogrenci Takip': 'ogrenciTakip',
      'Sosyal Risk Haritasi': 'sosyalRiskHaritasi',
      'Davranis Trendleri': 'davranisTrendleri',
      'Duygusal Yogunluk': 'duygusalYogunluk',
      'Siddet Tespiti': 'siddetTespiti',
      'Hirsizlik Tespiti': 'hirsizlikTespiti',
      'Eskalasyon Analizi': 'eskalasyonAnalizi',
      'Tehdit Seviyesi': 'tehditSeviyesi',
      'Acil Durum Algilama': 'acilDurumAlgilama',
      'Guvenlik Bildirimleri': 'guvenlikBildirimleri',
      'Olay Yonetimi': 'olayYonetimi',
      'Risk Seviyesi': 'riskSeviyesi',
      'Tehlike Haritasi': 'tehlikeHaritasi',
      'Supheli Davranis': 'supheliDavranis',
      'Giris-Cikis Kontrolu': 'girisCikisKontrolu',
      'Alan Isi Haritasi': 'alanIsiHaritasi',
      'Kamera Bolgeleri': 'kameraBolgeleri',
      'Alan Yonetimi': 'alanYonetimi',
      'Ziyaretci Kayit': 'ziyaretciKayit',
      'Bolge Kullanimi': 'bolgeKullanimi',
      'Yapisal Riskler': 'yapisalRiskler',
      'Bolge Guvenligi': 'bolgeGuvenligi',
      'Hareket Yollari': 'hareketYollari',
    }
    
    if (moduleName === 'Ziyaretci Akisi') {
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
