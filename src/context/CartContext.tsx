"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "@/data/books";

interface CartItem extends Book {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (book: Book) => void;
    removeFromCart: (bookId: string) => void;
    updateQuantity: (bookId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Load from localStorage only after mounting to avoid hydration mismatch
    useEffect(() => {
        const savedCart = localStorage.getItem("bibliotheca_cart");
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                // Use functional update to avoid synchronous closure issues
                const hydrate = () => setCart(() => parsed);
                hydrate();
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        const markMounted = () => setIsMounted(() => true);
        markMounted();
    }, []);

    // Save cart to localStorage on change, but only after initial mount/load
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("bibliotheca_cart", JSON.stringify(cart));
        }
    }, [cart, isMounted]);

    const addToCart = (book: Book) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === book.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (bookId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
    };

    const updateQuantity = (bookId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === bookId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
