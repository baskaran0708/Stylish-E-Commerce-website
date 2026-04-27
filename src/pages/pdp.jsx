// ─────────────────────────────────────────────────────────────
// PRODUCT DETAIL PAGE — Gallery + zoom + lightbox, sizes, reviews
// ─────────────────────────────────────────────────────────────

// Inject lightbox styles once
;(function() {
  if (document.getElementById("ft-lightbox-style")) return;
  const s = document.createElement("style");
  s.id = "ft-lightbox-style";
  s.textContent = `
    .ft-lightbox {
      position: fixed; inset: 0; z-index: 9000;
      background: rgba(0,0,0,.96);
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-out; animation: ftLbIn .2s ease;
    }
    @keyframes ftLbIn { from { opacity:0 } to { opacity:1 } }
    .ft-lightbox img {
      max-width: 90vw; max-height: 88vh;
      object-fit: contain; border-radius: 6px;
      cursor: default; display: block;
    }
    .ft-lightbox-close {
      position: fixed; top: 20px; right: 20px;
      background: rgba(255,255,255,.12); border: 0; color: #fff;
      width: 44px; height: 44px; border-radius: 50%; z-index: 9001;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    .ft-lightbox-close:hover { background: rgba(255,255,255,.25); }
    .ft-lightbox-nav {
      position: fixed; top: 50%; transform: translateY(-50%);
      background: rgba(255,255,255,.12); border: 0; color: #fff;
      width: 48px; height: 48px; border-radius: 50%; z-index: 9001;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    .ft-lightbox-nav:hover { background: rgba(255,255,255,.25); }
    .ft-lightbox-prev { left: 20px; }
    .ft-lightbox-next { right: 20px; }
    .ft-lightbox-counter {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      color: rgba(255,255,255,.5); font-size: 13px; font-family: var(--font-body);
    }
  `;
  document.head.appendChild(s);
})();

function PDPPage() {
  const { route, navigate, addToCart, wishlist, toggleWishlist } = useStore();
  const productId = route.productId || 1;

  // Use getAllProducts so API products are found too
  const allProds  = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
  const product   = allProds.find(p => p.id === productId) || allProds[0];

  const [imgIdx,   setImgIdx]   = React.useState(0);
  const [size,     setSize]     = React.useState(null);
  const [zoom,     setZoom]     = React.useState({ active: false, x: 50, y: 50 });
  const [tab,      setTab]      = React.useState("desc");
  const [lightbox, setLightbox] = React.useState(false);
  const isWish = wishlist.has(product.id);

  React.useEffect(() => { setImgIdx(0); setSize(null); setLightbox(false); }, [productId]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = e => {
      if (e.key === "Escape")      setLightbox(false);
      if (e.key === "ArrowRight")  setImgIdx(i => Math.min(i + 1, product.images.length - 1));
      if (e.key === "ArrowLeft")   setImgIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, product.images.length]);

  const onMouseMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ active: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  // Related products — also search across all (static + API)
  const related = allProds.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  if (related.length < 4) related.push(...allProds.filter(p => p.id !== product.id).slice(0, 4 - related.length));

  return (
    <div data-screen-label="PDP" className="ft-pdp">
      {/* Lightbox */}
      {lightbox && (
        <div className="ft-lightbox" onClick={() => setLightbox(false)}>
          <button className="ft-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close">
            <Icon.X width="20" height="20" />
          </button>
          {product.images.length > 1 && imgIdx > 0 && (
            <button className="ft-lightbox-nav ft-lightbox-prev"
              onClick={e => { e.stopPropagation(); setImgIdx(i => i - 1); }} aria-label="Previous">
              <Icon.ArrowLeft width="20" height="20" />
            </button>
          )}
          <img
            src={UNSPLASH(product.images[imgIdx], 2400)}
            alt={product.name}
            onClick={e => e.stopPropagation()}
          />
          {product.images.length > 1 && imgIdx < product.images.length - 1 && (
            <button className="ft-lightbox-nav ft-lightbox-next"
              onClick={e => { e.stopPropagation(); setImgIdx(i => i + 1); }} aria-label="Next">
              <Icon.ArrowRight width="20" height="20" />
            </button>
          )}
          {product.images.length > 1 && (
            <div className="ft-lightbox-counter">
              {imgIdx + 1} / {product.images.length} · Press Esc to close
            </div>
          )}
        </div>
      )}

      <div className="ft-breadcrumb" style={{ padding: "16px 60px 0" }}>
        <a onClick={() => navigate("home")}>Home</a> <span>/</span>
        <a onClick={() => navigate({ name: "plp", category: "all" })}>{product.cat}</a> <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <div className="ft-pdp-main">
        <div className="ft-pdp-gallery">
          <div className="ft-pdp-thumbs">
            {product.images.map((id, i) => (
              <button key={i} className={`ft-pdp-thumb ${i === imgIdx ? "is-active" : ""}`}
                onClick={() => setImgIdx(i)}>
                <img src={UNSPLASH(id, 200)} alt="" />
              </button>
            ))}
          </div>

          {/* Main image — hover to zoom, click to expand */}
          <div className="ft-pdp-image"
            onMouseMove={onMouseMove}
            onMouseLeave={() => setZoom({ ...zoom, active: false })}
            onClick={() => setLightbox(true)}
            style={{ cursor: "zoom-in" }}>
            <img
              src={UNSPLASH(product.images[imgIdx], 1200)}
              alt={product.name}
              style={{
                transformOrigin: `${zoom.x}% ${zoom.y}%`,
                transform: zoom.active ? "scale(1.7)" : "scale(1)",
                pointerEvents: "none",
              }}
            />
            <span className="ft-pdp-zoom-hint">
              <Icon.ZoomIn width="14" height="14" /> Click to expand · Hover to zoom
            </span>
            {product.badge && (
              <span className={`ft-card-badge ${product.badge.startsWith("-") ? "ft-card-badge-sale" : ""}`}
                style={{ top: 20, left: 20, fontSize: 12 }}>{product.badge}</span>
            )}
          </div>
        </div>

        <div className="ft-pdp-info">
          <div className="ft-pdp-brand">{product.brand}</div>
          <h1 className="ft-pdp-title">{product.name}</h1>
          <div className="ft-pdp-rating">
            <Stars value={product.rating} size={14} />
            <span>{product.rating}</span>
            <a className="ft-link">{product.reviews} reviews</a>
            <span className="ft-pdp-color">· {product.color}</span>
          </div>
          <div className="ft-pdp-price">
            <span className="ft-card-price" style={{ fontSize: 32 }}>${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="ft-card-old" style={{ fontSize: 18 }}>${product.oldPrice}</span>
                <span className="ft-pdp-savings">Save ${product.oldPrice - product.price}</span>
              </>
            )}
          </div>
          <p className="ft-pdp-desc">{product.desc}</p>

          <div className="ft-size-block">
            <div className="ft-size-label">
              <span>Size</span>
              <a className="ft-link">Size guide</a>
            </div>
            <div className="ft-size-grid">
              {product.sizes.map(s => (
                <button key={s} className={`ft-size-chip ${size === s ? "is-active" : ""}`}
                  onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="ft-pdp-actions">
            <button className="ft-btn ft-btn-primary ft-btn-lg"
              disabled={!size}
              onClick={() => addToCart(product.id, size)}>
              <Icon.Bag width="16" height="16" /> {size ? "Add to bag" : "Select a size"}
            </button>
            <button className="ft-btn ft-btn-dark ft-btn-lg"
              disabled={!size}
              onClick={() => { addToCart(product.id, size); navigate("cart"); }}>
              Buy now
            </button>
            <button className={`ft-btn ft-btn-outline ft-btn-lg ft-btn-icon ${isWish ? "is-active" : ""}`}
              onClick={() => toggleWishlist(product.id)} aria-label="Wishlist">
              {isWish ? <Icon.HeartFill width="18" height="18" /> : <Icon.Heart width="18" height="18" />}
            </button>
          </div>

          <div className="ft-pdp-perks">
            <div><Icon.Truck  width="18" height="18" /><div><strong>Free shipping</strong><span>On orders $120+</span></div></div>
            <div><Icon.Return width="18" height="18" /><div><strong>30-day returns</strong><span>Free, no questions</span></div></div>
            <div><Icon.Shield width="18" height="18" /><div><strong>Authenticity</strong><span>Guaranteed genuine</span></div></div>
          </div>

          <div className="ft-pdp-tabs">
            {[["desc","Description"],["details","Details & Care"],["reviews",`Reviews (${product.reviews})`]].map(([k,l]) => (
              <button key={k} className={`ft-pdp-tab ${tab === k ? "is-active" : ""}`} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <div className="ft-pdp-tabbody">
            {tab === "desc" && (
              <div>
                <p>{product.desc}</p>
                <p>Designed in our LA studio. Tested by athletes, dancers, and people who walk a lot. Built to last beyond the season.</p>
              </div>
            )}
            {tab === "details" && (
              <ul className="ft-pdp-details-list">
                <li><span>Material</span><strong>Recycled tech blend (62% poly, 38% nylon)</strong></li>
                <li><span>Fit</span><strong>True to size · Regular</strong></li>
                <li><span>Care</span><strong>Cold wash inside-out · Hang dry</strong></li>
                <li><span>Origin</span><strong>Designed in LA · Made in Portugal</strong></li>
                <li><span>SKU</span><strong>FT-{String(product.id).toString().padStart(5, "0")}</strong></li>
              </ul>
            )}
            {tab === "reviews" && (
              <div className="ft-reviews">
                <div className="ft-reviews-summary">
                  <div className="ft-reviews-num">{product.rating.toFixed(1)}</div>
                  <Stars value={product.rating} size={18} />
                  <div className="ft-reviews-count">Based on {product.reviews} reviews</div>
                </div>
                <div className="ft-reviews-list">
                  {window.REVIEWS.map((r, i) => (
                    <div key={i} className="ft-review">
                      <div className="ft-review-head">
                        <strong>{r.name}</strong>
                        <Stars value={r.rating} size={11} />
                        <span className="ft-review-date">{r.date}</span>
                      </div>
                      <div className="ft-review-title">{r.title}</div>
                      <p>{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="ft-section">
        <div className="ft-section-head">
          <div>
            <div className="ft-eyebrow">You might also</div>
            <h2 className="ft-h2">Pair it with</h2>
          </div>
        </div>
        <div className="ft-grid">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PDPPage });
