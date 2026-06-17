import { supabase } from '../lib/supabase'

const PAGE_SIZE = 10

export async function getPosts({ page = 1, search = '' } = {}) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('posts')
    .select('*, profiles(name)', { count: 'exact' })
    .order('is_notice', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) query = query.ilike('title', `%${search}%`)

  const { data, error, count } = await query
  if (error) throw error
  return { data, count, pageSize: PAGE_SIZE }
}

export async function getPost(id) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(name)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function incrementViewCount(id) {
  await supabase.rpc('increment_post_view', { post_id: id })
}

export async function createPost(payload) {
  const { data, error } = await supabase
    .from('posts')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePost(id, payload) {
  const { data, error } = await supabase
    .from('posts')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

export async function getLatestPosts(limit = 5) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, created_at, is_notice')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}
