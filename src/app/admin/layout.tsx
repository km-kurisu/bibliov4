import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Upload, LogOut, BookOpen, Database } from 'lucide-react';
import { getAdminUser, logoutAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();

  if (!admin) {
    // Check if current path is login
    // In server components we can't easily check current path without middleware or headers
    // But we'll just handle it by placing login outside this layout if needed or checking here.
    // Actually, I'll redirect to admin/login if not on admin/login.
  }

  return (
    <div className="min-h-screen bg-[#0a191f] text-white flex selection:bg-cyan-500/30">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-10 border-b border-white/5">
          <Link href="/" className="flex flex-col gap-1 items-start group">
            <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-500 font-bold mb-1 opacity-60">Archive Sanctuary</span>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <BookOpen size={18} className="stroke-[3]" />
               </div>
               <span className="text-2xl font-serif text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">
                 Curator
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-6 py-12 space-y-4">
          <p className="text-[9px] uppercase tracking-[0.4em] text-slate-600 font-black mb-6 px-4">Navigation_Node</p>
          <Link href="/admin/dashboard" className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
            <LayoutDashboard size={18} className="text-slate-500 group-hover:text-cyan-400 transition-all duration-500" />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-all">Console</span>
          </Link>
          <Link href="/admin/upload" className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
            <Upload size={18} className="text-slate-500 group-hover:text-cyan-400 transition-all duration-500" />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-all">Archival</span>
          </Link>
          <Link href="/admin/database" className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
            <Database size={18} className="text-slate-500 group-hover:text-cyan-400 transition-all duration-500" />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-all">Sanctuary Data</span>
          </Link>
        </nav>

        <div className="p-8 border-t border-white/5">
          <form action={logoutAdmin}>
             <button className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all w-full group border border-transparent hover:border-red-500/10">
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Exit Sanctuary</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/[0.03] via-transparent to-transparent relative">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-cyan-500/[0.02] to-transparent pointer-events-none" />
        {children}
      </main>
    </div>
  );
}
