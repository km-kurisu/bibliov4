import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBook, getRelatedBooks } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft, ShoppingBag, Bookmark, Globe, BookmarkCheck, Share2, BookOpen } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { Book } from "@/data/books";

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book = await getBook(id);
    if (!book) notFound();

    const relatedBooks = await getRelatedBooks(book.category, book.id);

    return (
        <div className="min-h-screen bg-[#0a191f] text-slate-200">
            <Navbar />

            <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 mb-12 transition-colors group"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Gallery
                </Link>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
                    {/* Left Column: Book Image */}
                    <div className="lg:w-1/2">
                        <div className="sticky top-32">
                            <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] group">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                                />
                                {book.is_bestseller && (
                                    <div className="absolute top-8 left-8 px-4 py-2 bg-cyan-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                        Bestseller
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Book Content */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="mb-8">
                            <h1 className="text-6xl md:text-7xl font-serif text-white mb-4 tracking-tighter leading-[0.9]">
                                {book.title}
                            </h1>
                            <p className="text-xl text-slate-400 font-medium">
                                By <span className="text-slate-200">{book.author}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-6 mb-10">
                            <span className="text-3xl font-bold text-cyan-400">${book.price.toFixed(2)}</span>
                            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
                                <div className="flex text-cyan-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(book.rating || 5) ? 'fill-current' : ''}`} />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-400">{book.reviews_count || 0} Reviews</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none mb-12">
                            <p className="text-lg text-slate-400 leading-relaxed font-light italic">
                                {book.synopsis || "No synopsis available for this selection."}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 border-y border-slate-900 py-10">
                            <div>
                                <dt className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2">ISBN</dt>
                                <dd className="text-sm text-slate-300 font-medium uppercase">{book.id.padStart(10, '0')}</dd>
                            </div>
                            <div>
                                <dt className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2">Language</dt>
                                <dd className="text-sm text-slate-300 font-medium">{book.language || "English"}</dd>
                            </div>
                            <div>
                                <dt className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2">Pages</dt>
                                <dd className="text-sm text-slate-300 font-medium">{book.pages || 320}</dd>
                            </div>
                            <div>
                                <dt className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2">Published</dt>
                                <dd className="text-sm text-slate-300 font-medium">{book.published_year || 2023}</dd>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <AddToCartButton book={book} />
                            <Link href={`/reader/${book.id}`} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-cyan-500/10">
                                <BookOpen className="w-5 h-5" />
                                Read Now
                            </Link>
                            <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-95">
                                <Bookmark className="w-5 h-5" />
                                Add to Library
                            </button>
                        </div>

                        <div className="flex gap-2">
                            {book.keywords?.map((keyword: string) => (
                                <span key={keyword} className="px-4 py-2 bg-slate-900/40 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-800/50">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Author Bio Section */}
                <section className="mb-32 bg-slate-900/20 border border-slate-900 rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center gap-12 md:gap-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
                    <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                        <Image
                            src={book.author_image || "/assets/author.png"}
                            alt={book.author}
                            fill
                            className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold mb-6">About the Author</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 uppercase tracking-tight">{book.author}</h3>
                        <p className="text-lg text-slate-400 leading-relaxed font-light">
                            {book.author_bio || `A distinguished voice in contemporary ${book.category} literature, ${book.author} has captivated readers worldwide with profound insights and masterfully crafted narratives.`}
                        </p>
                    </div>
                </section>

                {/* Related Books */}
                {relatedBooks.length > 0 && (
                    <section>
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-4xl font-serif text-white tracking-tight uppercase">Similar Works</h2>
                            <Link href="/shop" className="text-xs font-bold text-cyan-400 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                Explore All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {relatedBooks.map((relBook) => (
                                <Link key={relBook.id} href={`/shop/${relBook.id}`} className="group">
                                    <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-6 transition-transform duration-500 group-hover:-translate-y-2 shadow-xl">
                                        <Image src={relBook.image} alt={relBook.title} fill className="object-contain p-8" />
                                    </div>
                                    <h4 className="text-sm font-serif text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-tight mb-1">{relBook.title}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{relBook.author}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
