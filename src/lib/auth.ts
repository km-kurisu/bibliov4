'use server'

import { cookies } from 'next/headers';
import db from './db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email and password are required.' };
    }

    try {
        const user = db.prepare('SELECT * FROM profiles WHERE email = ?').get(email) as any;
        if (!user) {
            return { error: 'Invalid credentials.' };
        }

        const isValid = await bcrypt.compare(password, user.hashed_password);
        if (!isValid) {
            return { error: 'Invalid credentials.' };
        }

        (await cookies()).set('auth_token', user.id, { httpOnly: true, path: '/' });
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: 'An unexpected error occurred.' };
    }
}

export async function signupUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    console.log('signupUser started', { email, username });

    if (!email || !password || !username) {
        return { error: 'All fields are required.' };
    }

    try {
        const existing = db.prepare('SELECT id FROM profiles WHERE email = ? OR username = ?').get(email, username);
        if (existing) {
            console.log('signupUser: User already exists');
            return { error: 'Email or username already in use.' };
        }

        const id = 'user-' + Date.now();
        console.log('signupUser: Hashing password...');
        const hashed_password = await bcrypt.hash(password, 10);

        console.log('signupUser: Inserting into DB...');
        db.prepare(`
            INSERT INTO profiles (id, username, hashed_password, email)
            VALUES (?, ?, ?, ?)
        `).run(id, username, hashed_password, email);

        console.log('signupUser: Setting cookie...');
        (await cookies()).set('auth_token', id, { httpOnly: true, path: '/' });

        console.log('signupUser: Success');
        return { success: true };
    } catch (e) {
        console.error('signupUser error:', e);
        return { error: 'An unexpected error occurred.' };
    }
}

export async function logoutUser() {
    (await cookies()).delete('auth_token');
    redirect('/login');
}

export async function updateProfile(formData: FormData) {
    console.log('updateProfile started');
    const id = (await cookies()).get('auth_token')?.value;
    if (!id) {
        console.log('updateProfile: Not authenticated');
        return { error: 'Not authenticated' };
    }

    const display_name = formData.get('display_name') as string;
    const avatar_url = formData.get('avatar_url') as string;
    const bio = formData.get('bio') as string;

    try {
        console.log('updateProfile: Updating DB...', { id, display_name });
        const result = db.prepare(`
            UPDATE profiles 
            SET display_name = ?, avatar_url = ?, bio = ?
            WHERE id = ?
        `).run(display_name, avatar_url, bio, id);

        console.log('updateProfile: DB Result:', result);

        if (result.changes === 0) {
            console.error('updateProfile: No changes made to the database.');
            return { error: 'Failed to update profile: User not found or no changes provided.' };
        }

        console.log('updateProfile: Success');
        return { success: true };
    } catch (e) {
        console.error('updateProfile error:', e);
        return { error: 'Failed to update profile' };
    }
}
export async function getCurrentUser() {
    const id = (await cookies()).get('auth_token')?.value;
    if (!id) return null;

    try {
        const user = db.prepare('SELECT id, username, display_name, email, avatar_url, bio, books_read, hours_spent, reviews_count, reading_streak FROM profiles WHERE id = ?').get(id) as any;
        return user || null;
    } catch (e) {
        console.error('getCurrentUser error:', e);
        return null;
    }
}

export async function getUserLibrary() {
    const id = (await cookies()).get('auth_token')?.value;
    if (!id) return [];

    try {
        const library = db.prepare(`
            SELECT b.*, ul.status, ul.progress 
            FROM user_library ul
            JOIN books b ON ul.book_id = b.id
            WHERE ul.user_id = ?
        `).all(id) as any[];
        return library;
    } catch (e) {
        console.error('getUserLibrary error:', e);
        return [];
    }
}

export async function loginAdmin(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { error: 'Username and password are required.' };
    }

    try {
        const admin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
        if (!admin) {
            return { error: 'Invalid admin credentials.' };
        }

        const isValid = await bcrypt.compare(password, admin.hashed_password);
        if (!isValid) {
            return { error: 'Invalid admin credentials.' };
        }

        (await cookies()).set('admin_token', admin.id, { httpOnly: true, path: '/' });
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: 'An unexpected error occurred.' };
    }
}

export async function getAdminUser() {
    const id = (await cookies()).get('admin_token')?.value;
    if (!id) return null;

    try {
        const admin = db.prepare('SELECT id, username FROM admin_users WHERE id = ?').get(id) as any;
        return admin || null;
    } catch (e) {
        console.error('getAdminUser error:', e);
        return null;
    }
}

export async function logoutAdmin() {
    (await cookies()).delete('admin_token');
    redirect('/admin/login');
}
