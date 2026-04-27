// ─────────────────────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────────────────────

function CartPage() {
  const { cart, updateQty, removeFromCart, navigate, cartTotal } = useStore();
  const [promo, setPromo] = React.useState("");
  const [promoApplied, setPromoApplied] = React.useState(false);

  const allProds = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
  const items = cart.map((c) => ({
    ...c,
    product: allProds.find((p) => p.id === c.productId),
  })).filter((c) => c.product);

  const subtotal = cartTotal;
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 12;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shipping + tax;

  if (items.length === 0) {
    return (
      <div data-screen-label="Cart" className="ft-cart-empty">
        <div className="ft-cart-empty-inner">
          <Icon.Bag width="48" height="48" />
          <h1>Your bag is empty</h1>
          <p>Once you add something, it'll show up here. Free shipping on orders over $120.</p>
          <button className="ft-btn ft-btn-primary ft-btn-lg" onClick={() => navigate("home")}>
            Start shopping <Icon.ArrowRight width="16" height="16" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-screen-label="Cart" className="ft-cart">
      <div className="ft-cart-head">
        <h1 className="ft-plp-title">Your bag</h1>
        <p className="ft-plp-sub">{items.reduce((n, x) => n + x.qty, 0)} items · Reserved for 60 minutes</p>
      </div>

      <div className="ft-cart-body">
        <div className="ft-cart-items">
          <div className="ft-cart-thead">
            <span>Item</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          {items.map((it) => (
            <div key={`${it.productId}-${it.size}`} className="ft-cart-item">
              <div className="ft-cart-item-product">
                <button className="ft-cart-item-img" onClick={() => navigate({ name: "pdp", productId: it.product.id })}>
                  <img src={UNSPLASH(it.product.images[0], 300)} alt="" />
                </button>
                <div className="ft-cart-item-info">
                  <div className="ft-card-brand">{it.product.brand}</div>
                  <button className="ft-cart-item-name"
                    onClick={() => navigate({ name: "pdp", productId: it.product.id })}>
                    {it.product.name}
                  </button>
                  <div className="ft-cart-item-meta">
                    <span>Size <strong>{it.size}</strong></span>
                    <span>·</span>
                    <span>{it.product.color}</span>
                  </div>
                  <div className="ft-cart-item-actions">
                    <button className="ft-link" onClick={() => removeFromCart(it.productId, it.size)}>Remove</button>
                    <span className="ft-cart-sep">·</span>
                    <button className="ft-link">Save for later</button>
                  </div>
                </div>
              </div>
              <div className="ft-qty">
                <button onClick={() => updateQty(it.productId, it.size, -1)} aria-label="Decrease">
                  <Icon.Minus width="14" height="14" />
                </button>
                <span>{it.qty}</span>
                <button onClick={() => updateQty(it.productId, it.size, 1)} aria-label="Increase">
                  <Icon.Plus width="14" height="14" />
                </button>
              </div>
              <div className="ft-cart-item-total">
                <strong>${(it.product.price * it.qty).toLocaleString()}</strong>
                {it.qty > 1 && <span className="ft-cart-item-each">${it.product.price} each</span>}
              </div>
            </div>
          ))}
        </div>

        <aside className="ft-cart-summary">
          <h3>Order summary</h3>

          <div className="ft-cart-promo">
            <input placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
            <button onClick={() => setPromoApplied(promo.trim().length > 0)} disabled={!promo.trim()}>Apply</button>
          </div>
          {promoApplied && (
            <div className="ft-cart-promo-active">
              <Icon.Check width="14" height="14" /> 15% off applied · "{promo}"
              <button onClick={() => { setPromoApplied(false); setPromo(""); }}><Icon.X width="14" height="14" /></button>
            </div>
          )}

          <div className="ft-cart-line"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
          {discount > 0 && <div className="ft-cart-line ft-cart-line-discount"><span>Discount</span><span>−${discount}</span></div>}
          <div className="ft-cart-line"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
          <div className="ft-cart-line"><span>Estimated tax</span><span>${tax}</span></div>
          <div className="ft-cart-divider" />
          <div className="ft-cart-total"><span>Total</span><span>${total.toLocaleString()}</span></div>

          {subtotal < 120 && (
            <div className="ft-cart-progress">
              <div className="ft-cart-progress-text">
                Add <strong>${120 - subtotal}</strong> more for free shipping
              </div>
              <div className="ft-cart-progress-bar">
                <div style={{ width: `${Math.min(100, (subtotal / 120) * 100)}%` }} />
              </div>
            </div>
          )}

          <button className="ft-btn ft-btn-primary ft-btn-lg ft-btn-block">
            Checkout <Icon.ArrowRight width="16" height="16" />
          </button>
          <button className="ft-btn ft-btn-outline ft-btn-block" onClick={() => navigate("home")}>Continue shopping</button>

          <div className="ft-cart-perks">
            <div><Icon.Truck width="14" height="14" /> Free shipping $120+</div>
            <div><Icon.Return width="14" height="14" /> 30-day returns</div>
            <div><Icon.Shield width="14" height="14" /> Secure checkout</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { CartPage });
