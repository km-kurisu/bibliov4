import React from 'react';
import { loginAdmin } from '@/lib/auth';
import { BookOpen, Lock, User } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-500/10 mb-4 ring-1 ring-blue-500/20">
            <BookOpen size={32} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-neutral-400">Sign in to manage your digital library</p>
        </div>

        {/* Login Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-3xl -z-10" />

          <form action={loginAdmin as any} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="Enter admin username"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-150"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>

        {/* Back to Site */}
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
