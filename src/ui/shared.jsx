// ─────────────────────────────────────────────────────────────
// Shared UI primitives — icons, stars, toasts, navbar, footer
// ─────────────────────────────────────────────────────────────

const Icon = {
  Search:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  Heart:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  HeartFill:  p => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Bag:        p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  User:       p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Sun:        p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
  Moon:       p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  X:          p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Plus:       p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Minus:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/></svg>,
  ArrowRight: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  ArrowLeft:  p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Star:       p => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  ChevronDown:p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>,
  Filter:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54z"/></svg>,
  Eye:        p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  Check:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m20 6-11 11-5-5"/></svg>,
  ZoomIn:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>,
  Truck:      p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Return:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7v6h6M21 17a9 9 0 0 0-15-6.7L3 13"/></svg>,
  Shield:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Sparkle:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  MapPin:     p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  CreditCard: p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>,
  Package:    p => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/></svg>,
};

function Stars({ value, size = 12 }) {
  return (
    <div style={{ display: "inline-flex", gap: 1, color: "var(--accent)" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Icon.Star key={i} width={size} height={size} style={{ opacity: i <= Math.round(value) ? 1 : 0.2 }} />
      ))}
    </div>
  );
}

function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="ft-logo">
      <span className="ft-logo-mark">FT</span>
      <span className="ft-logo-word">fashion<span className="ft-logo-accent">/</span>trend</span>
    </button>
  );
}

function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="ft-toasts">
      {toasts.map(t => (
        <div key={t.id} className={`ft-toast ft-toast-${t.kind || "info"}`}>
          <div className="ft-toast-icon"><Icon.Check width="14" height="14" /></div>
          <div>
            <div className="ft-toast-title">{t.title}</div>
            {t.body && <div className="ft-toast-body">{t.body}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchOverlay() {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [q, setQ] = React.useState("");
  const inputRef  = React.useRef(null);
  React.useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80);
    else setQ("");
  }, [searchOpen]);
  if (!searchOpen) return null;

  const ql  = q.toLowerCase().trim();
  const all = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
  const results = ql ? all.filter(p =>
    p.name.toLowerCase().includes(ql) ||
    p.brand.toLowerCase().includes(ql) ||
    p.cat.toLowerCase().includes(ql)
  ).slice(0, 8) : [];
  const trending = ["Knit runner", "Wide-leg trouser", "Puffer jacket", "Box tee", "Court low", "Slip dress"];

  return (
    <div className="ft-search-overlay" onClick={() => setSearchOpen(false)}>
      <div className="ft-search-panel" onClick={e => e.stopPropagation()}>
        <div className="ft-search-bar">
          <Icon.Search width="20" height="20" />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search products, brands, categories" />
          <button onClick={() => setSearchOpen(false)} className="ft-icon-btn">
            <Icon.X width="20" height="20" />
          </button>
        </div>
        <div className="ft-search-body">
          {!ql && (
            <>
              <div className="ft-search-heading">Trending</div>
              <div className="ft-chip-row">
                {trending.map(t => (
                  <button key={t} className="ft-chip" onClick={() => setQ(t.split(" ")[0])}>{t}</button>
                ))}
              </div>
            </>
          )}
          {ql && results.length === 0 && <div className="ft-empty">No matches for "{q}"</div>}
          {results.length > 0 && (
            <>
              <div className="ft-search-heading">{results.length} result{results.length !== 1 && "s"}</div>
              <div className="ft-search-results">
                {results.map(p => (
                  <button key={p.id} className="ft-search-result"
                    onClick={() => { navigate({ name: "pdp", productId: p.id }); setSearchOpen(false); }}>
                    <img src={UNSPLASH(p.images[0], 200)} alt="" />
                    <div>
                      <div className="ft-search-result-name">{p.name}</div>
                      <div className="ft-search-result-meta">{p.brand} · ${p.price}</div>
                    </div>
                    <Icon.ArrowRight width="16" height="16" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const { navigate, cartCount, wishlist, dark, setDark, setSearchOpen } = useStore();
  const links = [
    { id: "men",    label: "Men"             },
    { id: "women",  label: "Women"           },
    { id: "kids",   label: "Kids"            },
    { id: "beauty", label: "Beauty"          },
    { id: "sale",   label: "Sale", accent: true },
  ];
  return (
    <header className="ft-nav">
      <div className="ft-nav-banner">
        Free express shipping on orders over $120 · Members get early drops
      </div>
      <div className="ft-nav-row">
        <Logo onClick={() => navigate("home")} />
        <nav className="ft-nav-links">
          {links.map(l => (
            <button key={l.id} className={`ft-nav-link ${l.accent ? "ft-nav-link-accent" : ""}`}
              onClick={() => navigate({ name: "plp", category: l.id })}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="ft-nav-actions">
          <button className="ft-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Icon.Search width="20" height="20" />
          </button>
          <button className="ft-icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
            {dark ? <Icon.Sun width="20" height="20" /> : <Icon.Moon width="20" height="20" />}
          </button>
          <button className="ft-icon-btn" aria-label="Account" onClick={() => navigate("account")}>
            <Icon.User width="20" height="20" />
          </button>
          <button className="ft-icon-btn ft-icon-btn-badge" aria-label="Wishlist" onClick={() => navigate("wishlist")}>
            <Icon.Heart width="20" height="20" />
            {wishlist.size > 0 && <span className="ft-badge">{wishlist.size}</span>}
          </button>
          <button className="ft-icon-btn ft-icon-btn-badge" onClick={() => navigate("cart")} aria-label="Cart">
            <Icon.Bag width="20" height="20" />
            {cartCount > 0 && <span className="ft-badge ft-badge-accent">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { navigate } = useStore();
  return (
    <footer className="ft-footer">
      <div className="ft-footer-top">
        <div className="ft-footer-cta">
          <h3>Get the drop first.</h3>
          <p>New releases, exclusive sizes, members-only access. No spam — we promise.</p>
          <form className="ft-footer-form" onSubmit={e => e.preventDefault()}>
            <input placeholder="your@email.com" />
            <button type="submit">Join <Icon.ArrowRight width="14" height="14" /></button>
          </form>
        </div>
        <div className="ft-footer-cols">
          <div>
            <h4>Shop</h4>
            <a onClick={() => navigate({ name: "plp", category: "men" })}>Men</a>
            <a onClick={() => navigate({ name: "plp", category: "women" })}>Women</a>
            <a onClick={() => navigate({ name: "plp", category: "kids" })}>Kids</a>
            <a onClick={() => navigate({ name: "plp", category: "beauty" })}>Beauty</a>
            <a onClick={() => navigate({ name: "plp", category: "sale" })}>Sale</a>
          </div>
          <div>
            <h4>Help</h4>
            <a>Shipping</a><a>Returns</a><a>Size guide</a><a>Contact</a>
          </div>
          <div>
            <h4>Company</h4>
            <a>About</a><a>Sustainability</a><a>Careers</a><a>Press</a>
          </div>
        </div>
      </div>
      <div className="ft-footer-bottom">
        <span>© 2026 fashion/trend studios</span>
        <span>Made with care · Crafted for fits</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Stars, Logo, Toasts, SearchOverlay, Navbar, Footer });
