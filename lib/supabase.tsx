import { createClient } from '@supabase/supabase-js'
import { createBrowserSupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const password = "DV1kHctiNHKU9SRY"

export default createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)