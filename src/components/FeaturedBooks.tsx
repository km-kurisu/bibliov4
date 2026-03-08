"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
}

export default function FeaturedBooks({ books }: { books: Book[] }) {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".book-card", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, { scope: container });

    if (!books || books.length === 0) return null;

    // We need a 3x2 grid, so 6 items.
    const displayBooks = books.slice(0, 6);

    return (
        <section className="py-24 px-8" ref={container}>
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-serif text-white mb-4">Featured Books</h2>
                    <p className="text-slate-400 max-w-md">
                        Our editors' selection of this month's most compelling literary works.
                    </p>
                </div>
                <Link href="/shop" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-2 group">
                    View All <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {displayBooks.map((book) => (
                    <div
                        key={book.id}
                        className="book-card group"
                    >
                        <Link href={`/shop/${book.id}`}>
                            <div className="relative aspect-[3/4] bg-white rounded-2xl mb-4 overflow-hidden shadow-2xl transition-transform group-hover:-translate-y-2">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-lg text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-2">{book.author}</p>
                                <p className="text-cyan-400 font-medium">${book.price.toFixed(2)}</p>
                            </div>
                            <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all">
                                <ShoppingCart className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
