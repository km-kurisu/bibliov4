const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../database.sqlite');
const SCHEMA_PATH = path.join(__dirname, '../src/lib/schema.sql');

const db = new Database(DB_PATH);

// Initialize schema
db.exec(`
    DROP TABLE IF EXISTS book_keywords;
    DROP TABLE IF EXISTS user_library;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS profiles;
    DROP TABLE IF EXISTS admin_users;
`);

const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
db.exec(schema);

const carouselMapping = {
    "Out": "/carousel/Out-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
    "Sword Art Online: Alicization": "/carousel/SAO-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
    "Bakemonogatari": "/carousel/bakemonogatari-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
    "Classroom of the Elite": "/carousel/classroomofelite-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
    "It Ends with Us": "/carousel/itendswithus-gradient-transformed.jpeg",
    "It Starts with Us": "/carousel/itstartswithus-gradient-transformed.jpeg",
    "No Longer Human": "/carousel/nolongerhuman-gradient_-_Made_with_PosterMyWall-transformed.jpeg",
    "The Wind-Up Bird Chronicle": "/carousel/thewindupbird-gradient-transformed.jpeg"
};

const rawBooks = [
    {
        id: "1",
        title: "Sword Art Online: Alicization",
        author: "Reki Kawahara",
        price: 14.99,
        category: "Fantasy",
        description: "Kirito awakens in a vast, fantastical forest filled with towering trees. In his search for clues to the nature of his surroundings, he encounters a young boy who seems to know him.",
        image: "/covers/SAOAlici.jpeg",
    },
    {
        id: "2",
        title: "Bakemonogatari",
        author: "Nisio Isin",
        price: 16.50,
        category: "Fantasy",
        description: "High school student Koyomi Araragi survives a vampire attack with the help of Meme Oshino, a strange man living in an abandoned building. Though no longer a vampire, Araragi retains supernatural abilities.",
        image: "/covers/bakemonogatari.jpeg",
    },
    {
        id: "3",
        title: "Classroom of the Elite",
        author: "Syougo Kinugasa",
        price: 13.99,
        category: "Adventure",
        description: "Kiyotaka Ayanokouji has just enrolled at Tokyo Metropolitan Advanced Nurturing High School, where it's said that 100% of students go on to college or find employment.",
        image: "/covers/classroomofelites.jpeg",
    },
    {
        id: "4",
        title: "HP and the Chamber of Secrets",
        author: "J.K. Rowling",
        price: 24.99,
        category: "Fantasy",
        description: "Harry Potter's second year at Hogwarts School of Witchcraft and Wizardry is filled with new torments and horrors, including a monstrous thing that has been released into the castle.",
        image: "/covers/harrychamberslyther.jpg",
    },
    {
        id: "5",
        title: "HP and the Goblet of Fire",
        author: "J.K. Rowling",
        price: 26.99,
        category: "Fantasy",
        description: "Harry Potter is halfway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the Quidditch World Cup.",
        image: "/covers/harrygoblethuffle.jpg",
    },
    {
        id: "6",
        title: "HP and the Half-Blood Prince",
        author: "J.K. Rowling",
        price: 25.50,
        category: "Fantasy",
        description: "The war against Voldemort is not going well; even Muggle governments are noticing. Ron scans the obituary pages of the Daily Prophet, looking for familiar names.",
        image: "/covers/harryhalfhufflepuff.jpg",
    },
    {
        id: "7",
        title: "HP and the Deathly Hallows",
        author: "J.K. Rowling",
        price: 28.99,
        category: "Fantasy",
        description: "Harry is waiting in Privet Drive. The Order of the Phoenix is coming to escort him safely away without Voldemort and his supporters knowing if they can.",
        image: "/covers/harryhallowsgryffin.jpg",
    },
    {
        id: "8",
        title: "HP and the Order of the Phoenix",
        author: "J.K. Rowling",
        price: 27.50,
        category: "Fantasy",
        description: "Harry Potter is due to start his fifth year at Hogwarts School of Witchcraft and Wizardry. He is desperate to get back to school and find out why his friends Ron and Hermione have been so secretive.",
        image: "/covers/harrypheonixraven.jpg",
    },
    {
        id: "9",
        title: "HP and the Philosopher's Stone",
        author: "J.K. Rowling",
        price: 21.99,
        category: "Fantasy",
        description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.",
        image: "/covers/harryphilosophergryff.jpg",
    },
    {
        id: "10",
        title: "HP and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        price: 23.50,
        category: "Fantasy",
        description: "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort.",
        image: "/covers/harryprisonerhufflepu.jpg",
    },
    {
        id: "11",
        title: "It Ends with Us",
        author: "Colleen Hoover",
        price: 12.99,
        category: "History",
        description: "Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants. She's come a long way from the small town in Maine where she grew up.",
        image: "/covers/itendswihtus.jpg",
    },
    {
        id: "12",
        title: "It Starts with Us",
        author: "Colleen Hoover",
        price: 13.99,
        category: "History",
        description: "Lily and her ex-husband, Ryle, have just settled into a civil coparenting rhythm when she suddenly bumps into her first love, Atlas, again.",
        image: "/covers/itstartswithus.jpeg",
    },
    {
        id: "13",
        title: "No Longer Human",
        author: "Osamu Dazai",
        price: 15.00,
        category: "History",
        description: "No Longer Human is Dazai's most famous novel, and it's also his most tragic. It tells the story of Oba Yozo, a sensitive man who feels increasingly disconnected from society.",
        image: "/covers/nolongerhuman.jpeg",
    },
    {
        id: "14",
        title: "Out",
        author: "Natsuo Kirino",
        price: 14.50,
        category: "Adventure",
        description: "Natsuo Kirino's novel tells a story of four women who work the night shift in a Japanese lunchbox factory. One of them murders her husband, and the other three help her dispose of the body.",
        image: "/covers/out.jpeg",
    },
    {
        id: "15",
        title: "The Wind-Up Bird Chronicle",
        author: "Haruki Murakami",
        price: 18.99,
        category: "History",
        description: "Toru Okada's cat has disappeared. His wife is growing increasingly distant. A mysterious woman keeps calling him on the telephone. Toru Okada's simple, quiet life is beginning to unravel.",
        image: "/covers/thewindupbird.png",
    },
];

const books = rawBooks.map(b => ({
    ...b,
    synopsis: b.description + " An incredible journey exploring deep themes.",
    pages: Math.floor(Math.random() * 300) + 200,
    language: "English",
    published_year: Math.floor(Math.random() * 30) + 1990,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews_count: Math.floor(Math.random() * 10000) + 500,
    author_bio: `${b.author} is a renowned author who has captivated readers worldwide.`,
    author_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    carousel_image: carouselMapping[b.title] || null,
    is_bestseller: Math.random() > 0.5 ? 1 : 0,
    keywords: [b.category, "Bestseller", "Featured"]
}));

const insertBook = db.prepare(`
    INSERT INTO books (id, title, author, price, category, description, image, synopsis, pages, language, published_year, rating, reviews_count, author_bio, author_image, carousel_image, is_bestseller)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertKeyword = db.prepare(`
    INSERT INTO book_keywords (book_id, keyword) VALUES (?, ?)
`);

db.transaction(() => {
    for (const book of books) {
        insertBook.run(
            book.id, book.title, book.author, book.price, book.category,
            book.description, book.image, book.synopsis, book.pages,
            book.language, book.published_year, book.rating, book.reviews_count,
            book.author_bio, book.author_image || null, book.carousel_image || null, book.is_bestseller
        );
        if (book.keywords) {
            for (const kw of book.keywords) {
                insertKeyword.run(book.id, kw);
            }
        }
    }

    // Seed Profile
    const bcrypt = require('bcryptjs');
    const hashedPass = bcrypt.hashSync('password123', 10);

    db.prepare(`
        INSERT INTO profiles (id, username, hashed_password, display_name, email, avatar_url, bio, books_read, hours_spent, reviews_count, reading_streak)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        'user-1', 'eleanor_reads', hashedPass, 'Eleanor Vance', 'eleanor@example.com',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
        'Curator of quiet stories and forgotten histories. I find solace in the smell of old paper and the silence of a library at dawn.',
        124, 856, 42, 12
    );

    // Seed Library
    const insertLibrary = db.prepare(`
        INSERT INTO user_library (user_id, book_id, status, progress)
        VALUES (?, ?, ?, ?)
    `);

    // Select some random book IDs that actually exist
    insertLibrary.run('user-1', '1', 'Reading', 65);
    insertLibrary.run('user-1', '2', 'Want to Read', 0);
    insertLibrary.run('user-1', '3', 'Completed', 100);

})();

console.log('Seeded database with FULL collection of books.');
