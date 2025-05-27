// src/components/ProfileTest.tsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export function ProfileTest() {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testRLS = async () => {
    if (!user) return
    
    setLoading(true)
    setError(null)

    try {
      // Questo dovrebbe funzionare solo per i dati dell'utente loggato
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)

      if (error) {
        setError(error.message)
      } else {
        setProfiles(data || [])
        console.log('Dati profilo:', data)
      }
    } catch (err) {
      setError('Errore durante il test')
    }

    setLoading(false)
  }

  const createTestProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: 'test_user',
          full_name: 'Test User',
          updated_at: new Date().toISOString()
        })

      if (error) {
        setError(error.message)
      } else {
        console.log('Profilo creato:', data)
        testRLS() // Ricarica i dati
      }
    } catch (err) {
      setError('Errore nella creazione del profilo')
    }
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-4">Test RLS Policy</h3>
      
      <div className="space-y-2 mb-4">
        <button 
          onClick={testRLS}
          disabled={loading || !user}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Caricamento...' : 'Testa Lettura Profilo'}
        </button>

        <button 
          onClick={createTestProfile}
          disabled={!user}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 ml-2"
        >
          Crea Profilo Test
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Errore: {error}
        </div>
      )}

      {profiles.length > 0 && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h4 className="font-bold">Profili trovati:</h4>
          <pre>{JSON.stringify(profiles, null, 2)}</pre>
        </div>
      )}

      {profiles.length === 0 && !loading && !error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Nessun profilo trovato. Crea prima un profilo test.
        </div>
      )}
    </div>
  )
}
