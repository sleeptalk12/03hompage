import { supabase } from '../lib/supabase'

export async function createInquiry(payload) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getMyInquiries(userId) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getAllInquiries() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*, profiles(name, email)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function answerInquiry(id, answer) {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ answer, status: 'answered', answered_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateInquiryStatus(id, status) {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}
