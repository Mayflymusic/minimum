import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://uxpayhanuifzlrazdode.supabase.co'  // <- Ersetze mit deinem Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cGF5aGFudWlmemxyYXpkb2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTc3NDgsImV4cCI6MjA2Mjc5Mzc0OH0.s8Y-Dnx9LTpUWqu5BDbEa171fCWl-GQNLTbM0zDH0T0'                   // <- Ersetze mit deinem anon key

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
