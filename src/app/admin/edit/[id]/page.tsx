import React from 'react';
import { getBook } from '@/lib/actions';
import AdminEditForm from '@/components/AdminEditForm';
import { notFound } from 'next/navigation';

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book = await getBook(id);
    if (!book) notFound();

    return (
        <div className="p-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10 text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 blur-[100px] -z-10" />
                <h1 className="text-4xl font-bold tracking-tight text-white mb-3">Edit Masterpiece</h1>
                <p className="text-neutral-400 font-medium max-w-md mx-auto leading-relaxed">
                    Update the metadata, artwork or digital assets for <span className="text-blue-400">"{book.title}"</span>.
                </p>
            </div>

            <AdminEditForm book={book} />
        </div>
    );
}
