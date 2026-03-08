const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'database.sqlite');
const SCHEMA_PATH = path.join(__dirname, 'src/lib/schema.sql');

try {
    if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
    const db = new Database(DB_PATH);
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    console.log('Schema OK');

    const insertBook = db.prepare(`
        INSERT INTO books (id, title, author, price, category, description, image, synopsis, pages, language, published_year, rating, reviews_count, author_bio, author_image, carousel_image, is_bestseller)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertBook.run(
        'test-id', 'Test Title', 'Test Author', 15.00, 'Test category',
        'Test desc', '/test.jpg', 'Test synopsis', 300, 'English', 2024, 4.5, 100,
        'Bio', '/author.jpg', '/carousel.jpg', 1
    );
    console.log('Insert OK');
} catch (e) {
    console.error('ERROR:', e.message);
    console.error(e.stack);
}
