import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// Helper function to check if user is admin
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || user?.email === process.env.ADMIN_EMAIL
}

export default supabase 