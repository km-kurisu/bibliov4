'use client';

import { useState } from 'react';
import { updateProfile } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function SetupProfilePage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const res = await updateProfile(formData);

            if (res?.error) {
                setError(res.error);
                setLoading(false);
            } else {
                // Successful update
                router.refresh();
                // Give a small moment for the user to see success before redirecting
                setTimeout(() => {
                    router.push('/profile');
                }, 500);
            }
        } catch (err) {
            console.error('SetupProfilePage error:', err);
            setError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#0a191f] flex flex-col items-center justify-center p-6 selection:bg-cyan-500/30">
            <div className="w-full max-w-lg bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-white mb-2">Welcome to your Sanctuary</h1>
                    <p className="text-slate-400">Let's set up your literary profile.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-400">Display Name</label>
                        <input
                            name="display_name"
                            type="text"
                            required
                            className="w-full bg-[#0a191f] border border-slate-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-slate-100"
                            placeholder="Eleanor Vance"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-400">Avatar Image URL</label>
                        <input
                            name="avatar_url"
                            type="url"
                            className="w-full bg-[#0a191f] border border-slate-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-slate-100"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-400">Bio</label>
                        <textarea
                            name="bio"
                            rows={4}
                            className="w-full bg-[#0a191f] border border-slate-700/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-slate-100 resize-none"
                            placeholder="Curator of quiet stories and forgotten histories..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0a191f] font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Enter Library'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/profile')}
                        disabled={loading}
                        className="w-full mt-3 bg-transparent hover:bg-slate-800 text-slate-400 py-3.5 rounded-xl transition-all disabled:opacity-50"
                    >
                        Skip for now
                    </button>
                </form>
            </div>
        </main>
    );
}
