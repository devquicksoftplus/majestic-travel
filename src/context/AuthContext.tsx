'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { logoutAdminAction } from '@/actions/adminActions';

const AUTHORIZED_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_AUTHORIZED_EMAIL || 'ssfoods.erode@gmail.com'
).toLowerCase();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signOutUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const email = currentUser.email?.toLowerCase();
        if (email === AUTHORIZED_EMAIL) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          // Unauthorized Firebase user detected - immediately sign out
          await signOut(auth);
          setUser(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      await logoutAdminAction();
    } catch (err) {
      console.error('Error during signOut:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
