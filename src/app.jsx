// ─────────────────────────────────────────────────────────────
// App shell
// Canvas mode is enabled only when design-canvas.jsx is loaded
// (fashion-trend.html dev version). index.html (production) skips it.
// ─────────────────────────────────────────────────────────────

const ACCENTS = {
  pink:  { id: "pink",  label: "Neon pink", value: "#ff1f6c", soft: "#fff0f5", soft2: "#2a0d18" },
  volt:  { id: "volt",  label: "Volt",      value: "#caff00", soft: "#f7ffd6", soft2: "#1f2a05" },
  coral: { id: "coral", label: "Coral",     value: "#ff5a3d", soft: "#fff1ec", soft2: "#2a110a" },
  mono:  { id: "mono",  label: "Mono",      value: "#0a0a0a", soft: "#f3f3f3", soft2: "#222"    },
};

const FONTS = {
  archivo: { id: "archivo", label: "Archivo / Inter",    display: "Archivo",       body: "Inter", import: "Archivo:wght@800;900|Inter:wght@400;500;600;700" },
  bebas:   { id: "bebas",   label: "Bebas / Inter",      display: "Bebas Neue",    body: "Inter", import: "Bebas+Neue|Inter:wght@400;500;600;700"           },
  anton:   { id: "anton",   label: "Anton / Inter",      display: "Anton",         body: "Inter", import: "Anton|Inter:wght@400;500;600;700"                },
  space:   { id: "space",   label: "Space Grotesk",      display: "Space Grotesk", body: "Inter", import: "Space+Grotesk:wght@500;600;700|Inter:wght@400;500;600;700" },
};

// Graceful fallback when tweaks-panel.jsx is not loaded (production)
const _useTweaks = typeof window !== "undefined" && window.useTweaks
  ? window.useTweaks
  : (defaults) => { const [s] = React.useState(defaults); return [s, () => {}]; };

function App() {
  const { route, dark } = useStore();
  const [tweaks, setTweak] = _useTweaks({
    accent: "pink", font: "archivo", density: "spacious",
    heroVariant: "outline", cardStyle: "default",
  });

  const accent = ACCENTS[tweaks.accent] || ACCENTS.pink;
  const font   = FONTS[tweaks.font]     || FONTS.archivo;

  const cssVars = {
    "--accent":       accent.value,
    "--accent-soft":  dark ? accent.soft2 : accent.soft,
    "--font-display": `"${font.display}", "Inter Tight", sans-serif`,
    "--font-body":    `"${font.body}", -apple-system, sans-serif`,
  };

  React.useEffect(() => {
    const url = `https://fonts.googleapis.com/css2?family=${font.import.replace(/\|/g, "&family=")}&display=swap`;
    const id = "ft-font-link";
    let link = document.getElementById(id);
    if (!link) { link = document.createElement("link"); link.id = id; link.rel = "stylesheet"; document.head.appendChild(link); }
    link.href = url;
  }, [font.import]);

  const pageKey = route.name + (route.productId || "") + (route.category || "");
  const Page =
    route.name === "plp"      ? window.PLPPage      :
    route.name === "pdp"      ? window.PDPPage      :
    route.name === "cart"     ? window.CartPage     :
    route.name === "wishlist" ? window.WishlistPage :
    route.name === "checkout" ? window.CheckoutPage :
    route.name === "order"    ? window.OrderPage    :
    window.HomePage;

  return (
    <div className="ft-app" data-theme={dark ? "dark" : "light"} style={cssVars}>
      <Navbar />
      <main key={pageKey} className="ft-page-anim">
        {Page ? <Page /> : <window.HomePage />}
      </main>
      <Footer />
      <Toasts />
      <SearchOverlay />
      <QuickView />
      {window.TweaksPanel && <FTTweaksPanel tweaks={tweaks} setTweak={setTweak} />}
    </div>
  );
}

function FTTweaksPanel({ tweaks, setTweak }) {
  const { dark, setDark } = useStore();
  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Theme">
        <TweakToggle label="Dark mode" value={dark} onChange={setDark} />
        <TweakRadio label="Accent" value={tweaks.accent}
          options={[{value:"pink",label:"Pink"},{value:"volt",label:"Volt"},{value:"coral",label:"Coral"},{value:"mono",label:"Mono"}]}
          onChange={(v) => setTweak("accent", v)} />
      </TweakSection>
      <TweakSection title="Type">
        <TweakSelect label="Font pairing" value={tweaks.font}
          options={Object.values(FONTS).map(f => ({ value: f.id, label: f.label }))}
          onChange={(v) => setTweak("font", v)} />
      </TweakSection>
      <TweakSection title="Layout">
        <TweakRadio label="Density" value={tweaks.density}
          options={[{value:"compact",label:"Compact"},{value:"spacious",label:"Spacious"}]}
          onChange={(v) => setTweak("density", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ─────────────────────────────────────────────────────────────
// Canvas mode — only active when design-canvas.jsx is loaded
// ─────────────────────────────────────────────────────────────
function CanvasArtboard({ initialRoute, dark: initDark }) {
  return <StoreProvider><ArtboardSeed route={initialRoute} dark={initDark} /></StoreProvider>;
}
function ArtboardSeed({ route, dark }) {
  const { navigate, setDark, addToCart } = useStore();
  React.useEffect(() => {
    if (dark) setDark(true);
    if (route) navigate(route);
    if (route?.name === "cart") { addToCart(1, "UK 9"); addToCart(4, "M"); addToCart(2, "M"); }
  }, []);
  return <App />;
}
function CanvasOverview() {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const W = 1440, H = 1000;
  return (
    <DesignCanvas>
      <DCSection id="screens" title="fashion/trend" subtitle="All screens · click any to focus fullscreen">
        <DCArtboard id="home"     label="01 — Home"      width={W} height={H}><CanvasArtboard initialRoute={{ name: "home" }} /></DCArtboard>
        <DCArtboard id="plp"      label="02 — Listing"   width={W} height={H}><CanvasArtboard initialRoute={{ name: "plp", category: "women" }} /></DCArtboard>
        <DCArtboard id="pdp"      label="03 — Product"   width={W} height={H}><CanvasArtboard initialRoute={{ name: "pdp", productId: 1 }} /></DCArtboard>
        <DCArtboard id="cart"     label="04 — Cart"      width={W} height={H}><CanvasArtboard initialRoute={{ name: "cart" }} /></DCArtboard>
        <DCArtboard id="wishlist" label="05 — Wishlist"  width={W} height={H}><CanvasArtboard initialRoute={{ name: "wishlist" }} /></DCArtboard>
        <DCArtboard id="checkout" label="06 — Checkout"  width={W} height={H}><CanvasArtboard initialRoute={{ name: "checkout" }} /></DCArtboard>
        <DCArtboard id="home-dark"label="07 — Home Dark" width={W} height={H}><CanvasArtboard initialRoute={{ name: "home" }} dark /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

function Root() {
  const canvasAvailable = !!window.DesignCanvas;
  const [mode, setMode] = React.useState("prototype");

  if (!canvasAvailable) {
    return <StoreProvider><App /></StoreProvider>;
  }
  return (
    <>
      <div className="ft-mode-switch">
        <button className={mode === "prototype" ? "is-active" : ""} onClick={() => setMode("prototype")}>Prototype</button>
        <button className={mode === "canvas"    ? "is-active" : ""} onClick={() => setMode("canvas")}>Canvas</button>
      </div>
      {mode === "prototype"
        ? <StoreProvider><App /></StoreProvider>
        : <CanvasOverview />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
