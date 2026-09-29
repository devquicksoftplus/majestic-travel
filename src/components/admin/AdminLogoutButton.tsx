'use client';

import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { logoutAdminAction } from '@/actions/adminActions';
import { LogOut, Loader2 } from 'lucide-react';

export default function AdminLogoutButton() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      // 1. Sign out from Firebase Web Client SDK
      await signOut(auth);
    } catch (err) {
      console.warn('Firebase client signOut warning:', err);
    } finally {
      // 2. Clear server-side HTTP-only session cookie and redirect
      await logoutAdminAction();
    }
  };

  return (
    <button
      type="button"
      id="admin-logout-btn"
      onClick={handleLogout}
      disabled={loggingOut}
      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors cursor-pointer disabled:opacity-50"
    >
      {loggingOut ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Log Out</span>
        </>
      )}
    </button>
  );
}
