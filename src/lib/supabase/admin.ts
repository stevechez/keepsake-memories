import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = (() => {
  // Guard to ensure this doesn't accidentally end up in a client-side bundle
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin can only be used on the server.')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
})()
