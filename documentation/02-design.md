# 02 - Design Language

## 1. Visual Philosophy
**Bibliotheca Modern** blends high-end editorial design (like *Vogue* or *The New Yorker*) with cutting-edge web interactivity. The goal is to make digital reading feel as premium as a physical boutique.

---

## 2. Typography
A dual-font strategy defines the brand:
- **Headings (Serif)**: `Playfair Display`. Conveys authority, elegance, and literary tradition.
- **Body/Metadata (Sans-Serif)**: `Inter`. Focuses on high legibility, clean lines, and modern precision.

---

## 3. Color Palette
The primary theme is **Atmospheric Dark Mode**.

| Token | Hex | HSL | Usage |
| :--- | :--- | :--- | :--- |
| **Background (Default)** | `#0a191f` | `198, 51%, 8%`| Primary surface for all routes. |
| **Primary Accent** | `#00e5ff` | `186, 100%, 50%`| Hover effects, icons, and CTA focus. |
| **Surface (Secondary)** | `#112128` | `198, 40%, 11%`| Cards, Sidebars, and input fields. |
| **Text (Primary)** | `#ffffff` | `0, 0%, 100%`| Headings and primary copy. |
| **Text (Secondary)** | `#94a3b8` | `215, 25%, 63%`| Metadata (Author, Category, Price). |

---

## 4. Animation Strategy
Interactivity is designed to feel fluid and "living":
- **Staggered Entry**: GSAP timelines animate hero titles and book covers with staggered delays (0.1s increments).
- **Physical Feedback**: Book covers scale subtly (`scale(1.05)`) and add deep shadows (`shadow-2xl`) on hover to mimic a three-dimensional object.
- **Transitions**: Smooth page-level layout adjustments using Framer Motion (`layoutId` for shared element transitions).

---

## 5. UI Components
- **The "Stage" Hero**: Large-scale typography and immersive imagery.
- **Glassmorphic Navbar**: Semi-transparent backgrounds with backdrop filters for a premium layered feel.
- **Minimalist Sidebar**: High Contrast dividers and clear category labels for easy navigation.

---
*Created for Bibliotheca Modern.*
