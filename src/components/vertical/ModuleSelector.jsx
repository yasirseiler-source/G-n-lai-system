import { useTranslation } from '../../i18n/LanguageContext'
import styles from './ModuleSelector.module.css'

export default function ModuleSelector({ vertical, selected, onToggle }) {
  const { t } = useTranslation()

  const getModuleTranslation = (moduleName, type = 'name') => {
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

    return t(category, type === 'desc' ? key + 'Desc' : key) || moduleName
  }

  const activeCount = selected.length
  const totalCount = vertical.modules.length

  // Check if modules have group information
  const hasGroups = vertical.modules.some(m => m.group)

  const renderModuleCard = (module) => {
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
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('builder', 'modulesTitle')}</h3>
        <span className={styles.badge}>
          {activeCount} / {totalCount} {t('selector', 'activeOf')}
        </span>
      </div>

      {hasGroups ? (
        // Grouped view when group field exists
        ['recommended', 'operation', 'security'].map((groupKey) => {
          const modules = vertical.modules.filter(m => m.group === groupKey)
          if (modules.length === 0) return null
          return (
            <div key={groupKey} className={styles.group}>
              <h4 className={styles.groupTitle}>
                {t('builder', groupKey === 'recommended' ? 'groupRecommended' :
                   groupKey === 'operation' ? 'groupOperation' : 'groupSecurity')}
              </h4>
              <div className={styles.grid}>
                {modules.map(renderModuleCard)}
              </div>
            </div>
          )
        })
      ) : (
        // Flat view when no group field (default for current verticals.js)
        <div className={styles.grid}>
          {vertical.modules.map(renderModuleCard)}
        </div>
      )}
    </div>
  )
}
