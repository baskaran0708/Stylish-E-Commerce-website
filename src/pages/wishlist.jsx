// ─────────────────────────────────────────────────────────────
// WISHLIST PAGE
// ─────────────────────────────────────────────────────────────

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, navigate } = useStore();
  const allProds = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
  const items = allProds.filter(p => wishlist.has(p.id));

  if (items.length === 0) {
    return (
      <div data-screen-label="Wishlist" className="ft-cart-empty">
        <div className="ft-cart-empty-inner">
          <Icon.Heart width="48" height="48" />
          <h1>Your wishlist is empty</h1>
          <p>Save your favourites here and come back when you're ready. Free shipping on $120+.</p>
          <button className="ft-btn ft-btn-primary ft-btn-lg" onClick={() => navigate("home")}>
            Discover new styles <Icon.ArrowRight width="16" height="16" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-screen-label="Wishlist" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div className="ft-plp-header">
        <h1 className="ft-plp-title">Wishlist</h1>
        <p className="ft-plp-sub">{items.length} saved item{items.length !== 1 && "s"}</p>
      </div>

      <div className="ft-grid" style={{ marginTop: 32 }}>
        {items.map(product => (
          <WishlistCard key={product.id} product={product}
            onRemove={() => toggleWishlist(product.id)}
            onAddToBag={() => { addToCart(product.id, product.sizes[0]); }}
            onView={() => navigate({ name: "pdp", productId: product.id })} />
        ))}
      </div>

      <div style={{ marginTop: 48, display: "flex", gap: 12 }}>
        <button className="ft-btn ft-btn-primary" onClick={() => navigate({ name: "plp", category: "all" })}>
          Continue shopping <Icon.ArrowRight width="16" height="16" />
        </button>
        <button className="ft-btn ft-btn-outline" onClick={() => navigate("cart")}>
          View bag
        </button>
      </div>
    </div>
  );
}

function WishlistCard({ product, onRemove, onAddToBag, onView }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article className="ft-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="ft-card-media" style={{ aspectRatio: "4/5", cursor: "pointer" }} onClick={onView}>
        <img src={UNSPLASH(product.images[0], 700)} alt={product.name}
          className="ft-card-img" style={{ opacity: hover ? 0 : 1 }} />
        <img src={UNSPLASH(product.images[1] || product.images[0], 700)} alt=""
          className="ft-card-img" style={{ opacity: hover ? 1 : 0 }} />
        {product.badge && (
          <span className={`ft-card-badge ${product.badge.startsWith("-") ? "ft-card-badge-sale" : ""}`}>
            {product.badge}
          </span>
        )}
        <button className="ft-card-wish is-active" onClick={e => { e.stopPropagation(); onRemove(); }} aria-label="Remove from wishlist">
          <Icon.HeartFill width="18" height="18" />
        </button>
        <div className="ft-card-overlay" style={{ transform: hover ? "translateY(0)" : "translateY(100%)" }}>
          <button className="ft-card-quick" onClick={e => { e.stopPropagation(); onView(); }}>
            <Icon.Eye width="14" height="14" /> View product
          </button>
          <button className="ft-card-add" onClick={e => { e.stopPropagation(); onAddToBag(); }}>
            <Icon.Bag width="14" height="14" /> Add to bag
          </button>
        </div>
      </div>
      <div className="ft-card-info" style={{ paddingBlock: 14 }} onClick={onView}>
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

Object.assign(window, { WishlistPage });
