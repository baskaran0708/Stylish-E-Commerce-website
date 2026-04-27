// ─────────────────────────────────────────────────────────────
// Unsplash API integration
// Access Key: public (safe in browser per Unsplash guidelines)
// Secret Key: server-side only — never used here
// ─────────────────────────────────────────────────────────────

const UNSPLASH_KEY = "FUDPrIvo9zpoIeMIyyqsuiKiaWBGVOXvpzGMRPZO-l8";

// Extend the existing UNSPLASH() fn to handle full URLs returned by the API
// (API gives urls.regular = "https://images.unsplash.com/photo-xxx?ixlib=...")
const _baseFn = window.UNSPLASH;
window.UNSPLASH = function(id, w = 800) {
  if (typeof id === "string" && id.startsWith("http")) {
    const base = id.split("?")[0];
    return `${base}?w=${w}&q=80&auto=format&fit=crop`;
  }
  return _baseFn(id, w);
};

// ── Search configs ────────────────────────────────────────────
const SEARCH_CONFIGS = [
  { query: "women fashion outfit street style",     cat: "Tops",       gender: "Women",  brands: ["FT Studio", "FT Atelier"] },
  { query: "men streetwear hoodie tshirt",          cat: "Tops",       gender: "Men",    brands: ["FT Sport", "FT Studio"]   },
  { query: "running sneakers shoes fashion",        cat: "Footwear",   gender: "Unisex", brands: ["FT Athletic"]              },
  { query: "women dress elegant fashion",           cat: "Dresses",    gender: "Women",  brands: ["FT Atelier"]               },
  { query: "winter jacket coat outerwear fashion",  cat: "Outerwear",  gender: "Unisex", brands: ["FT Outdoor"]               },
  { query: "denim jeans pants street style",        cat: "Bottoms",    gender: "Men",    brands: ["FT Studio"]                },
  { query: "fashion accessories sunglasses bag",    cat: "Accessories",gender: "Unisex", brands: ["FT Studio"]                },
  { query: "women activewear sports leggings",      cat: "Bottoms",    gender: "Women",  brands: ["FT Sport"]                 },
];

const PRODUCT_NAMES = {
  Tops:        ["Oversized Tee", "Studio Sweatshirt", "Knit Polo", "Ribbed Tank", "Box Hoodie"],
  Dresses:     ["Midi Wrap Dress", "Slip Dress", "Knit Maxi", "Smock Sundress", "Cut-Out Midi"],
  Footwear:    ["Platform Trainer", "Leather Derby", "Sport Mule", "Chunky Boot", "Sock Trainer"],
  Outerwear:   ["Rain Parka", "Shearling Jacket", "Tech Windbreaker", "Wool Overcoat", "Utility Vest"],
  Bottoms:     ["Barrel-Leg Jean", "Linen Trouser", "Track Short", "Micro Skirt", "Cargo Pant"],
  Accessories: ["Bucket Hat", "Chain Belt", "Mini Tote", "Square Scarf", "Slim Wallet"],
  Beauty:      ["Glow Serum", "Tinted SPF", "Lip Gloss Set", "Eye Cream"],
};

const COLORS = ["Black", "White", "Stone", "Navy", "Olive", "Dusty Pink", "Coral", "Volt Green"];
const SIZES_CLOTHING  = ["XS", "S", "M", "L", "XL"];
const SIZES_FOOTWEAR  = ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
const PRICE_MAP = { Footwear: [95, 240], Tops: [55, 160], Dresses: [110, 320],
                    Outerwear: [150, 400], Bottoms: [75, 185], Accessories: [35, 120], Beauty: [35, 80] };

let _apiId = 2000;
function _makeProduct(photo, cfg) {
  const id   = _apiId++;
  const names = PRODUCT_NAMES[cfg.cat] || ["Seasonal Piece"];
  const brand = cfg.brands[id % cfg.brands.length];
  const [lo, hi] = PRICE_MAP[cfg.cat] || [50, 200];
  const price = lo + Math.floor(((id * 37) % (hi - lo)));
  const oldPrice = id % 4 === 0 ? Math.round(price * (1.2 + (id % 3) * 0.05)) : null;
  const altText = photo.alt_description || "";

  return {
    id,
    name: `${brand.split(" ").slice(1).join(" ")} ${names[id % names.length]}`.trim(),
    brand,
    price,
    oldPrice,
    cat: cfg.cat,
    gender: cfg.gender,
    color: COLORS[id % COLORS.length],
    images: [photo.urls.regular, photo.urls.small || photo.urls.regular],
    sizes: cfg.cat === "Footwear" ? SIZES_FOOTWEAR : SIZES_CLOTHING,
    rating: parseFloat((4.0 + ((id * 3) % 9) * 0.1).toFixed(1)),
    reviews: 40 + ((id * 7) % 860),
    desc: altText
      ? altText.charAt(0).toUpperCase() + altText.slice(1) + ". From our latest seasonal drop."
      : `Premium ${cfg.cat.toLowerCase()} from our latest seasonal collection.`,
    badge: oldPrice ? `-${Math.round((1 - price / oldPrice) * 100)}%` : (id % 6 === 0 ? "NEW" : null),
    isApiProduct: true,
  };
}

async function _fetchBatch(cfg, perPage = 4) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cfg.query)}&per_page=${perPage}&orientation=portrait&content_filter=high&client_id=${UNSPLASH_KEY}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Unsplash ${r.status}`);
  const d = await r.json();
  return (d.results || []).map(p => _makeProduct(p, cfg));
}

// Single shared promise — no duplicate fetches
let _fetchPromise = null;
async function fetchUnsplashProducts() {
  if (window.__unsplashProductCache) return window.__unsplashProductCache;
  if (!_fetchPromise) {
    _fetchPromise = Promise.all(SEARCH_CONFIGS.map(c => _fetchBatch(c, 4)))
      .then(batches => {
        const prods = batches.flat();
        window.__unsplashProductCache = prods;
        return prods;
      })
      .catch(e => {
        console.warn("Unsplash fetch failed:", e.message);
        window.__unsplashProductCache = [];
        return [];
      });
  }
  return _fetchPromise;
}

function useUnsplashProducts() {
  const [products, setProducts] = React.useState(window.__unsplashProductCache || []);
  const [loading,  setLoading]  = React.useState(!window.__unsplashProductCache);
  React.useEffect(() => {
    if (window.__unsplashProductCache) { setProducts(window.__unsplashProductCache); setLoading(false); return; }
    fetchUnsplashProducts().then(p => { setProducts(p); setLoading(false); });
  }, []);
  return { products, loading };
}

// Search photos by keyword (for hero / editorial sections)
const _searchCache = {};
async function unsplashSearch(query, count = 6) {
  if (_searchCache[query + count]) return _searchCache[query + count];
  try {
    const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&content_filter=high&client_id=${UNSPLASH_KEY}`);
    const d = await r.json();
    const result = (d.results || []).map(p => ({ url: p.urls.regular, credit: p.user?.name }));
    _searchCache[query + count] = result;
    return result;
  } catch (e) {
    return [];
  }
}

function useUnsplashSearch(query, count = 6) {
  const [photos, setPhotos] = React.useState([]);
  React.useEffect(() => {
    if (!query) return;
    unsplashSearch(query, count).then(setPhotos);
  }, [query, count]);
  return photos;
}

// Expose helpers used by pages
function getAllProducts() {
  return [...window.PRODUCTS, ...(window.__unsplashProductCache || [])];
}

Object.assign(window, { useUnsplashProducts, fetchUnsplashProducts, unsplashSearch, useUnsplashSearch, getAllProducts, UNSPLASH_KEY });
