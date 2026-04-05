import React from 'react';
import { getBook } from '@/lib/actions';
import EbookReader from '@/components/EbookReader';
import { notFound } from 'next/navigation';

export default async function ReaderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book = await getBook(id);
    
    if (!book || !book.ebook_url) {
        // For testing, I'll use a public domain EPUB if no URL is present
        // but only for development
        if (process.env.NODE_ENV === 'development') {
           const testUrl = 'https://react-reader.metabright.com/static/alice.epub';
           return <EbookReader url={testUrl} title={book?.title || 'Unknown Title'} />;
        }
        notFound();
    }

    return (
        <EbookReader url={book.ebook_url} title={book.title} />
    );
}
