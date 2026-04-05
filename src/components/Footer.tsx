"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="mt-24 pt-24 pb-12 px-8 border-t border-slate-900 bg-[#0a191f]">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <Link href="/" className="text-4xl font-serif text-cyan-400 mb-12 tracking-tighter">
                    Bibliotheca
                </Link>

                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16 text-sm font-medium text-slate-400">
                    <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                    <Link href="/shop" className="hover:text-cyan-400 transition-colors">Shop</Link>
                    <Link href="/profile" className="hover:text-cyan-400 transition-colors">Profile</Link>
                    <Link href="/admin/dashboard" className="hover:text-cyan-400 transition-colors">Admin</Link>
                </nav>

                <p className="max-w-2xl text-slate-500 text-sm leading-relaxed mb-16">
                    Bibliotheca is a sanctuary for the curious mind. We believe in the power of slow reading and the
                    timeless value of physical literature. Our mission is to curate the world's most meaningful books
                    and deliver them to your hands with care and quiet elegance.
                </p>

                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-slate-600 border-t border-slate-900 pt-8">
                    <span>&copy; 2024 Bibliotheca Archive. All rights reserved.</span>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
