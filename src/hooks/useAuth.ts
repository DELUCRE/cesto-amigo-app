import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  user_id: string;
  display_name: string;
  role: 'admin' | 'vendedor';
  created_at: string;
  updated_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile after auth state change
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    return { error };
  };

  const signUp = async (
    email: string, 
    password: string, 
    displayName: string, 
    role: 'admin' | 'vendedor' = 'vendedor',
    additionalData?: {
      username?: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      document_number?: string;
    }
  ) => {
    // If current user is admin, use edge function to avoid session disruption
    if (profile?.role === 'admin') {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          return { error: new Error('No active session') };
        }

        const SUPABASE_URL = "https://hrbvxsolxamjzwqdynhy.supabase.co";
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYnZ4c29seGFtanp3cWR5bmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MDkyNzcsImV4cCI6MjA3MTM4NTI3N30.433sMauRpwV8Ryu6av-KjWZnMIM85m7_xpdUxTud_Z8";

        const response = await fetch(`${SUPABASE_URL}/functions/v1/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session.access_token}`,
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            email,
            password,
            userData: {
              display_name: displayName,
              role: role,
              ...additionalData
            }
          })
        });

        const result = await response.json();
        
        if (!response.ok) {
          return { error: new Error(result.error || 'Failed to create user') };
        }

        return { error: null };
      } catch (error) {
        console.error('Error calling create-user function:', error);
        return { error: error as Error };
      }
    } else {
      // For non-admin users, use regular signup
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
            role: role,
            ...additionalData
          }
        }
      });
      return { error };
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signOut,
    signUp,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isVendedor: profile?.role === 'vendedor',
  };
}