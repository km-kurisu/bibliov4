'use client'

import React, { useState, useRef } from 'react';
import { uploadBook } from '@/lib/admin-actions';
import { Upload, Book, User, DollarSign, FileText, Globe, Calendar, FileType, CheckCircle2, Loader2, AlertCircle, Sparkles, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ePub from 'epubjs';

export default function AdminUploadForm() {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const ebookInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const coverPreviewRef = useRef<HTMLImageElement>(null);

    async function handleFileDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.epub')) {
            if (ebookInputRef.current) {
                const dt = new DataTransfer();
                dt.items.add(file);
                ebookInputRef.current.files = dt.files;
            }
            await parseEpubMetadata(file);
        } else if (file) {
            setError("The sanctuary only accepts EPUB manuscripts for automatic extraction.");
        }
    }

    async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file && file.name.endsWith('.epub')) {
            await parseEpubMetadata(file);
        }
    }

    async function parseEpubMetadata(file: File) {
        setIsParsing(true);
        setError(null);

        try {
            const buffer = await file.arrayBuffer();
            const book = ePub(buffer);
            const metadata = await book.loaded.metadata;

            if (titleRef.current) titleRef.current.value = metadata.title || "";
            if (authorRef.current) authorRef.current.value = metadata.creator || "";
            if (descRef.current) descRef.current.value = metadata.description || "";

            // Extract cover and sync with image input
            try {
                const coverUrl = await book.coverUrl();
                if (coverUrl) {
                    if (coverPreviewRef.current) {
                        coverPreviewRef.current.src = coverUrl;
                        coverPreviewRef.current.classList.remove('hidden');
                    }

                    // Convert blob URL to File and sync with main image input
                    const response = await fetch(coverUrl);
                    const blob = await response.blob();
                    const coverFile = new File([blob], "cover-extracted.png", { type: "image/png" });
                    
                    if (imageInputRef.current) {
                        const dt = new DataTransfer();
                        dt.items.add(coverFile);
                        imageInputRef.current.files = dt.files;
                    }
                }
            } catch (coverErr) {
                console.warn("Cover extraction failed, manual selection enabled.");
            }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("EPUB Parse Error:", err);
            setError("The manuscript structure is obscured. Manual entry required.");
        } finally {
            setIsParsing(false);
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await uploadBook(formData);
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
            setError('An unexpected error occurred during the archive process.');
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-700/5 blur-[120px] rounded-full -z-10" />
            
            {/* Main Details Section */}
            <div className="lg:col-span-2 space-y-10">
                {/* Advanced Drag & Drop Zone */}
                <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleFileDrop}
                    className={`liquid-glass border-2 border-dashed ${isDragging ? 'border-cyan-400 bg-cyan-400/5 scale-[1.01]' : 'border-white/10'} rounded-[3rem] p-12 text-center transition-all duration-500 relative overflow-hidden group mb-10`}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`p-6 rounded-3xl bg-black/40 text-cyan-400 border border-white/5 mb-6 group-hover:scale-110 transition-transform duration-500 ${isParsing ? 'animate-pulse' : ''}`}>
                            {isParsing ? <Loader2 size={32} className="animate-spin" /> : <Wand2 size={32} />}
                        </div>
                        <h2 className="text-2xl font-serif text-white uppercase tracking-tight mb-2 text-balance">
                           {isParsing ? 'Summoning Metadata...' : 'Manuscript Transmuter'}
                        </h2>
                        {ebookInputRef.current?.files?.[0] && !isParsing && (
                            <p className="text-[9px] text-cyan-400 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <CheckCircle2 size={12} />
                                File Prepared: {ebookInputRef.current.files[0].name}
                            </p>
                        )}
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                            Drop an EPUB here to automatically extract the author, title, and essence of the work.
                        </p>
                        <input 
                            type="file" 
                            name="ebook" 
                            accept=".epub" 
                            ref={ebookInputRef}
                            onChange={handleFileSelect}
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                    </div>
                    {isDragging && (
                        <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center animate-in zoom-in duration-300">
                             <p className="text-cyan-400 font-black uppercase tracking-[0.5em] text-sm italic">Release the Archive</p>
                        </div>
                    )}
                </div>

                <div className="liquid-glass border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-2xl font-serif text-white uppercase tracking-tight flex items-center gap-4">
                                <Sparkles className="text-cyan-400" size={24} />
                                Extracted Essence
                            </h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Initialize Store Records</p>
                        </div>
                        <img 
                            ref={coverPreviewRef} 
                            className="w-16 h-24 rounded-lg object-cover border border-white/20 shadow-2xl hidden animate-in slide-in-from-right duration-700" 
                            alt="Cover Preview"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <InputField label="Asset Title" name="title" icon={<Book size={18} />} placeholder="Waiting for manuscript..." ref={titleRef} required />
                        <InputField label="Creator Identity" name="author" icon={<User size={18} />} placeholder="Identify the master..." ref={authorRef} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <InputField label="Classification" name="category" icon={<Globe size={18} />} placeholder="Fiction / Philosophy" required />
                        <InputField label="Market Value (USD)" name="price" type="number" step="0.01" icon={<DollarSign size={18} />} placeholder="24.99" required />
                    </div>

                    <div className="space-y-4 mb-10">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Archive Synopsis</label>
                        <div className="relative group">
                            <div className="absolute top-5 left-5 text-slate-600 group-focus-within:text-cyan-400 transition-colors">
                                <FileText size={20} />
                            </div>
                            <textarea
                                name="description"
                                ref={descRef}
                                rows={8}
                                className="w-full bg-black/40 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white text-base font-medium focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 transition-all resize-none leading-relaxed"
                                placeholder="Describe the essence of this masterpiece..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputField label="Volume Pages" name="pages" type="number" icon={<Calendar size={18} />} placeholder="320" />
                        <InputField label="Vernacular" name="language" icon={<Globe size={18} />} placeholder="English" />
                        <InputField label="Epoch" name="published_year" type="number" icon={<Calendar size={18} />} placeholder="2024" />
                    </div>
                </div>
            </div>

            {/* Media & Action Section */}
            <div className="space-y-10">
                <div className="liquid-glass border border-white/5 rounded-[2.5rem] p-10 space-y-10 shadow-2xl sticky top-32">
                    <div>
                        <h2 className="text-xl font-serif text-white uppercase tracking-tight flex items-center gap-4">
                            <Upload className="text-cyan-400" size={20} />
                            Visual Asset
                        </h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Upload Cover if not extracted</p>
                    </div>

                    <div className="space-y-8">
                        <FileInput label="Visual Interface (Cover)" name="image" accept="image/*" description="Portrait orientation. JPG/PNG/WEBP." />
                        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 text-[9px] text-cyan-400 font-bold uppercase tracking-widest leading-relaxed">
                            Note: If cover was extracted successfully from EPUB above, you may still upload a high-res version here manually for best fidelity.
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-5 py-4 rounded-2xl mb-8 text-xs font-bold uppercase tracking-wider flex items-center gap-3 animate-shake">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-4 rounded-2xl mb-8 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                                <CheckCircle2 size={18} />
                                Archive Initialized Successfully
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
                                <span>{isPending ? 'Archiving...' : 'Commit to Sanctum'}</span>
                            </div>
                            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>

                        <button 
                            type="button"
                            onClick={() => router.back()}
                            className="w-full mt-4 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors"
                        >
                            Abandon Project
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

const InputField = React.forwardRef(({ label, icon, ...props }: any, ref: any) => {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-cyan-400 transition-colors">
                    {icon}
                </div>
                <input
                    {...props}
                    ref={ref}
                    className="w-full h-16 bg-black/40 border border-white/5 rounded-[1.25rem] pl-14 pr-6 text-white text-sm font-semibold focus:outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5 transition-all"
                />
            </div>
        </div>
    );
});

InputField.displayName = "InputField";

const FileInput = React.forwardRef(({ label, name, accept, description }: any, ref: any) => {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">{label}</label>
            <div className="relative group border-2 border-dashed border-white/5 rounded-[2rem] p-8 hover:border-cyan-500/40 hover:bg-white/[0.02] transition-all cursor-pointer text-center overflow-hidden">
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    ref={ref}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="relative z-10">
                    <div className="mx-auto w-14 h-14 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center mb-5 text-slate-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
                        <FileType size={28} />
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-widest mb-2">
                        Add New Asset
                    </p>
                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">{description}</p>
                </div>
            </div>
        </div>
    );
});

FileInput.displayName = "FileInput";
