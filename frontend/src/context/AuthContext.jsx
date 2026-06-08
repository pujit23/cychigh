// ── FILE: src/context/AuthContext.jsx ──────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/config';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Supabase user profile row
  const fetchUserProfile = async (uid) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uid)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Failed to fetch user profile:', error);
      }
      if (data) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Exception fetching user profile:', err);
    }
  };

  // Upsert user doc on sign in/register
  const upsertUserDoc = async (user, extra = {}) => {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email,
        display_name: extra.displayName || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Rider',
        photo_url: user.user_metadata?.avatar_url || null,
        bio: '',
        preferred_ride_type: 'Road'
      }, { onConflict: 'id' })
      .select()
      .single();

    if (!error && data) {
      setUserProfile(data);
    }
  };

  // Listen to Supabase auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setCurrentUser(session.user);
          await upsertUserDoc(session.user);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Email + Password login
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome back, rider!');
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Login failed');
      return { success: false, error: err.message };
    }
  };

  // Email + Password register
  const register = async (displayName, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
          }
        }
      });
      if (error) throw error;
      
      if (data?.user) {
        await upsertUserDoc(data.user, { displayName });
      }
      toast.success('Welcome to CycHigh!');
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      return { success: false, error: err.message };
    }
  };

  // Google Sign-In
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      // Note: User upsert and toast will happen onAuthStateChange when redirected back
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Google login failed');
      return { success: false, error: err.message };
    }
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setUserProfile(null);
    toast.success('Logged out. Ride safe!');
  };

  // Refresh local profile after edit
  const refreshProfile = async () => {
    if (currentUser) {
      await fetchUserProfile(currentUser.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        refreshProfile,
        isLoggedIn: !!currentUser,
        isAdmin: userProfile?.is_admin || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
