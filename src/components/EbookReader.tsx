'use client'

import React, { useState, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { ArrowLeft, Settings, List, ChevronLeft, ChevronRight, X, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface EbookReaderProps {
  url: string;
  title: string;
}

export default function EbookReader({ url, title }: EbookReaderProps) {
  const [location, setLocation] = useState<string | number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toc, setToc] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && !hasError) {
        setIsLoading(false);
      }
    }, 15000); // 15 seconds max wait
    return () => clearTimeout(timer);
  }, [isLoading, hasError]);

  const locationChanged = (epubcifi: string | number) => {
    setLocation(epubcifi);
    // If the book moves location, it's definitively loading/loaded
    if (isLoading) setIsLoading(false);
  };

  const isPdf = url.split('?')[0].toLowerCase().endsWith('.pdf');

  return (
    <div className="h-screen flex flex-col bg-[#0a191f] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-3xl z-30">
        <div className="flex items-center gap-6">
          <Link 
            href="/shop" 
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-cyan-500 text-slate-400 hover:text-black transition-all border border-white/5 hover:border-cyan-400"
          >
            <ArrowLeft size={18} className="stroke-[3]" />
          </Link>
          <div>
            <h1 className="text-sm font-serif font-bold text-white uppercase tracking-tight line-clamp-1">{title}</h1>
            <nav className="text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.2em] flex items-center gap-2">
                 <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-cyan-500'}`} />
                 Digital Archive Access - {isPdf ? 'PDF' : 'EPUB'} Standard
            </nav>
          </div>
        </div>

        <div className="flex items-center gap-3">
           {!isPdf && (
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-black transition-all border border-white/5 hover:border-cyan-400"
               title="Archive Contents"
             >
               <List size={18} />
             </button>
           )}
        </div>
      </header>

      <div className="flex-1 relative flex overflow-hidden">
        {/* TOC Sidebar */}
        {!isPdf && (
           <aside className={`absolute left-0 top-0 bottom-0 w-80 bg-[#0a191f]/95 backdrop-blur-2xl border-r border-white/10 z-40 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full'}`}>
               <div className="p-8 border-b border-white/5 flex justify-between items-center">
                   <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Chronicle Contents</h2>
                   <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-600 hover:text-red-400 transition-colors">
                       <X size={18} />
                   </button>
               </div>
               <div className="p-4 overflow-y-auto h-[calc(100%-80px)] quiet-scroll">
                   {toc.length > 0 ? toc.map((item, index) => (
                       <button 
                           key={index} 
                           onClick={() => {
                               setLocation(item.href);
                               setIsSidebarOpen(false);
                           }}
                           className="w-full text-left p-4 rounded-2xl hover:bg-cyan-500/10 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-500/20 mb-1 flex items-center justify-between group"
                       >
                           <span className="truncate">{item.label}</span>
                           <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                       </button>
                   )) : (
                       <div className="p-10 text-center space-y-4">
                           <Loader2 size={24} className="animate-spin mx-auto text-cyan-500/20" />
                           <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Indexing Chapters...</p>
                       </div>
                   )}
               </div>
           </aside>
        )}

        {/* Reader Space */}
        <main className="flex-1 bg-[#050c0f] relative group">
          {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6 bg-[#050c0f]">
                  <div className="relative">
                      <div className="w-24 h-24 rounded-full border-2 border-cyan-500/10" />
                      <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto text-cyan-400 animate-pulse" size={24} />
                  </div>
                  <div className="text-center space-y-2">
                       <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] italic">Illuminating Manuscript</p>
                       <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Synchronizing with the digital archive</p>
                  </div>
              </div>
          )}

          {hasError ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-10 text-center bg-[#050c0f]">
                  <AlertCircle size={48} className="text-red-500/50 mb-6" />
                  <h3 className="text-2xl font-serif text-white uppercase tracking-tight mb-4">Sanctuary Link Interrupted</h3>
                  <p className="text-slate-500 text-sm max-w-md mb-10 leading-relaxed font-medium">
                      The digital manuscript could not be projected. This may be due to a local connectivity shift or an expired archive link.
                  </p>
                  <div className="flex gap-4">
                      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-colors">
                          Retry Synchronous Link
                      </button>
                  </div>
              </div>
          ) : isPdf ? (
            <iframe 
               src={`${url}#toolbar=0`} 
               className="w-full h-full border-none"
               title={title}
               onLoad={() => setIsLoading(false)}
            />
          ) : (
            <div className="h-full relative overflow-hidden">
              <ReactReader
                url={url}
                title={title}
                location={location}
                locationChanged={locationChanged}
                tocChanged={(t) => { setToc(t); setIsLoading(false); }}
                getRendition={(rendition) => {
                  rendition.on('started', () => setIsLoading(false));
                  rendition.on('relocated', () => setIsLoading(false));
                  rendition.on('displayError', () => setHasError(true));
                }}
                swipeable={true}
                showToc={false}
                epubOptions={{
                  allowPopups: true,
                  allowScriptedContent: true,
                  flow: "paginated",
                  width: "100%",
                }}
              />

              {/* Interaction Hints */}
              <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none flex items-center pl-10">
                 <ChevronLeft className="text-cyan-400/20" size={64} strokeWidth={1} />
              </div>
              <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none flex items-center justify-end pr-10">
                 <ChevronRight className="text-cyan-400/20" size={64} strokeWidth={1} />
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="h-10 px-6 border-t border-white/5 bg-black flex items-center justify-between text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] z-30">
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                Archive Synchronized
            </span>
            <div className="w-px h-3 bg-white/10" />
            <span className="opacity-60">{url.split('/').pop()}</span>
         </div>
         <span className="italic opacity-40">Proprietary of the Bibliotheca Modern Sanctum</span>
      </footer>
    </div>
  );
}
