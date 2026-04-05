-- Database Schema initialization


CREATE TABLE books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image TEXT,
    synopsis TEXT,
    pages INTEGER,
    language TEXT,
    published_year INTEGER,
    rating REAL,
    reviews_count INTEGER,
    author_bio TEXT,
    author_image TEXT,
    carousel_image TEXT,
    is_bestseller INTEGER DEFAULT 0,
    discount_percent INTEGER DEFAULT 0,
    ebook_url TEXT,
    ebook_format TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE book_keywords (
    book_id TEXT NOT NULL,
    keyword TEXT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, keyword)
);

CREATE TABLE profiles (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    display_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    books_read INTEGER DEFAULT 0,
    hours_spent INTEGER DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    reading_streak INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_library (
    user_id TEXT NOT NULL,
    book_id TEXT NOT NULL,
    status TEXT CHECK(status IN ('Reading', 'Want to Read', 'Completed', 'Purchased')) NOT NULL,
    progress INTEGER DEFAULT 0,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, book_id)
);

CREATE TABLE admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active INTEGER DEFAULT 1
);

CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);
