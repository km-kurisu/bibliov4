# Bibliotheca Modern - Project Overview

Bibliotheca Modern is a high-end, cinematic e-commerce platform for literary treasures. It combines a minimalist, premium aesthetic with robust modern web technologies to create a "sanctuary" for readers.

## 🏛 Architecture & Philosophy
The application is built on the philosophy of **visual excellence** and **functional simplicity**. It uses a dark-themed, serif-heavy design language (Glassmorphism + Dark Mode) to evoke the feeling of a private, high-end archive.

## 🛠 Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: SQLite (managed via `better-sqlite3`)
- **Styling**: Tailwind CSS (Current implementation)
- **Animations**: Framer Motion & GSAP (for cinematic transitions)
- **Icons**: Lucide React
- **Deployment**: Docker Standalone + Nginx Reverse Proxy

## ✨ Core Features
- **Cinematic Hero**: An auto-sweeping GSAP-powered carousel showcasing curated selections.
- **Dynamic Catalog**: A shared-gallery experience with real-time filtering and sorting.
- **Persistent Cart**: A global state-managed shopping bag that persists across sessions via local storage.
- **Secure Checkout**: A simulated high-end payment flow with tax calculations and instant record-keeping.
- **User Sanctuaries (Profiles)**: Personalized user profiles where acquired books are permanently added to a private "Purchased" collection.
- **Dynamic Routing**: Instant-load product detail pages featuring synopsis, reviews, and related archives.

## ⚙️ How It Works

### Database Layer
The system uses a flat-file SQLite database located at `database.sqlite`. 
- **WAL Mode**: Enabled for high-performance concurrent reads and writes, preventing "database locked" errors in production.
- **Persistence**: Managed through server actions that interface directly with the database on the server side.

### Authentication
A custom authentication flow using `bcryptjs` for password hashing and `httpOnly` cookies for session management. It ensures that user libraries and profiles are secure and private.

### Global State
The shopping cart and real-time UI updates (like the bag count in the navigation) are handled by a Custom React Context (`CartContext`), ensuring a seamless experience without page reloads.

### Deployment
The application is containerized using a multi-stage Docker build, optimized for Debian-based environments using Nginx as a reverse proxy for SSL and header management.

---
*Created by Antigravity for Bibliotheca Modern.*
