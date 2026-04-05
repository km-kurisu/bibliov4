# 01 - Technical Documentation

## Overview
Bibliotheca Modern is a high-end digital bookstore platform designed for speed, security, and an immersive literary experience. The project emphasizes low-latency data access and a "server-first" rendering paradigm.

---

## Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15.1.6 (App Router) |
| **Language** | TypeScript 5.0+ |
| **Runtime** | Node.js 20+ (LTS) |
| **Database** | SQLite (Better-SQLite3) |
| **Styling** | Tailwind CSS 4.0 |
| **Animations** | GSAP 3.14, Framer Motion 12.3 |
| **E-book Engine** | Epub.js, React Reader |

---

## Project Structure
- **/scripts/**: Database maintenance, migrations, and seeding scripts.
- **/public/**: High-resolution cover images (`/covers`) and e-book binaries (`/ebooks`).
- **/src/app/**: Core routing and server-side rendering logic.
- **/src/components/**: Atomic UI components (Hero, ShopSidebar, Navbar, etc.).
- **/src/lib/**: Data access layer, authentication logic, and Server Actions.
- **/src/context/**: Global client-side state (Shopping Cart).

---

## Local Setup
1. **Clone & Install**: `npm install`
2. **Environment**: Ensure `.env` contains any necessary secrets (if applicable).
3. **Seeding**: Run `node scripts/seed-db.js` to initialize the SQLite database.
4. **Run**: `npm run dev` to start the development server at `http://localhost:3000`.

---
*Created for Bibliotheca Modern.*
