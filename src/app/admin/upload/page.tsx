import React from 'react';
import AdminUploadForm from '@/components/AdminUploadForm';

export default function AdminUploadPage() {
  return (
    <div className="p-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 blur-[100px] -z-10" />
        <h1 className="text-4xl font-bold tracking-tight text-white mb-3 tracking-tight">Add to Library</h1>
        <p className="text-neutral-400 font-medium max-w-md mx-auto leading-relaxed">
          Upload new digital assets, covers and metadata to broaden the collection.
        </p>
      </div>

      <AdminUploadForm />
    </div>
  );
}
