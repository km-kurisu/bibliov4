# Database Structure

## 1. Overview
Bibliotheca uses a single-file **SQLite** database, chosen for its zero-configuration simplicity and high-speed local read/write performance. The database file is located at `database.sqlite` in the root of the project.

---

## 2. Configuration (`src/lib/db.ts`)
The connection is managed via `better-sqlite3`, a high-performance SQLite client for Node.js.

- **WAL Mode**: Enabled (`PRAGMA journal_mode = WAL`) to allow concurrent reads even during heavy write operations.
- **Connection Reuse**: The database instance is cached globally in development (`global.db`) to prevent "too many open connections" during Next.js Hot Module Replacement (HMR).

---

## 3. Schema Design
The schema is defined in `src/lib/schema.sql` and follows a relational structure optimized for an e-commerce platform.

### 3.1 Core Tables
| Table Name | Primary Key | Description |
|---|---|---|
| **`books`** | `id` (TEXT) | Primary product table storing titles, authors, prices, images, descriptions, and metadata. |
| **`book_keywords`** | `(book_id, keyword)` | Many-to-one mapping of search keywords to books. |
| **`profiles`** | `id` (TEXT) | User profile data including hashed passwords, usernames, and metrics like `hours_spent` and `reading_streak`. |
| **`user_library`** | `(user_id, book_id)` | Junction table mapping users to their books. Tracks ownership status (Reading, Purchased, etc.). |
| **`admin_users`** | `id` (TEXT) | Specialized table for administrative portal access. |

---

## 4. Key Relationships
- **`books` ↔ `book_keywords`**: One-To-Many relationship joined on `book_id`.
- **`profiles` ↔ `user_library` ↔ `books`**: Many-To-Many relationship enabling a user to have multiple books and a book to be owned by multiple users.
- **Foreign Keys**: Cascading deletes are enabled (`ON DELETE CASCADE`) to maintain integrity between parent/child tables.

---

## 5. Persistence & Integrity
- **Password Security**: Passwords in `profiles` and `admin_users` are stored as **Bcrypt** hashes.
- **Defaults**: Tables utilize default values (e.g., `0` for `discount_percent`, `CURRENT_TIMESTAMP` for `created_at`) to ensure data consistency without manual input.
- **Constraints**: Email and Username fields must be **Unique** across all user entries.

---

## 6. Seed & Migration
- **Script**: `scripts/seed-db.js`
- **Utility**: Reads `src/lib/schema.sql`, initializes the tables, and populates the database with initial book data and administrative accounts.
