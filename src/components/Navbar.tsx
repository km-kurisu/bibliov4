"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6 bg-[#0a191f]/80 backdrop-blur-md"
        >
            <div className="flex items-center gap-12">
                <Link href="/" className="text-2xl font-serif text-cyan-400 tracking-tight">
                    Bibliotheca
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="/shop" className="hover:text-cyan-400 transition-colors">Browse</Link>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search archive..."
                        className="bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-cyan-500/50 transition-all w-64"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400" />
                </div>

                <Link href="/cart" className="relative p-2 text-slate-300 hover:text-cyan-400 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-[10px] font-bold text-black rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <Link href="/profile" className="p-0.5 rounded-full border border-slate-700 hover:border-cyan-500/50 transition-all">
                    <div className="w-8 h-8 rounded-full bg-[#f3e8d2] flex items-center justify-center overflow-hidden">
                        <User className="w-5 h-5 text-slate-700" />
                    </div>
                </Link>
            </div>
        </motion.nav>
    );
}
