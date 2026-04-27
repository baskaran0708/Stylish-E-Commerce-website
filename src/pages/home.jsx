// ─────────────────────────────────────────────────────────────
// HOME PAGE — Hero, categories, trending carousel, banners, grid
// ─────────────────────────────────────────────────────────────

function HeroSection() {
  const { navigate } = useStore();
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 4500);
    return () => clearInterval(t);
  }, []);
  const slides = [
    { kw: "MOTION",    sub: "Spring/Summer Drop 02",  img: "1556906781-9a412961c28c", tag: "Just landed"     },
    { kw: "ATTITUDE",  sub: "The Tailoring Edit",      img: "1490481651871-ab68de25d43d", tag: "New season"   },
    { kw: "AFTERMATH", sub: "Athleisure, refined",     img: "1556821840-3a9fbc8e0b2a", tag: "Members early"  },
  ];
  const slide = slides[tick % slides.length];

  return (
    <section className="ft-hero">
      <div className="ft-hero-bg" key={tick}>
        <img src={UNSPLASH(slide.img, 1800)} alt="" />
        <div className="ft-hero-grad" />
      </div>
      <div className="ft-hero-inner">
        <div className="ft-hero-eyebrow">
          <span className="ft-hero-dot" /> {slide.tag}
        </div>
        <h1 className="ft-hero-title" key={`t-${tick}`}>
          <span className="ft-hero-word">IN</span>
          <span className="ft-hero-word ft-hero-word-outline">{slide.kw}</span>
        </h1>
        <p className="ft-hero-sub" key={`s-${tick}`}>{slide.sub}. Limited stock, unlimited fits.</p>
        <div className="ft-hero-actions">
          <button className="ft-btn ft-btn-primary ft-btn-lg" onClick={() => navigate({ name: "plp", category: "new" })}>
            Shop the drop <Icon.ArrowRight width="16" height="16" />
          </button>
          <button className="ft-btn ft-btn-outline ft-btn-lg" onClick={() => navigate({ name: "plp", category: "all" })}>
            Browse all
          </button>
        </div>
        <div className="ft-hero-meta">
          <div><strong>02 / 03</strong><span>{String(tick % slides.length + 1).padStart(2, "0")} of {String(slides.length).padStart(2, "0")}</span></div>
          <div><strong>SS26</strong><span>Now shipping</span></div>
          <div><strong>240+</strong><span>New styles</span></div>
        </div>
      </div>
      <div className="ft-hero-marquee">
        <div className="ft-marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>NEW DROP · SS26 · FREE SHIPPING $120+ · MEMBERS EARLY · </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { navigate } = useStore();
  return (
    <section className="ft-section">
      <div className="ft-section-head">
        <div>
          <div className="ft-eyebrow">01 — Shop by</div>
          <h2 className="ft-h2">Categories</h2>
        </div>
        <button className="ft-link-arrow" onClick={() => navigate({ name: "plp", category: "all" })}>
          See all <Icon.ArrowRight width="14" height="14" />
        </button>
      </div>
      <div className="ft-cats">
        {window.CATEGORIES.map((c, i) => (
          <button key={c.id} className="ft-cat" onClick={() => navigate({ name: "plp", category: c.id })}
            style={{ aspectRatio: i % 3 === 1 ? "3/5" : "4/5" }}>
            <img src={UNSPLASH(c.img, 700)} alt={c.label} loading="lazy" />
            <div className="ft-cat-grad" />
            <div className="ft-cat-info">
              <div className="ft-cat-count">{c.count} items</div>
              <h3>{c.label}</h3>
              <span className="ft-cat-arrow"><Icon.ArrowRight width="18" height="18" /></span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function TrendingCarousel() {
  const { products: apiProds = [] } = window.useUnsplashProducts ? window.useUnsplashProducts() : {};
  const allProds = React.useMemo(() => [...window.PRODUCTS, ...apiProds], [apiProds]);
  const trending  = allProds.slice(0, 10);
  const scrollerRef = React.useRef(null);
  const scroll = (dir) => { const el = scrollerRef.current; if (el) el.scrollBy({ left: dir * 360, behavior: "smooth" }); };

  return (
    <section className="ft-section">
      <div className="ft-section-head">
        <div>
          <div className="ft-eyebrow">02 — Right now</div>
          <h2 className="ft-h2">Trending this week</h2>
        </div>
        <div className="ft-carousel-controls">
          <button className="ft-icon-btn ft-icon-btn-bordered" onClick={() => scroll(-1)}><Icon.ArrowLeft  width="16" height="16" /></button>
          <button className="ft-icon-btn ft-icon-btn-bordered" onClick={() => scroll(1)}><Icon.ArrowRight width="16" height="16" /></button>
        </div>
      </div>
      <div className="ft-carousel" ref={scrollerRef}>
        {trending.map(p => (
          <div key={p.id} className="ft-carousel-item">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoBanners() {
  const { navigate } = useStore();
  return (
    <section className="ft-section">
      <div className="ft-promos">
        <div className="ft-promo ft-promo-lg" onClick={() => navigate({ name: "plp", category: "sale" })}>
          <img src={UNSPLASH("1539109136881-3be0616acf4b", 1400)} alt="" />
          <div className="ft-promo-grad" />
          <div className="ft-promo-info">
            <div className="ft-eyebrow ft-eyebrow-light">Members exclusive</div>
            <h3>Up to 40% off<br/>seasonal essentials</h3>
            <button className="ft-btn ft-btn-light">Shop sale <Icon.ArrowRight width="14" height="14" /></button>
          </div>
        </div>
        <div className="ft-promo-stack">
          <div className="ft-promo" onClick={() => navigate({ name: "plp", category: "footwear" })}>
            <img src={UNSPLASH("1542291026-7eec264c27ff", 900)} alt="" />
            <div className="ft-promo-grad" />
            <div className="ft-promo-info">
              <div className="ft-eyebrow ft-eyebrow-light">Just dropped</div>
              <h3>Aero Tech Runner</h3>
              <button className="ft-btn ft-btn-light ft-btn-sm">Shop now</button>
            </div>
          </div>
          <div className="ft-promo ft-promo-accent">
            <div className="ft-promo-info">
              <div className="ft-eyebrow ft-eyebrow-dark">Free</div>
              <h3 style={{ color: "#0a0a0a" }}>Express delivery<br/>on $120+</h3>
              <button className="ft-btn ft-btn-dark ft-btn-sm">Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfiniteGrid() {
  const { products: apiProds = [], loading: apiLoading } =
    window.useUnsplashProducts ? window.useUnsplashProducts() : { products: [], loading: false };

  const [count,   setCount]   = React.useState(8);
  const [loading, setLoading] = React.useState(false);
  const sentinelRef = React.useRef(null);

  // Interleave static + API products for variety
  const all = React.useMemo(() => {
    const base = [...window.PRODUCTS];
    apiProds.forEach((ap, i) => {
      const pos = Math.min(4 + i * 3, base.length);
      base.splice(pos, 0, ap);
    });
    return base;
  }, [apiProds]);

  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && count < all.length) {
        setLoading(true);
        setTimeout(() => { setCount(c => Math.min(c + 4, all.length)); setLoading(false); }, 600);
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [count, all.length]);

  return (
    <section className="ft-section">
      <div className="ft-section-head">
        <div>
          <div className="ft-eyebrow">03 — For you</div>
          <h2 className="ft-h2">Picked based on your fits</h2>
        </div>
        {apiLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.6, fontSize: 13 }}>
            <span className="ft-skel" style={{ width: 12, height: 12, borderRadius: "50%", display: "inline-block" }} />
            Loading more styles…
          </div>
        )}
      </div>
      <div className="ft-grid">
        {all.slice(0, count).map(p => <ProductCard key={p.id} product={p} />)}
        {loading && Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={`sk-${i}`} />)}
      </div>
      <div ref={sentinelRef} style={{ height: 1 }} />
      {count >= all.length && all.length > 0 && (
        <div className="ft-grid-end">You've seen it all. New drops every Thursday.</div>
      )}
    </section>
  );
}

function HomePage() {
  return (
    <div data-screen-label="Home">
      <HeroSection />
      <CategoriesSection />
      <TrendingCarousel />
      <PromoBanners />
      <InfiniteGrid />
    </div>
  );
}

Object.assign(window, { HomePage });
