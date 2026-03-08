'use server'

import { Book, CarouselItem } from '@/data/books';
import db from './db';

export async function getBooks(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
}): Promise<Book[]> {
    let query = 'SELECT * FROM books WHERE 1=1';
    const params: any[] = [];

    if (filters?.category && filters.category !== 'All Books') {
        query += ' AND category = ?';
        params.push(filters.category);
    }

    if (filters?.minPrice !== undefined) {
        query += ' AND price >= ?';
        params.push(filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
        query += ' AND price <= ?';
        params.push(filters.maxPrice);
    }

    if (filters?.search) {
        query += ' AND (title LIKE ? OR author LIKE ?)';
        const searchParam = `%${filters.search}%`;
        params.push(searchParam, searchParam);
    }

    if (filters?.sortBy) {
        switch (filters.sortBy) {
            case 'price_low': query += ' ORDER BY price ASC'; break;
            case 'price_high': query += ' ORDER BY price DESC'; break;
            case 'newest': query += ' ORDER BY created_at DESC'; break;
            case 'rating': query += ' ORDER BY rating DESC'; break;
            default: query += ' ORDER BY title ASC';
        }
    }

    try {
        const books = db.prepare(query).all(...params) as Book[];
        return books;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}

export async function getBook(id: string) {
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id) as Book;
    if (!book) return null;

    const keywords = db.prepare('SELECT keyword FROM book_keywords WHERE book_id = ?').all(id) as { keyword: string }[];
    const reviews = db.prepare('SELECT * FROM reviews WHERE book_id = ? ORDER BY created_at DESC').all(id) as any[];

    return { ...book, keywords: keywords.map(k => k.keyword), reviews };
}

export async function getRelatedBooks(category: string, currentId: string) {
    const books = db.prepare('SELECT * FROM books WHERE category = ? AND id != ? LIMIT 4').all(category, currentId) as Book[];
    return books;
}

export async function getCarouselItems(): Promise<CarouselItem[]> {
    try {
        const items = db.prepare('SELECT id, title, carousel_image as image, description as subtitle FROM books WHERE carousel_image IS NOT NULL LIMIT 4').all() as any[];
        return items.map(item => ({
            ...item,
            tag: "SELECTION",
            buttonText: "Explore Now"
        }));
    } catch (error) {
        console.error('Failed to fetch carousel items:', error);
        return [];
    }
}

export async function getFeaturedBooks(): Promise<Book[]> {
    try {
        return db.prepare('SELECT * FROM books WHERE is_bestseller = 1 LIMIT 8').all() as Book[];
    } catch (error) {
        console.error('Failed to fetch featured books:', error);
        return [];
    }
}
import { cookies } from 'next/headers';

export async function recordPurchase(bookIds: string[]) {
    const userId = (await cookies()).get('auth_token')?.value;
    if (!userId) return { error: 'Not authenticated' };

    try {
        const stmt = db.prepare(`
            INSERT INTO user_library (user_id, book_id, status)
            VALUES (?, ?, 'Purchased')
            ON CONFLICT(user_id, book_id) DO UPDATE SET status = 'Purchased'
        `);

        for (const id of bookIds) {
            stmt.run(userId, id);
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to record purchase:', error);
        return { error: 'Failed to record purchase' };
    }
}
