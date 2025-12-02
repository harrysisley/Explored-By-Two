
import { createClient } from '@supabase/supabase-js'

// TODO: REPLACE THESE WITH YOUR ACTUAL SUPABASE KEYS
// You can find these in your Supabase Project Settings -> API
const SUPABASE_URL = 'https://your-project-url.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Helper to check if user is logged in
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
