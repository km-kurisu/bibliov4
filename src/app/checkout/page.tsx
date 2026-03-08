"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ChevronRight, CreditCard, ArrowRight, BadgeCheck, RefreshCw, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { recordPurchase } from "@/lib/actions";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;

    const handleCompletePurchase = async () => {
        setIsProcessing(true);

        // Record purchase in database
        const bookIds = cart.map(item => item.id);
        const result = await recordPurchase(bookIds);

        if (result.error) {
            alert(result.error);
            setIsProcessing(false);
            return;
        }

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-[#0a191f] text-slate-100 flex flex-col items-center justify-center p-6">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                        <BadgeCheck className="size-12 text-[#0a191f]" />
                    </div>
                    <h1 className="text-5xl font-serif font-bold text-white uppercase tracking-tighter">Gratitude</h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Your literary treasures have been secured. You will receive a confirmation email shortly.
                    </p>
                    <p className="text-cyan-500 text-sm font-bold animate-pulse">
                        Redirecting to archives...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a191f] selection:bg-cyan-500/30 font-sans text-slate-100 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 mt-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
                    <Link className="text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest text-[10px] font-bold" href="/cart">Cart</Link>
                    <ChevronRight className="size-3 text-slate-400" />
                    <span className="text-cyan-400 uppercase tracking-widest text-[10px] font-bold">Shipping & Payment</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7 space-y-10">
                        {/* Shipping Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-[#0a191f] font-bold">1</div>
                                <h3 className="text-2xl font-bold font-serif uppercase tracking-tight">Shipping Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Full Name</label>
                                    <input className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="John Doe" type="text" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Address line 1</label>
                                    <input className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="123 Library Lane" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">City</label>
                                    <input className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="New York" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Postal Code</label>
                                    <input className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="10001" type="text" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-[#0a191f] font-bold">2</div>
                                <h3 className="text-2xl font-bold font-serif uppercase tracking-tight">Payment Method</h3>
                            </div>
                            {/* Card Details */}
                            <div className="space-y-4 p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Card Number</label>
                                    <div className="relative">
                                        <input className="w-full bg-[#0a191f] border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="0000 0000 0000 0000" type="text" />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 text-slate-600">
                                            <CreditCard className="size-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Expiry Date</label>
                                        <input className="w-full bg-[#0a191f] border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="MM / YY" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">CVV</label>
                                        <input className="w-full bg-[#0a191f] border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder-slate-700 text-slate-200" placeholder="123" type="text" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button
                            onClick={handleCompletePurchase}
                            disabled={isProcessing || cart.length === 0}
                            className={`w-full h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${isProcessing ? "bg-slate-800 text-slate-500" : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20"}`}
                        >
                            {isProcessing ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <span>Complete Purchase</span>
                                    <ArrowRight className="size-5" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 sticky top-32 shadow-2xl">
                            <h3 className="text-xl font-bold font-serif mb-8 text-white uppercase tracking-tight">Order Summary</h3>

                            {/* Product List */}
                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="relative w-16 aspect-[3/4] bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                                            <Image className="object-contain p-2" alt={item.title} src={item.image} fill />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-serif text-white truncate text-sm uppercase tracking-tight">{item.title}</h4>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Qty: {item.quantity}</span>
                                                <span className="font-bold text-cyan-400 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-slate-500 text-center py-4">Your bag is empty</p>
                                )}
                            </div>

                            {/* Calculations */}
                            <div className="space-y-4 pt-8 border-t border-slate-800/50">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="text-slate-300">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                    <span className="text-slate-500">Shipping</span>
                                    <span className="text-emerald-500 uppercase">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                    <span className="text-slate-500">Processing Tax (8%)</span>
                                    <span className="text-slate-300">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-end pt-4 font-serif">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/50">Total Amount</span>
                                    <span className="text-4xl font-bold text-cyan-400 tracking-tighter">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
