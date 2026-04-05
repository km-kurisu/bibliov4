"use client";

import { ShoppingBag, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Book } from "@/data/books";
import { useState } from "react";

interface AddToCartButtonProps {
    book: Book;
    variant?: "icon" | "full";
}

export default function AddToCartButton({ book, variant = "full" }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleAdd}
                className={`p-2.5 rounded-full border transition-all active:scale-90 ${added
                    ? "bg-emerald-500 border-emerald-500 text-black"
                    : "bg-slate-900 border-slate-800 text-slate-500 hover:bg-cyan-500 hover:text-black hover:border-cyan-500"
                    }`}
            >
                {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
        );
    }

    return (
        <button
            onClick={handleAdd}
            className={`flex-1 h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl ${added
                ? "bg-emerald-500 text-black shadow-emerald-500/20"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20"
                }`}
        >
            {added ? (
                <>
                    <Check className="w-5 h-5" />
                    Added to Bag
                </>
            ) : (
                <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Bag
                </>
            )}
        </button>
    );
}
