# 06 - Backend Documentation

## 1. Runtime Environment
**Node.js 20+** (LTS) serves as the persistent runtime for the Bibliotheca Modern backend.
- **Server Environment**: Next.js 15 App Router.
- **Direct Access**: Database connectivity via `better-sqlite3`.

---

## 2. Persistence Layer: SQLite

### 2.1 Database Overview
A single file, `database.sqlite`, located at the project root for rapid local development and ease of backup.

### 2.2 Connection Management (`src/lib/db.ts`)
- **WAL Mode**: Write-Ahead Logging (`PRAGMA journal_mode = WAL`) is enabled to allow non-blocking concurrent read and write operations.
- **Global Cache**: In development, the database connection is cached to the `global` object to prevent redundant connections during hot reloads.

---

## 3. Data Flow Control: Server Actions
Bibliotheca Modern eschews traditional API endpoints in favor of **Server Actions**. These are type-safe, asynchronous functions with the `'use server'` directive.

| Action Category | Source | Primary Role |
| :--- | :--- | :--- |
| **Authentication** | `src/lib/auth.ts` | Login, Signup, Profile Updates, Logout. |
| **Data Fetching** | `src/lib/actions.ts` | Book Retrieval, Carousel Sync, Purchases. |
| **Admin Operations** | `src/lib/admin-actions.ts` | Upload, Edit, Delete Books. |

---

## 4. Security & Encryption
- **Authentication**: Cookie-based HttpOnly sessions (`auth_token` and `admin_token`). 
- **Hash Algorithm**: **Bcrypt** with **10 salt rounds** for password protection.
- **Role-Based Access Control**: Middleware-enforced router guards targeting specific URL prefixes (`/admin`, `/profile`).

---

## 5. File System Operations
Administrative actions (`src/lib/admin-actions.ts`) perform direct file system writes for e-book binaries and cover images into the `/public` folder using Node's `fs/promises` (`writeFile`, `mkdir`).

---
*Created for Bibliotheca Modern.*
