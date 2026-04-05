"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Category {
    name: string;
}

const CATEGORIES: Category[] = [
    { name: "All Books" },
    { name: "Fantasy" },
    { name: "Adventure" },
    { name: "History" },
    { name: "fanfic" },
];

export default function ShopSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Books');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (selectedCategory && selectedCategory !== 'All Books') {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }

        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');

        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');

        router.push(`/shop?${params.toString()}`);
    };

    return (
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-12 pr-8">
            <div>
                <h3 className="text-xs font-accent tracking-[0.2em] text-cyan-400 mb-6 uppercase">Categories</h3>
                <ul className="space-y-4">
                    {CATEGORIES.map((cat) => (
                        <li 
                            key={cat.name} 
                            onClick={() => setSelectedCategory(cat.name)}
                            className="flex justify-between items-center group cursor-pointer"
                        >
                            <span className={`text-sm tracking-tight transition-colors ${selectedCategory === cat.name ? "text-white font-semibold" : "text-slate-400 group-hover:text-white"
                                }`}>
                                {cat.name}
                            </span>
                             {selectedCategory === cat.name && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xs font-accent tracking-[0.2em] text-cyan-400 mb-6 uppercase">Price Range</h3>
                <div className="space-y-6">
                    <div className="flex justify-between gap-4">
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-600 uppercase mb-2 block">Min $</label>
                            <input 
                                type="number" 
                                value={minPrice} 
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-cyan-500/50 outline-none transition-colors" 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] text-slate-600 uppercase mb-2 block">Max $</label>
                            <input 
                                type="number" 
                                value={maxPrice} 
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="100"
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-xs text-white focus:border-cyan-500/50 outline-none transition-colors" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={applyFilters}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl text-sm font-bold tracking-tight transition-all active:scale-95 shadow-lg shadow-cyan-500/10"
            >
                Apply Filters
            </button>

            {/* Clear Filters */}
            {(selectedCategory !== 'All Books' || minPrice || maxPrice) && (
                <button 
                    onClick={() => {
                        setSelectedCategory('All Books');
                        setMinPrice('');
                        setMaxPrice('');
                        router.push('/shop');
                    }}
                    className="w-full text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </aside>
    );
}
