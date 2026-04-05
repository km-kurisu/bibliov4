'use server'

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import db from './db';
import { redirect } from 'next/navigation';
import { getAdminUser } from './auth';

export async function uploadBook(formData: FormData) {
    const admin = await getAdminUser();
    if (!admin) {
        return { error: 'Unauthorized' };
    }

    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const pages = parseInt(formData.get('pages') as string);
    const language = formData.get('language') as string;
    const published_year = parseInt(formData.get('published_year') as string);
    
    const imageFile = formData.get('image') as File;
    const ebookFile = formData.get('ebook') as File;

    if (!title || !author || isNaN(price)) {
        return { error: 'Missing required fields' };
    }

    try {
        const id = 'book-' + Date.now();
        let imageUrl = '';
        let ebookUrl = '';
        let ebookFormat = 'epub';

        // Ensure directories exist
        const publicPath = path.join(process.cwd(), 'public');
        await mkdir(path.join(publicPath, 'covers'), { recursive: true });
        await mkdir(path.join(publicPath, 'ebooks'), { recursive: true });

        if (imageFile && imageFile.size > 0) {
            const imageExt = path.extname(imageFile.name);
            const imageName = `${id}${imageExt}`;
            const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
            await writeFile(path.join(publicPath, 'covers', imageName), imageBuffer);
            imageUrl = `/covers/${imageName}`;
        }

        if (ebookFile && ebookFile.size > 0) {
            const ebookExt = path.extname(ebookFile.name);
            const ebookName = `${id}${ebookExt}`;
            const ebookBuffer = Buffer.from(await ebookFile.arrayBuffer());
            await writeFile(path.join(publicPath, 'ebooks', ebookName), ebookBuffer);
            ebookUrl = `/ebooks/${ebookName}`;
            ebookFormat = ebookExt.replace('.', '').toLowerCase();
        }

        db.prepare(`
            INSERT INTO books (
                id, title, author, price, category, description, image, 
                pages, language, published_year, ebook_url, ebook_format
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            id, title, author, price, category, description, imageUrl,
            pages, language, published_year, ebookUrl, ebookFormat
        );

        return { success: true };
    } catch (e) {
        console.error('uploadBook error:', e);
        return { error: 'Failed to upload book' };
    }
}

export async function updateBook(formData: FormData) {
    const admin = await getAdminUser();
    if (!admin) return { error: 'Unauthorized' };

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const pages = parseInt(formData.get('pages') as string);
    const language = formData.get('language') as string;
    const published_year = parseInt(formData.get('published_year') as string);
    
    const imageFile = formData.get('image') as File;
    const ebookFile = formData.get('ebook') as File;

    try {
        let updateQuery = `
            UPDATE books SET 
            title = ?, author = ?, price = ?, category = ?, 
            description = ?, pages = ?, language = ?, published_year = ?
        `;
        const params = [title, author, price, category, description, pages, language, published_year];

        const publicPath = path.join(process.cwd(), 'public');

        if (imageFile && imageFile.size > 0) {
            const imageExt = path.extname(imageFile.name);
            const imageName = `${id}${imageExt}`;
            const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
            await writeFile(path.join(publicPath, 'covers', imageName), imageBuffer);
            updateQuery += `, image = ?`;
            params.push(`/covers/${imageName}`);
        }

        if (ebookFile && ebookFile.size > 0) {
            const ebookExt = path.extname(ebookFile.name);
            const ebookName = `${id}${ebookExt}`;
            const ebookBuffer = Buffer.from(await ebookFile.arrayBuffer());
            await writeFile(path.join(publicPath, 'ebooks', ebookName), ebookBuffer);
            updateQuery += `, ebook_url = ?, ebook_format = ?`;
            params.push(`/ebooks/${ebookName}`, ebookExt.replace('.', '').toLowerCase());
        }

        updateQuery += ` WHERE id = ?`;
        params.push(id);

        db.prepare(updateQuery).run(...params);
        return { success: true };
    } catch (e) {
        console.error('updateBook error:', e);
        return { error: 'Failed to update book' };
    }
}

export async function deleteBook(id: string) {
    const admin = await getAdminUser();
    if (!admin) return { error: 'Unauthorized' };

    try {
        db.prepare('DELETE FROM books WHERE id = ?').run(id);
        return { success: true };
    } catch (e) {
        console.error('deleteBook error:', e);
        return { error: 'Failed to delete book' };
    }
}
