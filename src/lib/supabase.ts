import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.https://llatuyckpkfpojghmcdp.supabase.co
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXR1eWNrcGtmcG9qZ2htY2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNTUzMDAsImV4cCI6MjA2MzgzMTMwMH0.1wgK_crm8pE3Bz0E74QKM_8ZbFVk0SFJBcIihwDKgGA

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
