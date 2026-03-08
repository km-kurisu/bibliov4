'use client';

import { useState } from 'react';
import { signupUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const res = await signupUser(formData);

        if (res?.error) {
            setError(res.error);
            setLoading(false);
        } else {
            // "when user registers ask for their information to update the profile"
            router.push('/profile/setup'); // Send them to the setup flow
            router.refresh();
        }
    }

    return (
        <main className="min-h-screen bg-[#0a191f] flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30">
            <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-white mb-2">Join Bibliotheca</h1>
                    <p className="text-slate-400">Create an account to begin your journey.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-400">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full bg-[#0a191f] border border-slate-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-slate-100"
                            placeholder="eleanor_vance"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-400">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full bg-[#0a191f] border border-slate-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-slate-100"
                            placeholder="eleanor@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-400">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-[#0a191f] border border-slate-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-slate-100"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-cyan-500 hover:bg-cyan-400 text-[#0a191f] font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Continue'}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-6 text-sm">
                    Already have an account? <Link href="/login" className="text-cyan-400 hover:text-cyan-300">Sign in</Link>
                </p>
            </div>
        </main>
    );
}
