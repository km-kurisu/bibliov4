import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { BadgeCheck, Grid, List, User, Unlock, Palette, LogOut, ChevronRight } from "lucide-react";
import { getCurrentUser, getUserLibrary, logoutUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getCurrentUser();
    const library = await getUserLibrary();

    if (!user) {
        redirect("/login");
    }

    const reading = library.filter(b => b.status === 'Reading');
    const purchased = library.filter(b => b.status === 'Purchased');

    return (
        <main className="min-h-screen bg-[#0a191f] selection:bg-cyan-500/30 font-sans text-slate-100 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:px-20 lg:px-40 mt-20">
                {/* Profile Header */}
                <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    <div className="relative">
                        <div className="size-32 md:size-40 rounded-full border-4 border-cyan-500/20 p-1">
                            <Image
                                className="h-full w-full rounded-full object-cover"
                                alt={user.display_name || user.username}
                                src={user.avatar_url || "/assets/avatar.png"}
                                width={160} height={160}
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-cyan-500 text-[#0a191f] rounded-full p-1.5 border-4 border-[#0a191f]">
                            <BadgeCheck className="size-4 stroke-[3]" />
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-end gap-3 mb-4">
                            <h1 className="text-4xl font-bold font-serif text-slate-100">{user.display_name || user.username}</h1>
                            <span className="text-cyan-400 font-medium mb-1">@{user.username}</span>
                        </div>
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mb-6">
                            {user.bio || "No bio yet. Tell the world about your library."}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button className="px-6 py-2 bg-cyan-500 text-[#0a191f] font-bold rounded-lg hover:brightness-110 transition-all">Edit Profile</button>
                            <button className="px-6 py-2 bg-cyan-500/10 text-cyan-400 font-bold rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-all">Share Shelf</button>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <div className="liquid-glass p-6 rounded-xl flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-cyan-400 mb-1">{user.books_read || 0}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Books Read</span>
                    </div>
                    <div className="liquid-glass p-6 rounded-xl flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-cyan-400 mb-1">{user.hours_spent || 0}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Hours Spent</span>
                    </div>
                    <div className="liquid-glass p-6 rounded-xl flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-cyan-400 mb-1">{user.reviews_count || 0}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Reviews</span>
                    </div>
                    <div className="liquid-glass p-6 rounded-xl flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-cyan-400 mb-1">{user.reading_streak || 0}</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Reading Streak</span>
                    </div>
                </section>

                {/* Currently Reading */}
                {reading.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold font-serif text-slate-100">Currently Reading</h3>
                            <a className="text-cyan-400 hover:underline text-sm font-medium" href="#">View all activity</a>
                        </div>
                        <div className="flex overflow-x-auto gap-8 pb-6 quiet-scroll snap-x">
                            {reading.map((book) => (
                                <div key={book.id} className="flex-none w-72 group snap-start">
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                        <Image className="object-cover" alt={book.title} src={book.image} fill />
                                    </div>
                                    <div className="px-1">
                                        <h4 className="text-slate-100 font-bold font-serif text-lg mb-1 group-hover:text-cyan-400 transition-colors truncate">{book.title}</h4>
                                        <p className="text-slate-500 text-sm mb-3">{book.author}</p>
                                        <div className="w-full bg-cyan-500/10 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${book.progress || 0}%` }}></div>
                                        </div>
                                        <p className="text-[10px] text-cyan-400 mt-2 font-bold uppercase tracking-tighter">{book.progress || 0}% Completed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Purchased Books */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8 text-center md:text-left">
                        <h3 className="text-2xl font-bold font-serif text-slate-100">Purchased Books</h3>
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"><Grid className="size-5" /></button>
                            <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"><List className="size-5" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {purchased.length > 0 ? purchased.map((book) => (
                            <Link key={book.id} href={`/shop/${book.id}`} className="liquid-glass rounded-xl p-3 group cursor-pointer hover:bg-cyan-500/10 transition-all block">
                                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                                    <Image className="object-cover group-hover:scale-110 transition-all duration-500" alt={book.title} src={book.image} fill />
                                </div>
                                <h5 className="text-slate-100 text-sm font-bold font-serif truncate">{book.title}</h5>
                                <p className="text-slate-500 text-[10px] truncate uppercase tracking-widest">{book.author}</p>
                            </Link>
                        )) : (
                            <p className="text-slate-500 col-span-full py-12 text-center liquid-glass rounded-xl uppercase tracking-widest text-[10px] font-bold">Your library is empty. Secure some treasures from the shop!</p>
                        )}
                    </div>
                </section>

                {/* Settings / Account Actions */}
                <section className="border-t border-cyan-500/10 pt-12">
                    <h3 className="text-2xl font-bold font-serif text-slate-100 mb-8">Account Settings</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="liquid-glass rounded-xl p-6 flex items-center justify-between hover:border-cyan-500/30 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                    <User className="size-6" />
                                </div>
                                <div>
                                    <h6 className="font-bold text-slate-100">Personal Information</h6>
                                    <p className="text-slate-500 text-xs">Email, name, and bio details</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </div>

                        <div className="liquid-glass rounded-xl p-6 flex items-center justify-between hover:border-cyan-500/30 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                    <Unlock className="size-6" />
                                </div>
                                <div>
                                    <h6 className="font-bold text-slate-100">Privacy & Security</h6>
                                    <p className="text-slate-500 text-xs">Password and visibility controls</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </div>

                        <div className="liquid-glass rounded-xl p-6 flex items-center justify-between hover:border-cyan-500/30 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                    <Palette className="size-6" />
                                </div>
                                <div>
                                    <h6 className="font-bold text-slate-100">Library Theme</h6>
                                    <p className="text-slate-500 text-xs">Customize your bookshelf aesthetic</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </div>

                        <form action={logoutUser} className="liquid-glass rounded-xl p-6 flex items-center justify-between hover:border-red-500/30 transition-all cursor-pointer group w-full">
                            <button type="submit" className="flex items-center justify-between w-full h-full">
                                <div className="flex items-center gap-4">
                                    <div className="bg-red-500/10 p-3 rounded-lg text-red-500 group-hover:bg-red-500/20 transition-colors">
                                        <LogOut className="size-6" />
                                    </div>
                                    <div className="text-left">
                                        <h6 className="font-bold text-red-400">Sign Out</h6>
                                        <p className="text-slate-500 text-xs">Exit your library session</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-600 group-hover:text-red-400 transition-colors" />
                            </button>
                        </form>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}

import Link from "next/link";
