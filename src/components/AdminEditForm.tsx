'use client'

import React, { useState } from 'react';
import { updateBook } from '@/lib/admin-actions';
import { Upload, Book, User, DollarSign, FileText, Globe, Calendar, FileType, CheckCircle2, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminEditForm({ book }: { book: any }) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await updateBook(formData);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/admin/dashboard');
                    router.refresh();
                }, 1500);
            }
        } catch (e) {
            setError('An unexpected error occurred during transmutation.');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <input type="hidden" name="id" value={book.id} />
            
            {/* Main Details Section */}
            <div className="lg:col-span-2 space-y-10">
                <div className="liquid-glass border border-white/5 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.03] blur-3xl -z-10 group-hover:bg-cyan-500/[0.06] transition-colors duration-700" />
                    
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-2xl font-serif text-white uppercase tracking-tight flex items-center gap-4">
                                <Sparkles className="text-cyan-400" size={24} />
                                Manuscript Essence
                            </h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Core Content Metadata</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <InputField label="Title of Work" name="title" icon={<Book size={18} />} defaultValue={book.title} required />
                        <InputField label="Author / Creator" name="author" icon={<User size={18} />} defaultValue={book.author} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <InputField label="Classification" name="category" icon={<Globe size={18} />} defaultValue={book.category} required />
                        <InputField label="Base Valuation (USD)" name="price" type="number" step="0.01" icon={<DollarSign size={18} />} defaultValue={book.price} required />
                    </div>

                    <div className="space-y-4 mb-10">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Narrative Summary</label>
                        <div className="relative group">
                            <div className="absolute top-5 left-5 text-slate-600 group-focus-within:text-cyan-400 transition-colors">
                                <FileText size={20} />
                            </div>
                            <textarea
                                name="description"
                                rows={8}
                                defaultValue={book.description}
                                className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white text-base font-medium focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 transition-all resize-none leading-relaxed"
                                placeholder="Enter the grand narrative of this work..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputField label="Total Pages" name="pages" type="number" icon={<Calendar size={18} />} defaultValue={book.pages} />
                        <InputField label="Language" name="language" icon={<Globe size={18} />} defaultValue={book.language} />
                        <InputField label="Era of Release" name="published_year" type="number" icon={<Calendar size={18} />} defaultValue={book.published_year} />
                    </div>
                </div>
            </div>

            {/* Media & Action Section */}
            <div className="space-y-10">
                <div className="liquid-glass border border-white/5 rounded-[2.5rem] p-10 space-y-10 shadow-2xl sticky top-32">
                    <div>
                        <h2 className="text-xl font-serif text-white uppercase tracking-tight flex items-center gap-4">
                            <Upload className="text-cyan-400" size={20} />
                            Digital Assets
                        </h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Replace Visuals and Media</p>
                    </div>

                    <div className="space-y-8">
                        <FileInput label="Curated Cover Image" name="image" accept="image/*" description="Portrait orientation. JPG/PNG/WEBP." />
                        <FileInput label="Ebook Manuscript" name="ebook" accept=".epub,.pdf" description="Digital copy (EPUB/PDF)." />
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-5 py-4 rounded-2xl mb-8 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-4 rounded-2xl mb-8 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                                <CheckCircle2 size={18} />
                                Archive Updated Successfully
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative w-full h-20 bg-white text-[#0a191f] hover:bg-cyan-500 transition-all duration-500 rounded-[1.5rem] overflow-hidden"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-xs">
                                {isPending ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                                )}
                                <span>{isPending ? 'Transmuting...' : 'Commit Changes'}</span>
                            </div>
                            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>

                        <button 
                            type="button"
                            onClick={() => router.back()}
                            className="w-full mt-4 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors"
                        >
                            Abandon Changes
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

function InputField({ label, icon, ...props }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-cyan-400 transition-colors">
                    {icon}
                </div>
                <input
                    {...props}
                    className="w-full h-16 bg-black/40 border border-white/5 rounded-[1.25rem] pl-14 pr-6 text-white text-sm font-semibold focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 transition-all"
                />
            </div>
        </div>
    );
}

function FileInput({ label, name, accept, description }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">{label}</label>
            <div className="relative group border-2 border-dashed border-white/5 rounded-[2rem] p-8 hover:border-cyan-500/40 hover:bg-white/[0.02] transition-all cursor-pointer text-center overflow-hidden">
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="relative z-10">
                    <div className="mx-auto w-14 h-14 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center mb-5 text-slate-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
                        <FileType size={28} />
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-widest mb-2">
                        Replace Asset
                    </p>
                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">{description}</p>
                </div>
            </div>
        </div>
    );
}
