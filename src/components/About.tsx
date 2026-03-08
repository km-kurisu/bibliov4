"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
    return (
        <section id="about" className="py-24 bg-[#0a191f] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl shadow-cyan-500/10">
                            <Image
                                src="/covers/thewindupbird.png"
                                alt="Bibliotheca Archive"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Vision</div>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                            Preserving the <br />
                            <span className="text-white/40 italic">Art of Reading</span>
                        </h2>

                        <div className="space-y-6 text-lg text-white/60 mb-12 leading-relaxed">
                            <p>
                                At Bibliotheca, we believe books are more than just information—they are vessels of experience,
                                gateways to other souls, and legacies of human thought.
                            </p>
                            <p>
                                Our mission is to curate a collection that honors this weight. We select each title not just
                                for its popularity, but for its resonance and the beauty of its voice.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-cyan-400 text-3xl font-serif font-bold mb-1">500+</h4>
                                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Curated Volumes</p>
                            </div>
                            <div>
                                <h4 className="text-cyan-400 text-3xl font-serif font-bold mb-1">12k</h4>
                                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Passionate Readers</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
