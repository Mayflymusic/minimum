import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://uxpayhanuifzlrazdode.supabase.co'  // <- Ersetze mit deinem Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cGF5aGFudWlmemxyYXpkb2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTc3NDgsImV4cCI6MjA2Mjc5Mzc0OH0.s8Y-Dnx9LTpUWqu5BDbEa171fCWl-GQNLTbM0zDH0T0'                   // <- Ersetze mit deinem anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const loginForm = document.getElementById('login-form')
const messageEl = document.getElementById('message')

// 👤 Login-Handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    messageEl.textContent = 'Login fehlgeschlagen: ' + error.message
    messageEl.style.color = 'red'
  } else {
    messageEl.textContent = 'Login erfolgreich!'
    messageEl.style.color = 'green'
    showTestdaten()
  }
})

// 📦 Abrufen & Anzeigen der Testdaten
async function showTestdaten() {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) return

  const { data: testdaten, error } = await supabase
    .from('testdaten')
    .select('*')
    .eq('autor', user.id)
    .order('erstellt_am', { ascending: false })

  if (error) {
    messageEl.textContent = 'Fehler beim Abrufen der Daten: ' + error.message
    messageEl.style.color = 'red'
    return
  }

  // 📋 Anzeige im DOM
  const container = document.createElement('div')
  container.classList.add('testdaten-container')

  if (testdaten.length === 0) {
    container.innerHTML = '<p>Keine Testdaten gefunden.</p>'
  } else {
    testdaten.forEach(item => {
      const entry = document.createElement('div')
      entry.classList.add('testeintrag')
      entry.innerHTML = `
        <h3>${item.titel}</h3>
        <p>${item.beschreibung}</p>
        <small>Erstellt am: ${new Date(item.erstellt_am).toLocaleString()}</small>
        <hr>
      `
      container.appendChild(entry)
    })
  }

  document.body.appendChild(container)
}
