import React from 'react';
import db from '@/lib/db';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Fetch some stats
  const totalBooks = db.prepare('SELECT COUNT(*) as count FROM books').get() as any;
  const totalUsers = db.prepare('SELECT COUNT(*) as count FROM profiles').get() as any;

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[150px] -z-10 rounded-full" />
        <div className="space-y-4">
          <nav className="text-[10px] uppercase tracking-[0.3em] text-cyan-500/60 font-bold mb-2">Management Console v1.0</nav>
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tighter uppercase leading-[0.8]">
             Library <span className="text-cyan-400">Curator</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-md border-l-2 border-cyan-500/20 pl-6 py-1 italic text-lg">
             Regulating the sanctuary's vast collection of digital masterpieces.
          </p>
        </div>
        <Link 
          href="/admin/upload" 
          className="group relative inline-flex items-center gap-4 bg-white/5 hover:bg-cyan-500 text-white hover:text-black px-10 py-5 rounded-full font-black tracking-widest uppercase text-xs transition-all duration-500 border border-white/10 hover:border-cyan-400 shadow-2xl overflow-hidden"
        >
          <Plus size={18} className="stroke-[4] group-hover:rotate-90 transition-transform duration-500" />
          <span>Upload Archive</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          label="Total Books" 
          value={totalBooks.count} 
          icon={<BookOpen size={20} />} 
          trend="+3 New Assets"
        />
        <StatCard 
          label="Active Readers" 
          value={totalUsers.count} 
          icon={<Users size={20} />} 
          trend="+12% Retention"
        />
        <StatCard 
          label="Global Reach" 
          value="2.4k" 
          icon={<TrendingUp size={20} />} 
          trend="+1.2k Sessions"
        />
        <StatCard 
          label="Revenue" 
          value="$12k" 
          icon={<DollarSign size={20} />} 
          trend="+8.4% Yield"
        />
      </div>

      {/* Management Section */}
      <div className="liquid-glass border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/[0.02] blur-3xl rounded-full" />
        
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div>
            <h2 className="text-3xl font-serif text-white tracking-tight uppercase mb-2">Collection Manager</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
               Live database synchronization active
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-8">
            <div className="text-center">
               <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</p>
               <p className="text-xs font-black text-cyan-400 capitalize">Healthy</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
               <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Catalog Size</p>
               <p className="text-xs font-black text-white">{totalBooks.count} Items</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/20 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] border-b border-white/5">
              <tr>
                <th className="px-10 py-6">Masterpiece Details</th>
                <th className="px-10 py-6">Classification</th>
                <th className="px-10 py-6">Investment</th>
                <th className="px-10 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(db.prepare('SELECT * FROM books ORDER BY created_at DESC').all() as any[]).map((book) => (
                <tr key={book.id} className="group hover:bg-white/[0.03] transition-all duration-300">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-24 bg-slate-900 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                         {book.image ? (
                            <img src={book.image} alt="" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-700 bg-slate-950">
                               <BookOpen size={24} />
                            </div>
                         )}
                       </div>
                       <div>
                         <div className="font-serif text-xl text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{book.title}</div>
                         <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{book.author}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-2 bg-white/5 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">{book.category}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-1">
                       <div className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">${book.price.toFixed(2)}</div>
                       <div className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter flex items-center gap-1">
                          Market Valuation
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                       <Link 
                         href={`/admin/edit/${book.id}`}
                         className="p-4 rounded-2xl bg-white/5 text-slate-400 hover:bg-cyan-500 hover:text-black transition-all border border-white/5 hover:border-cyan-400 shadow-xl"
                         title="Refine Metadata"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                       </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: any) {
  return (
    <div className="group relative p-8 rounded-[2rem] liquid-glass border border-white/5 transition-all duration-500 hover:border-cyan-500/30 hover:-translate-y-2 overflow-hidden shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-cyan-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 rounded-2xl bg-black/40 text-cyan-400 border border-white/5 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-700">
          {icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-cyan-500 transition-colors">
          Metric_01
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
           <p className="text-4xl font-black text-white group-hover:text-cyan-400 transition-colors">{value}</p>
           <span className="text-[11px] font-bold text-emerald-400 opacity-60">{trend}</span>
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, status }: any) {
  const statusColors: any = {
    success: "bg-emerald-500/20 text-emerald-400 ring-emerald-500/20",
    info: "bg-blue-500/20 text-blue-400 ring-blue-500/20",
    error: "bg-red-500/20 text-red-400 ring-red-500/20",
  };

  return (
    <div className="relative pl-6 border-l border-neutral-800 pb-1">
      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-950 ring-2 ring-neutral-800 group-hover:ring-neutral-700" />
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-bold text-neutral-200">{title}</h4>
        <span className="text-[10px] text-neutral-600 font-bold tabular-nums whitespace-nowrap ml-2">{time}</span>
      </div>
      <p className="text-xs text-neutral-500 leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  );
}
