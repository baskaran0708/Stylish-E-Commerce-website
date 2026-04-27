// ─────────────────────────────────────────────────────────────
// Static catalog — Unsplash photo IDs, real product data
// API products are appended at runtime by unsplash.jsx
// ─────────────────────────────────────────────────────────────

const UNSPLASH = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const PRODUCTS = [
  // ── Existing 12 ──────────────────────────────────────────
  {
    id: 1, name: "Aero Tech Knit Runner", brand: "FT Athletic", price: 189, oldPrice: 240,
    cat: "Footwear", gender: "Unisex", color: "Volt",
    images: ["1542291026-7eec264c27ff", "1606107557195-0e29a4b5b4aa", "1551107696-a4b0c5a0d9a2"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    badge: "NEW", rating: 4.8, reviews: 1284,
    desc: "Engineered knit upper. Carbon-infused plate. Built for tempo days and the long haul alike.",
  },
  {
    id: 2, name: "Heavyweight Box Tee", brand: "FT Studio", price: 64,
    cat: "Tops", gender: "Unisex", color: "Bone",
    images: ["1521572163474-6864f9cf17ab", "1583743814966-8936f5b7be1a", "1622445275576-721325763afe"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6, reviews: 892,
    desc: "320 GSM combed cotton. Boxy fit. Drop shoulder. Wash and wear forever.",
  },
  {
    id: 3, name: "Pleated Wide-Leg Trouser", brand: "FT Atelier", price: 142,
    cat: "Bottoms", gender: "Women", color: "Ink",
    images: ["1594633312681-425c7b97ccd1", "1551316679-9c6ae9dec224", "1548883354-94bcfe321cab"],
    sizes: ["24", "26", "28", "30", "32"],
    rating: 4.7, reviews: 412,
    desc: "Italian wool blend. Knife-pressed pleats. Tailored for the long lunch and the late train.",
  },
  {
    id: 4, name: "Oversized Cropped Hoodie", brand: "FT Sport", price: 118, oldPrice: 145,
    cat: "Outerwear", gender: "Women", color: "Hot Pink",
    images: ["1556821840-3a9fbc8e0b2a", "1620799140408-edc6dcb6d633", "1551488831-00ddcb6c6bd3"],
    sizes: ["XS", "S", "M", "L"],
    badge: "-18%", rating: 4.9, reviews: 2104,
    desc: "Fleece-backed terry. Cropped silhouette. Built for the cool-down, stays in the rotation.",
  },
  {
    id: 5, name: "Court Classic Low Sneaker", brand: "FT Athletic", price: 96,
    cat: "Footwear", gender: "Men", color: "White",
    images: ["1600185365483-26d7a4cc7519", "1595950653106-6c9ebd614d3a", "1525966222134-fcfa99b8ae77"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    rating: 4.5, reviews: 3201,
    desc: "Full-grain leather. Vulcanised rubber sole. The court silhouette, redrawn for the street.",
  },
  {
    id: 6, name: "Relaxed Carpenter Jean", brand: "FT Studio", price: 128,
    cat: "Bottoms", gender: "Men", color: "Indigo",
    images: ["1542272604-787c3835535d", "1604176354204-9268737828e4", "1582418702059-97ebd0ac3e9b"],
    sizes: ["28", "30", "32", "34", "36"],
    badge: "NEW", rating: 4.4, reviews: 567,
    desc: "13oz Japanese denim. Carpenter loops. Roomy thigh, tapered ankle. Breaks in beautifully.",
  },
  {
    id: 7, name: "Featherweight Puffer", brand: "FT Outdoor", price: 224, oldPrice: 280,
    cat: "Outerwear", gender: "Unisex", color: "Black",
    images: ["1551488831-00ddcb6c6bd3", "1539533018447-63fcce2678e3", "1544022613-e87ca75a784a"],
    sizes: ["S", "M", "L", "XL"],
    badge: "-20%", rating: 4.8, reviews: 743,
    desc: "800-fill recycled down. Ripstop nylon shell. Packs into its own pocket. Goes everywhere.",
  },
  {
    id: 8, name: "Logo Crew Sock 3-Pack", brand: "FT Sport", price: 28,
    cat: "Accessories", gender: "Unisex", color: "White",
    images: ["1586350977771-2c0c3aabaf7d", "1582966772680-86fb37a0e8e6", "1598970434795-0c54fe7c0648"],
    sizes: ["S/M", "L/XL"],
    rating: 4.6, reviews: 1893,
    desc: "Cushioned heel and toe. Mesh top for breathability. The everyday sock, properly done.",
  },
  {
    id: 9, name: "Silk Blend Slip Dress", brand: "FT Atelier", price: 168,
    cat: "Dresses", gender: "Women", color: "Champagne",
    images: ["1539109136881-3be0616acf4b", "1566174053879-31528523f8ae", "1495121605193-b116b5b9c5fe"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7, reviews: 318,
    desc: "Bias-cut silk blend. Adjustable straps. The dress that does cocktails and Sunday brunch.",
  },
  {
    id: 10, name: "Field Cotton Cap", brand: "FT Outdoor", price: 38,
    cat: "Accessories", gender: "Unisex", color: "Stone",
    images: ["1588850561407-ed78c282e89b", "1521369909029-2afed882baee", "1556306535-0f09a537f0a3"],
    sizes: ["One Size"],
    rating: 4.3, reviews: 902,
    desc: "Washed cotton twill. Self-fabric strap. Earns its patina. Pairs with everything.",
  },
  {
    id: 11, name: "Tailored Blazer", brand: "FT Atelier", price: 298, oldPrice: 360,
    cat: "Outerwear", gender: "Women", color: "Charcoal",
    images: ["1591047139829-d91aecb6caea", "1548625149-fc4a29cf7092", "1490481651871-ab68de25d43d"],
    sizes: ["XS", "S", "M", "L"],
    badge: "-17%", rating: 4.9, reviews: 234,
    desc: "Single-breasted. Soft-shoulder construction. The blazer that earns its hanger space.",
  },
  {
    id: 12, name: "Tech Cargo Short", brand: "FT Sport", price: 78,
    cat: "Bottoms", gender: "Men", color: "Olive",
    images: ["1591195853828-11db59a44f6b", "1565693413579-8a73fff4dec5", "1521572163474-6864f9cf17ab"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5, reviews: 678,
    desc: "4-way stretch ripstop. Bonded cargo pockets. From the trail to the terrace, no notes.",
  },

  // ── Kids ─────────────────────────────────────────────────
  {
    id: 13, name: "Kids Graphic Tee", brand: "FT Kids", price: 34,
    cat: "Tops", gender: "Kids", color: "White",
    images: ["1521572163474-6864f9cf17ab", "1583743814966-8936f5b7be1a"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    badge: "NEW", rating: 4.8, reviews: 312,
    desc: "100% organic cotton. Bold prints that wash and wear. Kids will actually want to wear it.",
  },
  {
    id: 14, name: "Kids Fleece Jogger", brand: "FT Kids", price: 48,
    cat: "Bottoms", gender: "Kids", color: "Grey Marl",
    images: ["1594633312681-425c7b97ccd1", "1548883354-94bcfe321cab"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    rating: 4.6, reviews: 189,
    desc: "Soft-shell fleece. Adjustable waistband. Elastic cuffs. Machine washable at 40°.",
  },
  {
    id: 15, name: "Kids Low Trainer", brand: "FT Athletic", price: 72, oldPrice: 85,
    cat: "Footwear", gender: "Kids", color: "White/Blue",
    images: ["1542291026-7eec264c27ff", "1606107557195-0e29a4b5b4aa"],
    sizes: ["UK J11", "UK J12", "UK 1", "UK 2", "UK 3", "UK 4"],
    badge: "-15%", rating: 4.7, reviews: 421,
    desc: "Cushioned sole. Velcro closure for easy on/off. From first steps to full sprints.",
  },
  {
    id: 16, name: "Kids Puffer Jacket", brand: "FT Outdoor", price: 89, oldPrice: 110,
    cat: "Outerwear", gender: "Kids", color: "Navy",
    images: ["1551488831-00ddcb6c6bd3", "1539533018447-63fcce2678e3"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    badge: "-19%", rating: 4.9, reviews: 567,
    desc: "Lightweight warmth. Water-resistant shell. Easy zip entry. Built for every adventure.",
  },

  // ── Beauty ───────────────────────────────────────────────
  {
    id: 17, name: "SPF 50 Daily Moisturiser", brand: "FT Beauty", price: 42,
    cat: "Beauty", gender: "Unisex", color: "N/A",
    images: ["1556228720-195a672e8a03", "1522337360947-c2b4cd24b9cb"],
    sizes: ["30ml", "50ml", "100ml"],
    badge: "NEW", rating: 4.8, reviews: 1204,
    desc: "Broad-spectrum SPF 50. Lightweight, non-greasy. Wears under makeup. For every skin tone.",
  },
  {
    id: 18, name: "Hyaluronic Acid Serum", brand: "FT Beauty", price: 68,
    cat: "Beauty", gender: "Unisex", color: "N/A",
    images: ["1522337360947-c2b4cd24b9cb", "1556228720-195a672e8a03"],
    sizes: ["15ml", "30ml"],
    rating: 4.9, reviews: 892,
    desc: "3-weight hyaluronic complex. 72h hydration. Fragrance-free. Dermatologist tested.",
  },
  {
    id: 19, name: "Clean Matte Lip Set", brand: "FT Beauty", price: 38,
    cat: "Beauty", gender: "Women", color: "4 Shades",
    images: ["1556228720-195a672e8a03", "1522337360947-c2b4cd24b9cb"],
    sizes: ["One Size"],
    badge: "NEW", rating: 4.6, reviews: 423,
    desc: "Four everyday shades. Long-wear transfer-proof formula. Clean ingredients throughout.",
  },
  {
    id: 20, name: "Overnight Repair Mask", brand: "FT Beauty", price: 58,
    cat: "Beauty", gender: "Unisex", color: "N/A",
    images: ["1566174053879-31528523f8ae", "1556228720-195a672e8a03"],
    sizes: ["50ml"],
    rating: 4.7, reviews: 634,
    desc: "Retinol + peptide complex. Wake up to visibly smoother, firmer skin. Clinically proven.",
  },
];

const CATEGORIES = [
  { id: "men",    label: "Men",    img: "1617137968427-85924c800a22", count: "1,284" },
  { id: "women",  label: "Women",  img: "1581044777550-4cfa60707c03", count: "1,892" },
  { id: "kids",   label: "Kids",   img: "1518831959646-742c3a14ebf7", count: "642"   },
  { id: "beauty", label: "Beauty", img: "1522335789203-aaa90c4e3e83", count: "418"   },
];

const REVIEWS = [
  { name: "Maya R.",   rating: 5, date: "2 weeks ago",  title: "Daily driver",            body: "Wore these on a half marathon and a coffee run. They handled both. Sizing is spot-on — order your usual." },
  { name: "Jordan T.", rating: 5, date: "1 month ago",  title: "Worth every dollar",      body: "The knit is softer than expected and the plate is noticeable on faster efforts. Stylish enough for the gym AND the airport." },
  { name: "Aisha K.",  rating: 4, date: "3 weeks ago",  title: "Great, break-in needed",  body: "Took about 20km to feel right. Now they're my favourite. Would buy again." },
];

Object.assign(window, { PRODUCTS, CATEGORIES, REVIEWS, UNSPLASH });
