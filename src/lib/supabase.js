import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yblywubuwseutyojjsit.supabase.co'
const SUPABASE_KEY = 'sb_publishable_KCJCInAiC7bSSUd3sH8ViQ_5i1Bt-kc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function loadDraft(token) {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('form_data, status')
    .eq('token', token)
    .single()
  if (error) return null
  return data
}

export async function saveDraft(token, email, formData) {
  const { error } = await supabase
    .from('form_submissions')
    .upsert({
      token,
      email,
      status: 'draft',
      form_data: formData,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'token' })
  return !error
}

export async function submitForm(token, email, formData) {
  const { error } = await supabase
    .from('form_submissions')
    .upsert({
      token,
      email,
      status: 'submitted',
      form_data: formData,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'token' })
  return !error
}
