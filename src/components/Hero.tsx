"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselItem } from "@/data/books";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero({ items }: { items: CarouselItem[] }) {
    const [index, setIndex] = useState(0);
    const container = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);

    // Auto-advance every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [items.length]);

    useGSAP(() => {
        if (!slidesRef.current) return;

        // Sweep animation: slide the entire track
        gsap.to(slidesRef.current, {
            xPercent: -index * 100,
            duration: 1.2,
            ease: "power3.inOut",
        });

        // Staggered text entrance for the internal content
        const currentSlide = slidesRef.current.children[index];
        if (currentSlide) {
            gsap.fromTo(
                currentSlide.querySelectorAll(".animate-text"),
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
            );
        }
    }, [index]);

    const next = () => setIndex((prev) => (prev + 1) % items.length);
    const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

    if (!items || items.length === 0) return null;

    return (
        <section className="pt-32 pb-12 px-8 overflow-hidden" ref={container}>
            <div className="relative w-full max-w-[1400px] mx-auto group">
                {/* Main Carousel Stage */}
                <div className="relative aspect-[21/9] md:aspect-[25/9] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 border border-slate-800/50">
                    <div ref={slidesRef} className="flex h-full w-full">
                        {items.map((item, i) => (
                            <div key={item.title + i} className="relative min-w-full h-full flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-opacity duration-1000"
                                    priority={i === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                                <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-center">
                                    <span className="animate-text text-sm font-accent tracking-widest text-cyan-400 mb-4 block">
                                        {item.tag}
                                    </span>
                                    <h2 className="animate-text text-5xl md:text-7xl font-serif text-white mb-8 max-w-2xl leading-[1.1]">
                                        {item.title}
                                    </h2>
                                    <p className="animate-text text-slate-300 text-lg mb-10 max-w-lg leading-relaxed">
                                        {item.subtitle}
                                    </p>
                                    <button className="animate-text flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#0a191f] px-8 py-4 rounded-full text-base font-bold transition-all w-fit group/btn shadow-lg shadow-cyan-500/20">
                                        {item.buttonText}
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Overlays */}
                    <button
                        onClick={prev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-cyan-500 hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-cyan-500 hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-cyan-500" : "w-1.5 bg-white/30 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

