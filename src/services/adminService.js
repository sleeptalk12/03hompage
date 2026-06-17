import { supabase } from '../lib/supabase'

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateUserRole(id, role) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getDashboardStats() {
  const [users, products, posts, inquiries] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ])
  return {
    users: users.count ?? 0,
    products: products.count ?? 0,
    posts: posts.count ?? 0,
    pendingInquiries: inquiries.count ?? 0,
  }
}
