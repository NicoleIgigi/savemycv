import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Create Supabase client with fallback for build time
const createSafeSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // During build time or if env vars are placeholders, return a mock client
  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl === 'https://placeholder.supabase.co' || 
      supabaseKey === 'placeholder-key') {
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null } })
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => Promise.resolve({ data: [], error: null })
          }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null })
        }),
        delete: () => ({
          eq: () => Promise.resolve({ data: null, error: null })
        })
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
      }
    }
  }
  
  return createClientComponentClient()
}

export const supabase = createSafeSupabaseClient()

// Helper function to check if user is admin
export const isAdmin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || user?.email === process.env.ADMIN_EMAIL
  } catch (error) {
    return false
  }
}

export default supabase 