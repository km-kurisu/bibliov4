"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Jone Mark",
        role: "Literature Student",
        content: "The selection here is unparalleled. I found rare editions that I couldn't find anywhere else. The atmosphere is truly inspiring for any student.",
        rating: 5,
    },
    {
        name: "Anna Crowe",
        role: "Author",
        content: "Bibliotheca is my favorite place to write and discover. The modern aesthetic combined with the classic bookstore feel is perfect.",
        rating: 5,
    },
    {
        name: "Hilley James",
        role: "Collector",
        content: "A gem for book lovers. Their recommendation system is spot on, and the staff's passion for books is evident in every corner.",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-24 px-6 bg-accent/30 overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <div className="w-24 h-1 bg-foreground/10 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-[2rem] relative backdrop-blur-xl"
                        >
                            <Quote className="absolute top-6 right-8 text-foreground/5" size={48} />
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-foreground text-foreground" />
                                ))}
                            </div>
                            <p className="text-foreground/70 italic leading-relaxed mb-8 relative z-10">
                                &quot;{testimonial.content}&quot;
                            </p>
                            <div className="flex items-center gap-4 border-t border-foreground/5 pt-6">
                                <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center font-bold text-foreground/60">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight">{testimonial.name}</h4>
                                    <p className="text-sm text-foreground/40 font-medium uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
