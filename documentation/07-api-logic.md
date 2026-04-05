# 07 - APIs & Website Working

## 1. Interaction Strategy
Bibliotheca Modern uses **Server Actions** instead of a formal JSON over HTTP API layer. These functions are directly importable and executable from both Server and Client Components.

---

## 2. Core Server Actions (Pseudo-APIs)

### 2.1 Fetching Books (`getBooks`)
- **Location**: `src/lib/actions.ts`
- **Logic**: Implements a modular SQL builder.
  - **Filtering**: By category (e.g., 'Fiction', 'Science').
  - **Price Range**: Min/Max constraints.
  - **Searching**: Pattern matching on `title` and `author`.
  - **Sorting**: Price high/low, Newest, or Rating.
- **Return Type**: `Promise<Book[]>`

### 2.2 User Authentication (`loginUser`, `signupUser`)
- **Location**: `src/lib/auth.ts`
- **Signup**:
  1. Hashes password using Bcrypt.
  2. Inserts user into `profiles` table.
  3. Sets `auth_token` cookie.
- **Login**:
  1. Queries user by email.
  2. Compares Bcrypt hash with input.
  3. Sets `auth_token` cookie on success.

### 2.3 Record Purchase (`recordPurchase`)
- **Logic**: Performs a batch insertion/update into the `user_library` table for multiple `bookIds`.
- **Constraint**: Requires a valid `auth_token` cookie.

---

## 3. Administrative API (`admin-actions.ts`)

### 3.1 Uploading Books (`uploadBook`)
- **Process**:
  1. Authenticates requester with `admin_token`.
  2. Parses multipart form-data (title, files, etc.).
  3. Writes cover image to `/public/covers/`.
  4. Writes e-book binary to `/public/ebooks/`.
  5. Inserts metadata and file paths into the `books` table.

---

## 4. Website Operational Logic
- **Initial Load**:
  - `page.tsx` calls `getCarouselItems()` and `getFeaturedBooks()`.
  - Server renders the UI with pre-fetched data.
  - GSAP triggers animations upon client hydration.
- **Catalog Navigation**:
  - `ShopSidebar` updates URL search params.
  - Next.js 15 re-executes the server-side `getBooks` call with new filters.
  - The UI updates with fresh results without a full page reload.

---
*Created for Bibliotheca Modern.*
