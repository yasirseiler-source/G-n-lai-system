import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('[Wiseness] Supabase URL:', supabaseUrl || 'FEHLT')
console.log('[Wiseness] Supabase Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 15) + '...' : 'FEHLT')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Wiseness] VITE_SUPABASE_URL oder VITE_SUPABASE_ANON_KEY fehlt!\n' +
    'Bitte .env-Datei erstellen (siehe env.example).'
  )
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
