"use client";

import { motion } from "framer-motion";

interface Category {
    name: string;
    count: number;
}

const CATEGORIES: Category[] = [
    { name: "All Books", count: 158 },
    { name: "Fiction", count: 42 },
    { name: "Non-Fiction", count: 31 },
    { name: "History & Classics", count: 24 },
    { name: "Mystery", count: 18 },
    { name: "Philosophy", count: 12 },
];

export default function ShopSidebar() {
    return (
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-12 pr-8">
            <div>
                <h3 className="text-xs font-accent tracking-[0.2em] text-cyan-400 mb-6 uppercase">Categories</h3>
                <ul className="space-y-4">
                    {CATEGORIES.map((cat) => (
                        <li key={cat.name} className="flex justify-between items-center group cursor-pointer">
                            <span className={`text-sm tracking-tight transition-colors ${cat.name === "All Books" ? "text-white font-semibold" : "text-slate-400 group-hover:text-white"
                                }`}>
                                {cat.name}
                            </span>
                            <span className="text-[10px] text-slate-600 font-medium">{cat.count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xs font-accent tracking-[0.2em] text-cyan-400 mb-6 uppercase">Price Range</h3>
                <div className="space-y-6">
                    <div className="h-1 w-full bg-slate-800 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full w-2/3 bg-cyan-500 rounded-full" />
                        <div className="absolute -top-1.5 left-0 w-4 h-4 bg-white rounded-full shadow-lg border-4 border-cyan-500" />
                        <div className="absolute -top-1.5 left-2/3 w-4 h-4 bg-white rounded-full shadow-lg border-4 border-cyan-500" />
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-600 uppercase mb-2 block">Min</label>
                            <input type="text" value="$10" readOnly className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-600 uppercase mb-2 block">Max</label>
                            <input type="text" value="$50" readOnly className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-accent tracking-[0.2em] text-cyan-400 mb-6 uppercase">Authors</h3>
                <div className="flex flex-wrap gap-2">
                    {["Orwell", "Rowling", "Murakami", "Dazai", "Zafon", "Ishiguro"].map(author => (
                        <span key={author} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-[10px] text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
                            {author}
                        </span>
                    ))}
                </div>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl text-sm font-bold tracking-tight transition-all active:scale-95 shadow-lg shadow-cyan-500/10">
                Apply Filters
            </button>
        </aside>
    );
}
