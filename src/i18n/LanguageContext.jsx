import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'wiseness_lang'
const SUPPORTED = ['tr', 'de', 'en']

function getInitialLang() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored)) return stored
  return 'tr' // Standard: Türkisch
}

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((l) => {
    if (!SUPPORTED.includes(l)) return
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  // t(section, key) → übersetzter Text, Fallback auf TR
  const t = useCallback((section, key) => {
    return translations[lang]?.[section]?.[key]
      ?? translations['tr']?.[section]?.[key]
      ?? `[${section}.${key}]`
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

/** Hook – in jeder Komponente nutzbar */
export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation muss innerhalb von LanguageProvider verwendet werden')
  return ctx
}
