import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopSidebar from "@/components/ShopSidebar";
import { getBooks } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, LayoutGrid, List, ChevronDown } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ShopPage() {
    const books = await getBooks();

    return (
        <div className="min-h-screen bg-[#0a191f] text-slate-200">
            <Navbar />

            <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
                <header className="mb-16">
                    <nav className="text-[10px] uppercase tracking-widest text-slate-500 mb-4">
                        <Link href="/" className="hover:text-cyan-400">Home</Link> / Shop
                    </nav>
                    <h1 className="text-5xl font-serif text-white tracking-tight">Shop Catalog</h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    <ShopSidebar />

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-12 border-b border-slate-900 pb-8">
                            <span className="text-sm text-slate-500 font-medium">
                                Showing <span className="text-white">{books.length}</span> results
                            </span>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer transition-colors">
                                    <span className="text-xs uppercase tracking-widest font-bold">Sort By</span>
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                                <div className="flex items-center gap-3 bg-slate-900 p-1 rounded-lg">
                                    <button className="p-1.5 bg-cyan-500 text-black rounded-md"><LayoutGrid className="w-3 h-3" /></button>
                                    <button className="p-1.5 text-slate-500 hover:text-slate-300"><List className="w-3 h-3" /></button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {books.map((book) => (
                                <div key={book.id} className="group cursor-pointer">
                                    <Link href={`/shop/${book.id}`}>
                                        <div className="relative aspect-[3/4] bg-white rounded-2xl mb-6 overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-cyan-900/10">
                                            <Image
                                                src={book.image}
                                                alt={book.title}
                                                fill
                                                className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </Link>
                                    <div className="flex justify-between items-start pt-2">
                                        <div className="flex-1 pr-4">
                                            <h3 className="font-serif text-lg text-white mb-1 leading-tight group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 mb-3">{book.author}</p>
                                            <p className="text-cyan-400 font-bold">${book.price.toFixed(2)}</p>
                                        </div>
                                        <AddToCartButton book={book} variant="icon" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <footer className="mt-24 flex justify-center items-center gap-4">
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold border border-slate-800 hover:border-cyan-500 transition-all">1</button>
                            <button className="px-4 py-2 text-slate-500 hover:text-white text-xs font-bold">2</button>
                            <button className="px-4 py-2 text-slate-500 hover:text-white text-xs font-bold">Next →</button>
                        </footer>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
