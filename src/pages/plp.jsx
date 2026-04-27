// ─────────────────────────────────────────────────────────────
// PRODUCT LISTING PAGE — Filters sidebar, sort, grid
// ─────────────────────────────────────────────────────────────

function PLPPage() {
  const { route } = useStore();
  const cat = route.category || "all";

  // Include Unsplash API products
  const { products: apiProds = [] } =
    window.useUnsplashProducts ? window.useUnsplashProducts() : {};

  const [filters, setFilters] = React.useState({
    cats:   new Set(),
    brands: new Set(),
    sizes:  new Set(),
    colors: new Set(),
    price:  500,
    onSale: false,
  });
  const [sort,     setSort]     = React.useState("featured");
  const [sortOpen, setSortOpen] = React.useState(false);
  const [view,     setView]     = React.useState("grid");
  const [loading,  setLoading]  = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [cat]);

  // Reset filters when category changes
  React.useEffect(() => {
    setFilters({ cats: new Set(), brands: new Set(), sizes: new Set(), colors: new Set(), price: 500, onSale: false });
  }, [cat]);

  // Derived filter options
  const allCats   = ["Footwear", "Tops", "Bottoms", "Outerwear", "Dresses", "Accessories", "Beauty"];
  const allBrands = ["FT Athletic", "FT Studio", "FT Atelier", "FT Sport", "FT Outdoor", "FT Kids", "FT Beauty", "FT Collection"];
  const clothingSizes  = ["XS", "S", "M", "L", "XL"];
  const footwearSizes  = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"];
  const kidsSizes      = ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"];
  const allColors      = [...new Set(
    [...window.PRODUCTS, ...apiProds].map(p => p.color).filter(c => c && c !== "N/A" && c !== "4 Shades")
  )].sort();

  const toggleSet = (key, val) => setFilters(f => {
    const next = new Set(f[key]);
    next.has(val) ? next.delete(val) : next.add(val);
    return { ...f, [key]: next };
  });

  // ── Build product list ──────────────────────────────────
  const combinedProducts = React.useMemo(() => [...window.PRODUCTS, ...apiProds], [apiProds]);

  let products = [...combinedProducts];

  // Category pre-filter
  if (cat === "men")      products = products.filter(p => p.gender === "Men"    || p.gender === "Unisex");
  if (cat === "women")    products = products.filter(p => p.gender === "Women"  || p.gender === "Unisex");
  if (cat === "kids")     products = products.filter(p => p.gender === "Kids");
  if (cat === "beauty")   products = products.filter(p => p.cat === "Beauty");
  if (cat === "sale")     products = products.filter(p => p.oldPrice);
  if (cat === "new")      products = products.filter(p => p.badge === "NEW");
  if (cat === "footwear") products = products.filter(p => p.cat === "Footwear");

  // User filters
  if (filters.cats.size)   products = products.filter(p => filters.cats.has(p.cat));
  if (filters.brands.size) products = products.filter(p => filters.brands.has(p.brand));
  if (filters.colors.size) products = products.filter(p => filters.colors.has(p.color));
  if (filters.sizes.size)  products = products.filter(p => [...filters.sizes].some(s => p.sizes.includes(s)));
  if (filters.onSale)      products = products.filter(p => p.oldPrice);
  products = products.filter(p => p.price <= filters.price);

  // Sort
  if (sort === "price-asc")  products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "rating")     products.sort((a, b) => b.rating - a.rating);
  if (sort === "newest")     products.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));

  const sortLabels = {
    featured:    "Featured",
    newest:      "Newest",
    "price-asc": "Price: Low to high",
    "price-desc":"Price: High to low",
    rating:      "Highest rated",
  };

  const activeFilterCount =
    filters.cats.size + filters.brands.size + filters.sizes.size + filters.colors.size +
    (filters.onSale ? 1 : 0) + (filters.price < 500 ? 1 : 0);

  const catTitle = {
    men: "Men", women: "Women", kids: "Kids", beauty: "Beauty",
    sale: "Sale", new: "New In", footwear: "Footwear", all: "All",
  }[cat] || "Shop";

  const clearAll = () => setFilters({ cats: new Set(), brands: new Set(), sizes: new Set(), colors: new Set(), price: 500, onSale: false });

  return (
    <div data-screen-label="PLP" className="ft-plp">
      <div className="ft-plp-header">
        <div className="ft-breadcrumb">
          <a>Home</a> <span>/</span> <a>Shop</a> <span>/</span> <strong>{catTitle}</strong>
        </div>
        <h1 className="ft-plp-title">{catTitle}</h1>
        <p className="ft-plp-sub">{products.length} items · Updated daily · Free returns within 30 days</p>
      </div>

      <div className="ft-plp-body">
        {/* ── Filters sidebar ── */}
        <aside className="ft-filters">
          <div className="ft-filter-head">
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <button className="ft-link" onClick={clearAll}>Clear all ({activeFilterCount})</button>
            )}
          </div>

          <FilterGroup title="Category">
            {allCats.map(c => (
              <label key={c} className="ft-filter-row">
                <input type="checkbox" checked={filters.cats.has(c)} onChange={() => toggleSet("cats", c)} />
                <span className="ft-check"><Icon.Check width="12" height="12" /></span>
                <span>{c}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Brand">
            {allBrands.map(b => (
              <label key={b} className="ft-filter-row">
                <input type="checkbox" checked={filters.brands.has(b)} onChange={() => toggleSet("brands", b)} />
                <span className="ft-check"><Icon.Check width="12" height="12" /></span>
                <span>{b}</span>
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Clothing Size">
            <div className="ft-size-grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              {clothingSizes.map(s => (
                <button key={s} className={`ft-size-chip ${filters.sizes.has(s) ? "is-active" : ""}`}
                  onClick={() => toggleSet("sizes", s)}>{s}</button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Shoe Size">
            <div className="ft-size-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {footwearSizes.map(s => (
                <button key={s} className={`ft-size-chip ${filters.sizes.has(s) ? "is-active" : ""}`}
                  onClick={() => toggleSet("sizes", s)}>{s}</button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Kids Size">
            <div className="ft-size-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {kidsSizes.map(s => (
                <button key={s} className={`ft-size-chip ${filters.sizes.has(s) ? "is-active" : ""}`}
                  onClick={() => toggleSet("sizes", s)}>{s}</button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Colour">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {allColors.map(c => (
                <button key={c} className={`ft-size-chip ${filters.colors.has(c) ? "is-active" : ""}`}
                  onClick={() => toggleSet("colors", c)}
                  style={{ fontSize: 11 }}>{c}</button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Price">
            <div className="ft-price-slider">
              <div className="ft-price-row">
                <span>$0</span>
                <strong>${filters.price}</strong>
              </div>
              <input type="range" min={20} max={500} step={10} value={filters.price}
                onChange={e => setFilters({ ...filters, price: +e.target.value })} className="ft-range" />
            </div>
          </FilterGroup>

          <label className="ft-filter-row" style={{ paddingTop: 12 }}>
            <input type="checkbox" checked={filters.onSale} onChange={e => setFilters({ ...filters, onSale: e.target.checked })} />
            <span className="ft-check"><Icon.Check width="12" height="12" /></span>
            <span>On sale only</span>
          </label>
        </aside>

        {/* ── Product grid ── */}
        <div className="ft-plp-main">
          <div className="ft-plp-toolbar">
            <div className="ft-plp-chips">
              {[...filters.cats].map(c   => <button key={`c-${c}`}   className="ft-active-chip" onClick={() => toggleSet("cats",   c)}>{c}  <Icon.X width="12" height="12" /></button>)}
              {[...filters.brands].map(b => <button key={`b-${b}`}   className="ft-active-chip" onClick={() => toggleSet("brands", b)}>{b}  <Icon.X width="12" height="12" /></button>)}
              {[...filters.sizes].map(s  => <button key={`s-${s}`}   className="ft-active-chip" onClick={() => toggleSet("sizes",  s)}>{s}  <Icon.X width="12" height="12" /></button>)}
              {[...filters.colors].map(c => <button key={`cl-${c}`}  className="ft-active-chip" onClick={() => toggleSet("colors", c)}>{c}  <Icon.X width="12" height="12" /></button>)}
              {filters.onSale && <button className="ft-active-chip" onClick={() => setFilters({ ...filters, onSale: false })}>On sale <Icon.X width="12" height="12" /></button>}
            </div>
            <div className="ft-plp-toolbar-right">
              <div className="ft-view-toggle">
                <button className={view === "grid"    ? "is-active" : ""} onClick={() => setView("grid")}    aria-label="3-up grid">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="4" height="4"/><rect x="6" y="1" width="4" height="4"/><rect x="11" y="1" width="4" height="4"/><rect x="1" y="6" width="4" height="4"/><rect x="6" y="6" width="4" height="4"/><rect x="11" y="6" width="4" height="4"/><rect x="1" y="11" width="4" height="4"/><rect x="6" y="11" width="4" height="4"/><rect x="11" y="11" width="4" height="4"/></svg>
                </button>
                <button className={view === "grid-lg" ? "is-active" : ""} onClick={() => setView("grid-lg")} aria-label="2-up grid">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/><rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/></svg>
                </button>
              </div>
              <div className="ft-sort">
                <button className="ft-sort-btn" onClick={() => setSortOpen(!sortOpen)}>
                  Sort: <strong>{sortLabels[sort]}</strong> <Icon.ChevronDown width="14" height="14" />
                </button>
                {sortOpen && (
                  <div className="ft-sort-menu" onMouseLeave={() => setSortOpen(false)}>
                    {Object.entries(sortLabels).map(([k, v]) => (
                      <button key={k} className={sort === k ? "is-active" : ""}
                        onClick={() => { setSort(k); setSortOpen(false); }}>{v}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`ft-grid ${view === "grid-lg" ? "ft-grid-lg" : ""}`}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={`sk-${i}`} />)
              : products.length === 0
                ? <div className="ft-empty" style={{ gridColumn: "1/-1", padding: "60px 0", textAlign: "center" }}>
                    No products match your filters. <button className="ft-link" onClick={clearAll}>Clear all filters</button>
                  </div>
                : products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="ft-filter-group">
      <button className="ft-filter-title" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <Icon.ChevronDown width="14" height="14" style={{ transform: open ? "rotate(0)" : "rotate(-90deg)", transition: "transform .2s" }} />
      </button>
      {open && <div className="ft-filter-body">{children}</div>}
    </div>
  );
}

Object.assign(window, { PLPPage });
