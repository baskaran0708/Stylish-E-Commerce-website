// ─────────────────────────────────────────────────────────────
// ProductCard (with image swap, wishlist, quick view, add to cart)
// + QuickView modal + Skeletons
// ─────────────────────────────────────────────────────────────

function ProductCard({ product, density = "spacious", style: cardStyle }) {
  const { navigate, wishlist, toggleWishlist, addToCart, setQuickView } = useStore();
  const [hover, setHover] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const isWish = wishlist.has(product.id);
  const imgA = UNSPLASH(product.images[0], 700);
  const imgB = UNSPLASH(product.images[1] || product.images[0], 700);

  const aspect = density === "compact" ? "3 / 4" : "4 / 5";
  const padBlock = density === "compact" ? 10 : 14;

  return (
    <article
      className="ft-card"
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="ft-card-media" style={{ aspectRatio: aspect }}>
        {!imgLoaded && <div className="ft-skel" style={{ position: "absolute", inset: 0 }} />}
        <img src={imgA} alt={product.name} loading="lazy" onLoad={() => setImgLoaded(true)}
          className="ft-card-img" style={{ opacity: hover ? 0 : 1 }}
          onClick={() => navigate({ name: "pdp", productId: product.id })} />
        <img src={imgB} alt="" loading="lazy" aria-hidden
          className="ft-card-img" style={{ opacity: hover ? 1 : 0 }}
          onClick={() => navigate({ name: "pdp", productId: product.id })} />

        {product.badge && (
          <span className={`ft-card-badge ${product.badge.startsWith("-") ? "ft-card-badge-sale" : ""}`}>
            {product.badge}
          </span>
        )}

        <button className={`ft-card-wish ${isWish ? "is-active" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label="Wishlist">
          {isWish ? <Icon.HeartFill width="18" height="18" /> : <Icon.Heart width="18" height="18" />}
        </button>

        <div className="ft-card-overlay" style={{ transform: hover ? "translateY(0)" : "translateY(100%)" }}>
          <button className="ft-card-quick" onClick={(e) => { e.stopPropagation(); setQuickView(product.id); }}>
            <Icon.Eye width="14" height="14" /> Quick view
          </button>
          <button className="ft-card-add" onClick={(e) => { e.stopPropagation(); addToCart(product.id, product.sizes[0]); }}>
            <Icon.Bag width="14" height="14" /> Add to bag
          </button>
        </div>
      </div>

      <div className="ft-card-info" style={{ paddingBlock: padBlock }}
        onClick={() => navigate({ name: "pdp", productId: product.id })}>
        <div className="ft-card-meta">
          <span className="ft-card-brand">{product.brand}</span>
          <span className="ft-card-rating"><Icon.Star width="11" height="11" /> {product.rating}</span>
        </div>
        <h3 className="ft-card-name">{product.name}</h3>
        <div className="ft-card-price-row">
          <span className="ft-card-price">${product.price}</span>
          {product.oldPrice && <span className="ft-card-old">${product.oldPrice}</span>}
          <span className="ft-card-color">{product.color}</span>
        </div>
      </div>
    </article>
  );
}

// ── Skeleton card ──
function ProductCardSkeleton() {
  return (
    <div className="ft-card">
      <div className="ft-skel" style={{ aspectRatio: "4/5", borderRadius: 4 }} />
      <div style={{ paddingBlock: 14, display: "grid", gap: 6 }}>
        <div className="ft-skel" style={{ height: 12, width: "40%" }} />
        <div className="ft-skel" style={{ height: 16, width: "85%" }} />
        <div className="ft-skel" style={{ height: 14, width: "30%" }} />
      </div>
    </div>
  );
}

// ── QuickView modal ──
function QuickView() {
  const { quickView, setQuickView, addToCart, navigate } = useStore();
  const product = quickView != null ? window.PRODUCTS.find((p) => p.id === quickView) : null;
  const [size, setSize] = React.useState(null);
  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    if (product) { setSize(null); setImgIdx(0); }
  }, [product?.id]);

  if (!product) return null;

  return (
    <div className="ft-modal-overlay" onClick={() => setQuickView(null)}>
      <div className="ft-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ft-modal-close" onClick={() => setQuickView(null)}>
          <Icon.X width="20" height="20" />
        </button>
        <div className="ft-quickview">
          <div className="ft-quickview-images">
            <div className="ft-quickview-main">
              <img src={UNSPLASH(product.images[imgIdx], 900)} alt={product.name} />
            </div>
            <div className="ft-quickview-thumbs">
              {product.images.map((id, i) => (
                <button key={i} className={`ft-quickview-thumb ${i === imgIdx ? "is-active" : ""}`}
                  onClick={() => setImgIdx(i)}>
                  <img src={UNSPLASH(id, 200)} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="ft-quickview-info">
            <div className="ft-quickview-brand">{product.brand}</div>
            <h2 className="ft-quickview-name">{product.name}</h2>
            <div className="ft-quickview-rating">
              <Stars value={product.rating} size={14} />
              <span>{product.rating} · {product.reviews} reviews</span>
            </div>
            <div className="ft-quickview-price">
              <span className="ft-card-price" style={{ fontSize: 28 }}>${product.price}</span>
              {product.oldPrice && <span className="ft-card-old" style={{ fontSize: 18 }}>${product.oldPrice}</span>}
            </div>
            <p className="ft-quickview-desc">{product.desc}</p>

            <div className="ft-size-block">
              <div className="ft-size-label">
                <span>Select size</span>
                <a className="ft-link">Size guide</a>
              </div>
              <div className="ft-size-grid">
                {product.sizes.map((s) => (
                  <button key={s} className={`ft-size-chip ${size === s ? "is-active" : ""}`}
                    onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="ft-quickview-actions">
              <button className="ft-btn ft-btn-primary"
                disabled={!size}
                onClick={() => { addToCart(product.id, size); setQuickView(null); }}>
                {size ? "Add to bag" : "Select a size"}
              </button>
              <button className="ft-btn ft-btn-ghost"
                onClick={() => { navigate({ name: "pdp", productId: product.id }); setQuickView(null); }}>
                View details <Icon.ArrowRight width="14" height="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProductCard, ProductCardSkeleton, QuickView });
