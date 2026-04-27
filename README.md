# fashion/trend — Premium E-Commerce Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![Unsplash API](https://img.shields.io/badge/Unsplash-API%20Integrated-111?logo=unsplash)](https://unsplash.com/developers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A high-performance, **zero-build-step** fashion e-commerce frontend built with React 18, Babel Standalone, and the Unsplash API. 20+ static products supplemented by 30+ dynamically fetched API products. Full checkout flow, wishlist, multi-filter PLP, dark mode, and Vercel-ready deployment — no Node.js, no bundler, no configuration.

---

## Screenshots

### Hero — Full-bleed animated slider
![Hero Section](./screenshots/Screenshot%202026-04-27%20234908.png)

### Home — Shop by Category grid
![Category Grid](./screenshots/Screenshot%202026-04-27%20234932.png)

---

## Architecture Overview

This project deliberately forgoes a bundler build pipeline (Webpack, Vite, etc.) in favour of **Babel Standalone** loaded from CDN. Every `.jsx` file is transpiled in the browser at runtime. This gives:

- **Zero local tooling required** — a Python/Node static file server is sufficient
- **Instant Vercel deployment** — drop the folder, it works
- **Transparent source** — what you read is exactly what runs; no emitted artefacts

Global state is wired through **React Context** (`src/store/store.jsx`). Cross-file communication uses `window.*` assignments (each module exports its public API onto `window` after Babel transpiles it). This is intentional and idiomatic for CDN-React single-page apps.

---

## Tech Stack

| Concern           | Choice                          | Version  |
|-------------------|---------------------------------|----------|
| UI Framework      | React (CDN, UMD build)          | 18.3.1   |
| JSX Transpilation | Babel Standalone (CDN)          | 7.29.0   |
| Styling           | Vanilla CSS + custom properties | —        |
| Dynamic Images    | Unsplash API                    | v1       |
| Fonts             | Google Fonts (Archivo + Inter)  | —        |
| Deployment        | Vercel (static)                 | —        |
| Dev tooling       | Python `http.server` or `npx serve` | —   |

---

## Project Structure

```
fashion-trend/
│
├── index.html                  # ✅ Production entry — no canvas, no tweaks
├── fashion-trend.html          # 🛠  Dev entry — canvas + tweaks-panel enabled
├── vercel.json                 # Vercel static site config
├── .gitignore
├── README.md
│
├── screenshots/                # Project screenshots (used in README + og:image)
│   ├── Screenshot 2026-04-27 234908.png
│   └── Screenshot 2026-04-27 234932.png
│
├── src/                        # All application source
│   │
│   ├── data/
│   │   └── products.jsx        # Static catalog — 20 products across 7 categories
│   │                           # Defines: PRODUCTS, CATEGORIES, REVIEWS, UNSPLASH()
│   │
│   ├── api/
│   │   └── unsplash.jsx        # Unsplash API integration
│   │                           # Fetches 30+ dynamic products via 8 search configs
│   │                           # Exports: useUnsplashProducts, unsplashSearch,
│   │                           #          getAllProducts, fetchUnsplashProducts
│   │
│   ├── store/
│   │   └── store.jsx           # Global state via React Context
│   │                           # Cart, wishlist, routing, dark mode, toasts, orders
│   │                           # Exports: StoreProvider, useStore
│   │
│   ├── ui/
│   │   ├── shared.jsx          # Design primitives
│   │   │                       # Icon (SVG set), Stars, Logo, Toasts,
│   │   │                       # SearchOverlay, Navbar, Footer
│   │   └── product-card.jsx    # ProductCard, ProductCardSkeleton, QuickView
│   │
│   ├── pages/
│   │   ├── home.jsx            # Hero slider, category grid, trending carousel,
│   │   │                       # promo banners, Unsplash-powered infinite grid
│   │   ├── plp.jsx             # Product listing — full filter suite:
│   │   │                       # category, brand, clothing/shoe/kids sizes,
│   │   │                       # colour, price range, on-sale toggle
│   │   ├── pdp.jsx             # Product detail — image gallery + zoom,
│   │   │                       # size picker, description/details/reviews tabs,
│   │   │                       # related products
│   │   ├── cart.jsx            # Bag — quantity controls, promo code,
│   │   │                       # order summary, free-shipping progress bar
│   │   ├── wishlist.jsx        # Saved items grid, move-to-bag
│   │   ├── checkout.jsx        # 2-step checkout (shipping → payment)
│   │   │                       # Card / PayPal / Apple Pay UI
│   │   └── order.jsx           # Order confirmation with ref, delivery date, items
│   │
│   ├── app.jsx                 # Root shell — theme vars, font injection, routing,
│   │                           # conditional canvas mode (dev only)
│   └── styles/
│       └── main.css            # Global stylesheet — tokens, layout, components
│
└── dev/                        # Design tooling — NOT loaded in production
    ├── design-canvas.jsx       # Multi-artboard overview of all screens
    └── tweaks-panel.jsx        # Live accent / font / density switcher
```

---

## Features

### Pages & User Flows
| Route         | Component              | Description |
|---------------|------------------------|-------------|
| `/`           | `pages/home.jsx`       | Hero, categories, trending carousel, promo banners, infinite product grid |
| PLP           | `pages/plp.jsx`        | Filterable, sortable product listing |
| PDP           | `pages/pdp.jsx`        | Product detail with zoom, size guide, reviews |
| Cart          | `pages/cart.jsx`       | Bag management, promo codes, order summary |
| Wishlist      | `pages/wishlist.jsx`   | Saved products, move to bag |
| Checkout      | `pages/checkout.jsx`   | 2-step form: shipping + payment |
| Order         | `pages/order.jsx`      | Confirmation with order ref, delivery estimate |

### Product Catalog
- **20 static products** across Men, Women, Kids, Beauty, Footwear, Accessories, Dresses, Tops, Bottoms, Outerwear
- **30+ dynamic API products** fetched from Unsplash across 8 fashion search queries
- Infinite scroll on the home grid — interleaves static + API products for variety

### Filter System (PLP)
- Category (7 types)
- Brand (8 brands)
- Clothing sizes: XS → XL
- Footwear sizes: UK 6 → UK 12
- Kids sizes: 3-4Y → 11-12Y
- Colour
- Price range slider ($0–$500)
- On-sale toggle
- Active filter chips with individual clear
- Sort: Featured / Newest / Price ↑↓ / Highest rated

### UX Patterns
- Dark / light mode toggle (persists across navigation)
- Quick-view modal (add to bag without leaving PLP)
- Toast notifications (add to bag, wishlist, order placed)
- Live search with product suggestions
- Product image hover swap
- Image zoom on PDP (hover to zoom)
- Promo code (15% off on any code)
- Free-shipping progress bar in cart

### Dev Mode (fashion-trend.html only)
- **Canvas view** — all 7 screens rendered as artboards side-by-side
- **Tweaks panel** — live accent colour (Pink / Volt / Coral / Mono), font pairing, density

---

## Getting Started

### Prerequisites

None. No Node.js, no npm, no build tools required.

### Local Development

```bash
# Option A — Python (built-in, no install)
python -m http.server 3000

# Option B — Node
npx serve . -p 3000

# Option C — VS Code Live Server
# Right-click index.html → Open with Live Server
```

Open **http://localhost:3000** for production mode.  
Open **http://localhost:3000/fashion-trend.html** for dev mode (canvas + tweaks).

> Files must be served over HTTP — not opened as `file://` — because Babel Standalone fetches module sources via `fetch()`.

---

## Deployment

### Vercel (recommended)

```bash
# One-time setup
npm i -g vercel

# Deploy
cd "path/to/project"
vercel --prod
```

Or drag-and-drop the project folder at [vercel.com/new](https://vercel.com/new).

`vercel.json` is pre-configured for static output:

```json
{
  "version": 2,
  "buildCommand": null,
  "outputDirectory": ".",
  "cleanUrls": true
}
```

---

## Unsplash API Integration

**File:** `src/api/unsplash.jsx`

The integration is split into two layers:

### 1. Static CDN images (zero API calls)
Existing product images use Unsplash CDN URLs directly — no auth required:
```js
// src/data/products.jsx
const UNSPLASH = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
```

### 2. Dynamic API products
On page load, `fetchUnsplashProducts()` searches 8 fashion queries and generates fully-formed product objects:
```js
// 8 queries × 4 results each = up to 32 dynamic products
const SEARCH_CONFIGS = [
  { query: "women fashion outfit street style", cat: "Tops", gender: "Women", ... },
  { query: "running sneakers shoes fashion",    cat: "Footwear", ...               },
  // ...
];
```

API products are cached in `window.__unsplashProductCache` — the network request fires once per session regardless of how many components call `useUnsplashProducts()`.

**Credentials:**
```
Application ID : 936880
Access Key     : stored in src/api/unsplash.jsx (client-safe per Unsplash guidelines)
Secret Key     : server-side only — never committed
```

---

## State Management

Single `React.createContext` store in `src/store/store.jsx`. All pages consume it via `useStore()`.

```
State shape
├── route          { name, productId?, category? }  — client-side routing
├── cart           [{ productId, size, qty }]
├── wishlist       Set<productId>
├── dark           boolean
├── toasts         [{ id, title, body, kind }]
├── quickView      productId | null
├── searchOpen     boolean
└── orderRef       { ref, items, total, deliveryDate, formData } | null

Actions
├── navigate(route)
├── addToCart(productId, size, qty?)
├── removeFromCart(productId, size)
├── updateQty(productId, size, delta)
├── clearCart()
├── toggleWishlist(productId)
├── placeOrder(formData)        → clears cart, sets orderRef, navigates to /order
└── pushToast({ title, body, kind })
```

---

## Design System

All design tokens are CSS custom properties set on `.ft-app` by `src/app.jsx`:

```css
--accent        /* Primary action colour: #ff1f6c (pink default) */
--accent-soft   /* Tinted background for accent elements          */
--font-display  /* Heading typeface: Archivo (default)            */
--font-body     /* Body typeface: Inter                           */
```

Available accent themes: `pink` · `volt` · `coral` · `mono`  
Available font pairs: `Archivo/Inter` · `Bebas Neue/Inter` · `Anton/Inter` · `Space Grotesk/Inter`

---

## Browser Compatibility

| Browser | Minimum version |
|---------|----------------|
| Chrome  | 90+            |
| Firefox | 88+            |
| Safari  | 14+            |
| Edge    | 90+            |

Requires: CSS custom properties, `IntersectionObserver`, `fetch`, ES2020.

---

## Roadmap

- [ ] Replace Babel Standalone with a proper Vite build for production performance
- [ ] Add React Router for deep-linkable URLs
- [ ] Persist cart + wishlist to `localStorage`
- [ ] Add size guide modal
- [ ] Integrate Stripe Elements for real payment processing
- [ ] Add recently-viewed products rail

---

## License

MIT © 2026 fashion/trend studios
