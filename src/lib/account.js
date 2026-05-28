import { supabase } from '../supabaseClient';

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || import.meta.env.VITE_ADMIN_EMAIL || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminUser(user, profile) {
  if (!user) return false;

  const role =
    profile?.role ||
    user?.app_metadata?.role ||
    user?.user_metadata?.role;

  return role === 'admin' || ADMIN_EMAILS.includes(user.email?.toLowerCase());
}

export async function loadUserProfile(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.warn('Profile load skipped:', error.message);
    return null;
  }

  return data;
}

export async function syncUserProfile(user) {
  if (!user) return null;

  const existingProfile = await loadUserProfile(user.id);

  if (existingProfile) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        email: user.email,
        last_login_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select('*')
      .maybeSingle();

    if (error) {
      console.warn('Profile update skipped:', error.message);
      return existingProfile;
    }

    return data;
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert([{
      id: user.id,
      email: user.email,
      full_name: [
        user.user_metadata?.first_name,
        user.user_metadata?.post_name,
        user.user_metadata?.last_name,
      ].filter(Boolean).join(' '),
      phone: user.user_metadata?.phone_number || null,
      role: user.user_metadata?.role || 'user',
      status: 'active',
      last_login_at: new Date().toISOString(),
    }])
    .select('*')
    .maybeSingle();

  if (error) {
    console.warn('Profile insert skipped:', error.message);
    return null;
  }

  return data;
}
