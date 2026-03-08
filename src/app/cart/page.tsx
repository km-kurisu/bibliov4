"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, BookOpen } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <>
            <Navbar />
            <main className="pt-32 pb-24 px-6 min-h-screen bg-background">
                <div className="container mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Your Shopping <span className="text-foreground/40 italic">Bag</span></h1>
                        <p className="text-foreground/60">Review your selections before proceeding to checkout.</p>
                    </header>

                    {cart.length === 0 ? (
                        <div className="text-center py-24 bg-accent/30 rounded-[3rem] border-2 border-dashed border-foreground/5">
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={40} className="text-foreground/20" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold mb-4">Your bag is empty</h2>
                            <p className="text-foreground/60 mb-8 max-w-sm mx-auto">
                                Looks like you haven&apos;t added any literary treasures yet.
                            </p>
                            <Link href="/shop" className="px-10 py-4 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-all inline-block">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Items List */}
                            <div className="flex-1 space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="glass p-6 rounded-[2rem] flex items-center gap-6"
                                        >
                                            <div className="w-24 h-32 bg-neutral-100 rounded-2xl flex items-center justify-center p-4">
                                                <BookOpen size={32} className="text-foreground/20" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-serif font-bold leading-tight">{item.title}</h3>
                                                        <p className="text-sm text-foreground/40 font-medium">{item.author}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center gap-4 bg-accent/50 rounded-xl p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-lg transition-colors"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-lg transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <span className="text-xl font-serif font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Summary */}
                            <div className="lg:w-96">
                                <div className="glass p-8 rounded-[2.5rem] sticky top-32">
                                    <h3 className="text-2xl font-serif font-bold mb-8">Order Summary</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-foreground/60">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-foreground">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-foreground/60">
                                            <span>Shipping</span>
                                            <span className="font-medium text-foreground">Calculated at next step</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-foreground/5 mb-8">
                                        <div className="flex justify-between items-end">
                                            <span className="text-lg font-medium">Total</span>
                                            <span className="text-4xl font-serif font-bold">${cartTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Link href="/checkout" className="w-full py-5 bg-foreground text-background rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-foreground/10 hover:scale-[1.02] transition-all">
                                        Checkout
                                        <ArrowRight size={20} />
                                    </Link>

                                    <p className="mt-6 text-center text-sm text-foreground/30 font-medium">
                                        Secure checkout powered by Bibliotheca
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
