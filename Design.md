# Bibliotheca Modern - Design Specifications

## 1. Visual Strategy
The design of Bibliotheca Modern is centered around **"Architectural Elegance"**. It draws inspiration from high-end archives, boutique bookstores, and editorial typography. The goal is to provide a serene, premium atmosphere that highlights the "physicality" of digital books through depth, shadows, and meaningful motion.

---

## 2. Color Palette
The application uses a primary "Deep Sea" palette with high-contrast accent colors for navigation and critical actions.

| Category | Color Name | Hex Code | Usage |
|---|---|---|---|
| **Primary Background** | Dark Archive | `#0a191f` | Main page backgrounds, sections. |
| **Secondary Background** | Studio Slate | `#1e293b` | Cards, secondary UI elements. |
| **Foreground / Text** | Paper White | `#f8fafc` | Primary body text, headings. |
| **Secondary Text** | Mist Grey | `#94a3b8` | Metadata, captions, disabled states. |
| **Accent / Action** | Electric Cyan | `#22d3ee` | Buttons, links, hover states, branding. |
| **Bestseller Accent** | Gold Sand | `#f3e8d2` | Featured icons, user avatars, profile accents. |

---

## 3. Typography
The typography system uses a pairing of high-contrast Serif and Sans-Serif fonts to maintain readability while establishing a premium brand voice.

### 3.1 Primary Fonts
- **Serif (Headings)**: `Melodrama` / `Playfair Display`
  - Usage: H1, H2, H3, Page Titles.
  - Character: Elegant, authoritative, and traditional yet modern.
- **Display (Hero)**: `Aktura`
  - Usage: Main banner titles, promotional headers.
  - Character: Artistic, high-contrast, atmospheric.
- **Accent (Metadata)**: `Rosaline`
  - Usage: Category tags, "Selection" labels, ornamental text.
- **Sans-Serif (Body)**: `Inter`
  - Usage: Body copy, navigation menu, forms, numeric data.
  - Character: Highly legible at small sizes, modern, neutral.

### 3.2 Type Scale
- **Display (Hero)**: `4rem` (Mobile) / `6rem` (Desktop), tracking `-0.02em`.
- **H1**: `3.5rem`, tracking `-0.01em`.
- **H2**: `2.25rem`.
- **Body**: `1rem` (16px), line-height `1.6`.
- **Caption/Tag**: `0.75rem` (12px), uppercase, tracking `0.1em`.

---

## 4. UI Components & Layouts
### 4.1 Grid System
- **Desktop**: 12-column grid with `3rem` gutters.
- **Container**: Max-width of `1400px`, centered.
- **Mobile**: Single column grid with `1.5rem` side margins.

### 4.2 Buttons & Interactions
- **Primary Button**: Rounded-full (`9999px`), background `Electric Cyan`, text `Dark Archive`, bold.
- **Icon Button**: Circular, border `Studio Slate`, background `glass` effect on hover.
- **Hover Transitions**: `all 300ms cubic-bezier(0.4, 0, 0.2, 1)` for fluid transitions.

### 4.3 Depth & Elevation
- **Card Design**: Subtle `glass` effect implemented via `backdrop-blur-md` and `1px` translucent borders.
- **Elevation**: Usage of `shadow-2xl` on book covers to simulate physical height on the page.

---

## 5. Mobile Responsiveness
The site follows a "Desktop-First, Mobile-Optimized" approach to maintain the complex animations while ensuring functionality.

- **Navbar**: Transitions to a sticky layout; search often collapses into an icon or expands on tap.
- **Hero Carousel**: Aspect ratio changes from `25:9` (Desktop) to `1:1` or `16:9` (Mobile) to preserve cover visibility.
- **Catalog**: Grids collapse from 3 columns (Desktop) to 2 columns (Tablet) and 1 column (Mobile).
- **Touch Targets**: All interactive elements (Cart, Profile, Add to Cart) maintain a minimum of `44x44px` clickable area.

---

## 6. Motion & Animation Principles
- **Entrance**: Staggered fades and slides for lists using GSAP `stagger`.
- **Feedback**: Immediate scale-down effect (`scale-95`) on button clicks.
- **Ambient**: Subtle "Float" animations on floating UI elements or empty states to keep the page feeling alive.
- **Navigation**: Page transitions use Framer Motion for smooth route hydration.
