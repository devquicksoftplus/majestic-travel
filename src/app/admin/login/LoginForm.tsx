'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { verifyAndCreateSessionAction } from '@/actions/adminActions';
import { Compass, Lock, Mail, AlertCircle, ArrowRight, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

const AUTHORIZED_ADMIN_EMAIL = 'ssfoods.erode@gmail.com';

function mapFirebaseError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
      case 'auth/invalid-email':
        return 'Invalid email or password.';
      case 'auth/user-disabled':
        return 'This admin account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many login attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Unable to connect. Please check your internet connection and try again.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  }
  return 'Authentication failed. Please check your credentials and try again.';
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState(AUTHORIZED_ADMIN_EMAIL);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Firebase Client Config Diagnostic:', {
        projectId: auth.app.options.projectId,
        authDomain: auth.app.options.authDomain,
        authInitialized: Boolean(auth),
        authProvider: 'Email/Password (signInWithEmailAndPassword)',
      });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      // 1. Trim email, preserve password untouched
      const inputEmail = email.trim();

      // 2. Authenticate with real Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, inputEmail, password);
      const user = userCredential.user;

      // 3. Client-side authorization check (must match authorized admin email)
      if (user.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth);
        setErrorMessage('You are not authorized to access the Majestic Voyages admin portal.');
        setLoading(false);
        return;
      }

      // 4. Obtain Firebase ID token
      const idToken = await user.getIdToken();

      // 5. Send token to server for Firebase Admin SDK verification & HTTP-only session cookie
      const sessionResult = await verifyAndCreateSessionAction(idToken);
      if (!sessionResult.success) {
        await signOut(auth);
        setErrorMessage(sessionResult.error || 'Server authorization failed.');
        setLoading(false);
        return;
      }

      // 6. Successful login - redirect to Admin Dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (process.env.NODE_ENV !== 'production') {
        const authErr = err as { code?: string; message?: string };
        console.error('Firebase Auth Diagnostic Failure:', {
          errorCode: authErr?.code,
          errorMessage: authErr?.message,
          projectId: auth.app.options.projectId,
        });
      }
      setErrorMessage(mapFirebaseError(err));
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setResetLoading(true);

    try {
      const targetEmail = resetEmail.trim();
      if (targetEmail.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setErrorMessage('Password reset is restricted to the authorized administrator account.');
        setResetLoading(false);
        return;
      }

      // Real Firebase Password Reset
      await sendPasswordResetEmail(auth, targetEmail);
      setSuccessMessage('Password reset email sent.');
      setShowForgotModal(false);
    } catch (err) {
      console.error('Password reset error:', err);
      setErrorMessage(mapFirebaseError(err));
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#26345C] border border-[#26345C] flex items-center justify-center text-[#D4AF37] mb-3 shadow-[0_10px_25px_rgba(38,52,92,0.25)]">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="font-sans text-2xl font-bold tracking-tight text-zinc-900">
          MAJESTIC VOYAGES
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-medium mt-1">
          Executive Admin Portal
        </p>
        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-3" />
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-800 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-zinc-600 block mb-1.5 font-semibold">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="email"
              name="email"
              id="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-1 focus:ring-[#D4AF37] transition-all"
              placeholder="admin@majesticvoyages.com"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs uppercase tracking-wider text-zinc-600 font-semibold">
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(true);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="text-[11px] text-[#B38F1E] hover:text-[#8C6D0D] font-medium hover:underline transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="password"
              name="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-medium focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-1 focus:ring-[#D4AF37] transition-all"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          id="admin-sign-in-btn"
          disabled={loading}
          className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#997715] text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-zinc-100 animate-scaleUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B38F1E] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-zinc-900">Reset Admin Password</h3>
                <p className="text-[11px] text-zinc-500">Firebase recovery link will be sent</p>
              </div>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-600 block mb-1 font-semibold">
                  Authorized Admin Email
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A028] text-white text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  {resetLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Security Footer Notice */}
      <div className="mt-8 pt-4 border-t border-zinc-100 text-center">
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">
          Protected by Firebase Authentication
        </p>
      </div>
    </div>
  );
}
