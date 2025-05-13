import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://your-project-id.supabase.co'  // <- Ersetze mit deinem Supabase URL
const SUPABASE_ANON_KEY = 'your-anon-key'                   // <- Ersetze mit deinem anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  const messageEl = document.getElementById('message')
  if (error) {
    messageEl.textContent = 'Login fehlgeschlagen: ' + error.message
  } else {
    messageEl.style.color = 'green'
    messageEl.textContent = 'Login erfolgreich!'
  }
})
