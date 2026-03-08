"use client";

import { motion } from "framer-motion";
import { Landmark, Swords, Wand2, ArrowRight } from "lucide-react";
import Image from "next/image";

const categories = [
    {
        name: "History & Classics",
        description: "From profound historical narratives to timeless literature that shaped the world.",
        image: "/covers/nolongerhuman.png",
    },
    {
        name: "Epic Adventure",
        description: "Thrilling quests and modern masterpieces of strategic survival and ingenuity.",
        image: "/covers/classroomoftheelite.png",
    },
    {
        name: "Magic & Fantasy",
        description: "Immerse yourself in Wizarding Worlds and Virtual Reality epics of wonder.",
        image: "/covers/swordartonline.png",
    },
];

const Categories = () => {
    return (
        <section id="categories" className="py-24 bg-[#0a191f]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
                        >
                            Curated Genres
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl font-display font-bold text-white"
                        >
                            Explore Our <span className="text-white/40 italic">Archives</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a191f] via-[#0a191f]/20 to-transparent" />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <h3 className="text-3xl font-serif font-bold text-white mb-2">{category.name}</h3>
                                <p className="text-white/60 font-medium mb-6 line-clamp-2">{category.description}</p>
                                <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-[#0a191f] transition-all duration-500">
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
