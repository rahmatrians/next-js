import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient('https://nigkotxzlgcwqsetuctn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZ2tvdHh6bGdjd3FzZXR1Y3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA1NTA1MTksImV4cCI6MTk2NjEyNjUxOX0.EDVmMTZjehjU0U2hPvskKIGOr0zbk4d7dcpc-WwiBkg')

export default supabase