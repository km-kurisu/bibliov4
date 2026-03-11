# API Routing & Data Flow

## 1. Architecture: Server-First Data Flow
Bibliotheca uses a modern **Server Component (RSC)** first architecture. Most data fetching happens directly on the server, minimizing client-side JavaScript and maximizing SEO and performance.

### 1.1 Unidirectional Data Stream
1.  **Request Phase**: The browser requests a URL (e.g., `/shop/123`).
2.  **Server Resolve**: Next.js App Router resolves the route in `src/app`.
3.  **Direct Fetch**: The Server Component calls an asynchronous function in `src/lib/actions.ts`.
4.  **Database Access**: `better-sqlite3` queries the local `database.sqlite` file.
5.  **Streaming & Rendering**: The server renders the HTML with the data injected and streams it to the client.
6.  **Hydration**: Client Components (like `AddToCartButton`) become interactive.

---

## 2. Server Actions (Pseudo-API)
Instead of traditional REST API endpoints (`/api/books`), Bibliotheca uses **React Server Actions**. These are type-safe functions defined with `'use server'` that can be called from both client and server components.

| Action | Path | Description |
|---|---|---|
| `getBooks` | `src/lib/actions.ts` | Fetches filtered & sorted list of books. |
| `getBook` | `src/lib/actions.ts` | Retrieves a single book by ID with keywords/reviews. |
| `recordPurchase`| `src/lib/actions.ts` | Records a book in the `user_library` table for a specific user. |
| `getFeatured` | `src/lib/actions.ts` | Fetches books marked as `is_bestseller`. |

---

## 3. Client State Management
While the bulk of data is server-driven, interactivity is managed via **React Context**:

- **CartContext (`src/context/CartContext.tsx`)**:
  - Manages the local shopping cart state.
  - Persists data to `localStorage` (Offline-first approach).
  - Synchronizes the "Bag" count in the `Navbar`.

---

## 4. Routing Structure
| Route | Type | Description |
|---|---|---|
| `/` | SSR | Hero section, featured collections. |
| `/shop` | SSR | Full catalog with server-side filtering. |
| `/shop/[id]` | SSR | Detail view for specific literary works. |
| `/cart` | Client | Shopping bag overview and checkout preparation. |
| `/profile` | SSR | User library, stats, and personalized selections. |
| `/login` / `/signup` | Hybrid | Authentication and account management. |

---

## 5. Security Flow
1.  **Auth**: Managed via `src/lib/auth.ts` and `middleware.ts`.
2.  **Session**: Uses `httpOnly` cookies to store JWT/Session tokens.
3.  **Middleware**: Checks the cookie for protected routes like `/profile`.
4.  **Validation**: All Server Actions perform user-id validation before database mutations.
