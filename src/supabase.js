
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// TODO: REPLACE THESE WITH YOUR ACTUAL SUPABASE KEYS
// You can find these in your Supabase Project Settings -> API
const SUPABASE_URL = 'https://your-project-url.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwcXJ0bWlweWdza3NhbHhsYnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2Njg2NTgsImV4cCI6MjA4MDI0NDY1OH0.QrzugGaUZKgXyaqpZYKhu8orpEr3gXjw7wwR9CcjyiQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Helper to check if user is logged in
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
