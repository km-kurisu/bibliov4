import React from 'react';
import db from '@/lib/db';
import { Database, Table, Columns, Layers, Activity, Shield } from 'lucide-react';

export default async function DatabaseVisualizerPage() {
    const tables = [
        'books',
        'book_keywords',
        'profiles',
        'user_library',
        'reviews',
        'admin_users'
    ];

    const schemas = tables.map(table => {
        const info = db.prepare(`PRAGMA table_info(${table})`).all() as any[];
        const count = db.prepare(`SELECT COUNT(*) as total FROM ${table}`).get() as { total: number };
        const sample = db.prepare(`SELECT * FROM ${table} LIMIT 5`).all() as any[];
        return { name: table, columns: info, count: count.total, sample };
    });

    return (
        <div className="p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="space-y-4">
                <nav className="text-[10px] uppercase tracking-[0.3em] text-cyan-500/60 font-bold mb-2">Internal Architecture</nav>
                <h1 className="text-5xl font-serif text-white tracking-tighter uppercase leading-[0.8]">
                    Sanctuary <span className="text-cyan-400">Database</span>
                </h1>
                <p className="text-slate-400 font-medium max-w-lg border-l-2 border-cyan-500/20 pl-6 py-1 italic text-lg">
                    A visual mapping of the sanctuary's digital foundations and stored memory.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {schemas.map(s => (
                   <div key={s.name} className="liquid-glass p-8 rounded-3xl border border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
                       <div className="flex justify-between items-center mb-4">
                          <Table size={18} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{s.count} Entries</span>
                       </div>
                       <h3 className="text-xl font-serif text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{s.name}</h3>
                   </div>
               ))}
            </div>

            {/* Schema Visualizer */}
            <div className="liquid-glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
                <div className="p-10 border-b border-white/5 bg-black/20 relative z-10">
                    <h2 className="text-2xl font-serif text-white uppercase tracking-tight flex items-center gap-4">
                        <Layers className="text-cyan-400" size={24} />
                        Schema Atlas
                    </h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Relational Structure and Constraints</p>
                </div>
                
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black/40 relative z-10">
                    {schemas.map(table => (
                        <div key={table.name} className="bg-black/60 rounded-3xl border border-white/10 p-6 space-y-4 hover:border-cyan-500/20 transition-all">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                                    <Table size={16} />
                                </div>
                                <span className="font-bold text-white uppercase tracking-widest text-xs">{table.name}</span>
                            </div>
                            <div className="space-y-3">
                                {table.columns.map((col: any) => (
                                    <div key={col.name} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-2">
                                            <Columns size={12} className="text-slate-600" />
                                            <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{col.name}</span>
                                        </div>
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter bg-white/5 px-1.5 py-0.5 rounded">{col.type}</span>
                                    </div>
                                ))}
                            </div>
                            {table.name === 'user_library' && (
                                <div className="pt-2">
                                    <div className="text-[8px] font-black text-cyan-500/50 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Shield size={12} />
                                        FK: profiles.id, books.id
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Data Preview */}
            <div className="liquid-glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
                <div className="p-10 border-b border-white/5 bg-black/20">
                    <h2 className="text-2xl font-serif text-white uppercase tracking-tight flex items-center gap-4">
                        <Activity className="text-cyan-400" size={24} />
                        Data Transmissions
                    </h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Latest Sample Records from Local Storage</p>
                </div>

                <div className="space-y-12 p-10">
                    {schemas.filter(s => s.sample.length > 0).map(table => (
                        <div key={table.name + '_sample'} className="space-y-4">
                            <h4 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                {table.name}
                            </h4>
                            <div className="overflow-x-auto rounded-3xl border border-white/5 bg-black/20">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead className="bg-white/5 font-bold text-slate-600 uppercase tracking-tighter">
                                        <tr>
                                            {table.columns.slice(0, 5).map((col: any) => (
                                                <th key={col.name} className="px-6 py-4 border-b border-white/5">{col.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {table.sample.map((row: any, i: number) => (
                                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                {table.columns.slice(0, 5).map((col: any) => (
                                                    <td key={col.name} className="px-6 py-4 text-slate-400 font-medium truncate max-w-[200px]">
                                                        {String(row[col.name])}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
