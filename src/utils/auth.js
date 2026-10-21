import { supabase } from './supabase.js';

// Admin access via Supabase Auth (email + password).
// supabase-js attaches the session token to every request automatically, so the
// RLS policies decide what a signed-in admin is allowed to write. The anon key
// stays in the bundle, but it can no longer modify products or read orders.

export const signInAdmin = (email, password) =>
  supabase.auth.signInWithPassword({ email: String(email || '').trim(), password });

export const signOutAdmin = () => supabase.auth.signOut();

export const getAdminSession = () => supabase.auth.getSession();

export const onAdminAuthChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return () => data?.subscription?.unsubscribe?.();
};
