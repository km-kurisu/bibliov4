# 08 - Common Questions (FAQs)

## 1. General Questions

### 1.1 What is the primary technology stack?
Bibliotheca Modern uses **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS 4.0**, and **SQLite (better-sqlite3)**.

### 1.2 Can I use a traditional SQL server like PostgreSQL?
Yes, the data flow is abstracted within `src/lib/actions.ts` and `src/lib/db.ts`. You can replace the SQLite connection and SQL strings with a PostgreSQL client, though it would require more extensive environment configuration.

---

## 2. Technical Troubleshooting

### 2.1 Why are no books showing on the Home or Shop page?
You likely haven't seeded the database. Run `node scripts/seed-db.js` at the root of the project to initialize the schema and populate the library.

### 2.2 How do I reset the admin password?
The admin password can be updated directly in the `admin_users` table using a SQLite client (like `sqlite3` or DB Browser for SQLite). You will need a freshly hashed Bcrypt string.

### 2.3 Why is my e-book not loading in the Reader?
Check that the `ebook_url` in the `books` table correctly points to `/ebooks/<filename>.epub` and that the file exists in the `public/ebooks/` directory.

---

## 3. Deployment & Security

### 3.1 Is the checkout process currently live?
The current implementation handles purchasing as a "registration" in the `user_library` table for testing and development. For production, you would need to integrate a payment gateway like **Stripe** or **Braintree** in `src/app/checkout/page.tsx`.

### 3.2 How secure is the password storage?
Very secure. Passwords are never stored as plain text. They are salted and hashed using the **Bcrypt** algorithm before being written to the database.

### 3.3 Can multiple admins manage the site?
Yes, the `admin_users` table supports multiple entries, each with their own unique ID and password.

---

## 4. Performance

### 4.1 How fast is the database access?
Since SQLite is file-based and runs in the same process as the Node.js runtime, read operations are typically under 1-5ms. Write operations are slightly slower but optimized using **WAL (Write-Ahead Logging)** mode.

---
*Created for Bibliotheca Modern.*
