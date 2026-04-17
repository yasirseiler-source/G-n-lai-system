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
