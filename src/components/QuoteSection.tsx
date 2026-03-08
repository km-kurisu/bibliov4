"use client";

import { motion } from "framer-motion";

export default function QuoteSection() {
    return (
        <section className="py-32 px-8 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <blockquote className="text-3xl md:text-4xl font-serif italic text-cyan-400 mb-6 drop-shadow-sm tracking-tight text-balance">
                    "The world was hers for the reading."
                </blockquote>
                <cite className="text-sm font-accent tracking-widest text-slate-500 uppercase not-italic">
                    — Betty Smith
                </cite>
            </motion.div>
        </section>
    );
}
