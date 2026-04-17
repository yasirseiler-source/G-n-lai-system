import { useTranslation } from '../../i18n/LanguageContext'
import styles from './HeroSection.module.css'

export default function HeroSection({ vertical, includedModules = [] }) {
  const { t } = useTranslation()

  const getModuleTranslation = (moduleName) => {
    const category = vertical.id === 'pflege' ? 'modules_pflege' :
                    vertical.id === 'fabrik' ? 'modules_fabrik' : 'modules_unternehmen'
    
    const keyMap = {
      'Sakin Yonetimi': 'sakinYonetimi',
      'Oda Gorunumu': 'odaGorunumu',
      'Bakim Talimatlari': 'bakimTalimatlari',
      'Ilac Mantigi': 'ilacMantigi',
      'Acil Cagri Sistemi': 'acilCagriSistemi',
      'Dusme Riski Tespiti': 'dusmeRiskiTespiti',
      'Personel Gorevleri': 'personelGorevleri',
      'Ziyaretci Yonetimi': 'ziyaretciYonetimi',
      'Vital Veri Arayuzleri': 'vitalVeriArayuzleri',
      'Alarm ve Eskalasyon': 'alarmVeEskalasyon',
      'Makine Gorunumu': 'makineGorunumu',
      'Uretim Hatlari': 'uretimHatlari',
      'Bakim Yonetimi': 'bakimYonetimi',
      'Ariza Mantigi': 'arizaMantigi',
      'Malzeme Akisi': 'malzemeAkisi',
      'Depo Yapisi': 'depoYapisi',
      'Personel Atama': 'personelAtama',
      'Vardiya Gorunumu': 'vardiyaGorunumu',
      'Guvenlik Bolgeleri': 'guvenlikBolgeleri',
      'Performans Analizi': 'performansAnalizi',
      'Departman Yapisi': 'departmanYapisi',
      'Roller ve Sorumluluklar': 'rollerVeSorumluluklar',
      'Gorev Yonetimi': 'gorevYonetimi',
      'Ic Iletisim': 'icIletisim',
      'Randevu ve Surec Gorunumu': 'randevuVeSurecGorunumu',
      'Siparis ve Teslimat': 'siparisVeTeslimat',
      'Ziyaretci ve Resepsiyon': 'ziyaretciVeResepsiyon',
      'Oda Kullanimi': 'odaKullanimi',
      'Cihaz ve Ag Durumu': 'cihazVeAgDurumu',
      'Yonetim Panosu': 'yonetimPanosu',
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
