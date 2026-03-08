"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 bg-foreground text-background p-12 rounded-[3rem] relative overflow-hidden shadow-2xl"
                    >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                                    Contact <br />
                                    <span className="text-background/40 italic">Bibliotheca</span>
                                </h2>
                                <p className="text-xl text-background/70 mb-12 max-w-sm">
                                    We&apos;re here to help you find your next literary journey.
                                    Reach out for recommendations or inquiries.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-background/10 rounded-2xl flex items-center justify-center">
                                        <MapPin className="text-background/60" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Location</h4>
                                        <p className="text-background/60">123 Book Street, Literary District</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-background/10 rounded-2xl flex items-center justify-center">
                                        <Phone className="text-background/60" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Call Us</h4>
                                        <p className="text-background/60">+1 234 567 890</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-background/10 rounded-2xl flex items-center justify-center">
                                        <Mail className="text-background/60" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Email</h4>
                                        <p className="text-background/60">hello@bibliotheca.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Abstract decorative background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 py-4"
                    >
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-accent/50 border-b border-foreground/10 py-4 px-0 focus:outline-none focus:border-foreground transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-accent/50 border-b border-foreground/10 py-4 px-0 focus:outline-none focus:border-foreground transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="w-full bg-accent/50 border-b border-foreground/10 py-4 px-0 focus:outline-none focus:border-foreground transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Your message here..."
                                    className="w-full bg-accent/50 border-b border-foreground/10 py-4 px-0 focus:outline-none focus:border-foreground transition-all resize-none"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-foreground text-background rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-foreground/10"
                            >
                                Send Message
                                <Send size={20} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
