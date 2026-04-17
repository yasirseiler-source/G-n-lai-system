import { useTranslation } from '../../i18n/LanguageContext'
import styles from './ModuleSelector.module.css'

export default function ModuleSelector({ vertical, selected, onToggle }) {
  const { t, lang } = useTranslation()
  
  // Get module translations based on vertical ID
  const getModuleTranslation = (moduleKey, type = 'name') => {
    const keyMap = {
      // Davranış modules
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
      // Tehlike modules
      'Şiddet Tespiti': 'siddetTespiti',
      'Hırsızlık Tespiti': 'hirsizlikTespiti',
      'Eskalasyon Analizi': 'eskalasyonAnalizi',
      'Tehdit Seviyesi': 'tehditSeviyesi',
      'Acil Durum Algılama': 'acilDurumAlgilama',
      'Güvenlik Bildirimleri': 'guvenlikBildirimleri',
      'Olay Yönetimi': 'olayYonetimi',
      'Ziyaretçi Akışı': 'ziyaretciAkisi',
      'Risk Seviyesi': 'riskSeviyesi',
      'Tehlike Haritası': 'tehlikeHaritasi',
      'Şüpheli Davranış': 'supheliDavranis',
      // Alan modules
      'Giriş‑Çıkış Kontrolü': 'girisCikisKontrolu',
      'Alan Isı Haritası': 'alanIsiHaritasi',
      'Ziyaretçi Akışı': 'ziyaretciAkisiAlan',
      'Kamera Bölgeleri': 'kameraBolgeleri',
      'Alan Yönetimi': 'alanYonetimi',
      'Ziyaretçi Kayıt': 'ziyaretciKayit',
      'Bölge Kullanımı': 'bolgeKullanimi',
      'Yapısal Riskler': 'yapisalRiskler',
      'Bölge Güvenliği': 'bolgeGuvenligi',
      'Hareket Yolları': 'hareketYollari',
    }
    
    const translationKey = keyMap[moduleKey]
    if (!translationKey) return moduleKey
    
    const category = vertical.id === 'davranis' ? 'modules_davranis' :
                    vertical.id === 'tehlike' ? 'modules_tehlike' : 'modules_alan'
    
    return t(category, translationKey + (type === 'desc' ? 'Desc' : '')) || moduleKey
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
