# 05 - Frontend Documentation

## 1. Framework
**Next.js 15+** is the backbone of the Bibliotheca Modern frontend.
- **App Router**: Leverages file-based routing and Server Components (`page.tsx`, `layout.tsx`).
- **Rendering Modes**:
  - **Static / SSR**: Home, Shop, and Profile routes.
  - **Dynamic (Client)**: Cart, E-book Reader, and interactive Filters.

---

## 2. Core Frontend Technologies

| Technology | Role |
| :--- | :--- |
| **Tailwind CSS 4.0** | Atomic utility classes and a custom design system. |
| **GSAP (GreenSock)** | Complex, staggered, timeline-based hero animations. |
| **Framer Motion** | Micro-interactions, hover scales, and tap feedbacks. |
| **Lucide React** | High-contrast, scalable iconography. |
| **React Reader** | EPUB rendering layer with progress tracking. |

---

## 3. Component Architecture
The frontend is built using **Atomic Component Principles**:
- **`src/components/atoms`** (if applicable): Simple UI bits like `Button`, `Badge`.
- **`src/components/molecules`**: Combined units like `ShopSidebar`, `HeroContent`.
- **`src/components/organisms`**: High-level structures like `Navbar`, `Footer`, `FeaturedBooks`.

### 3.1 Interactive States
- **Cart Tracking**: Orchestrated by `CartContext.tsx` with `localStorage` persistence.
- **Filtering Logic**: Synchronized via URL query parameters (`src/components/ShopSidebar.tsx`) to allow server-side book filtering without a dedicated client-side filter engine.

---

## 4. Navigation & Layouts
- **`layout.tsx`**: Defines the global `Navbar` and `Footer` with shared background themes.
- **`src/app/admin/layout.tsx`**: Separate layout for the administrative interface with specialized navigation and auth guards.

---

## 5. Animation Profiles
- **Hero Carousel**: Uses `gsap.timeline()` for precise, staggered entry of book titles and cover imagery.
- **Navigation Visibility**: A custom `useScrollDirection` hook hides/shows the `Navbar` based on scrolling behavior.

---
*Created for Bibliotheca Modern.*
