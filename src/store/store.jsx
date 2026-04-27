// ─────────────────────────────────────────────────────────────
// Store: cart, wishlist, route, dark mode, toasts, orders
// ─────────────────────────────────────────────────────────────

const StoreCtx = React.createContext(null);

function StoreProvider({ children }) {
  const [route,       setRoute]       = React.useState({ name: "home" });
  const [cart,        setCart]        = React.useState([]);
  const [wishlist,    setWishlist]    = React.useState(new Set([4, 9]));
  const [dark,        setDark]        = React.useState(false);
  const [toasts,      setToasts]      = React.useState([]);
  const [quickView,   setQuickView]   = React.useState(null);
  const [searchOpen,  setSearchOpen]  = React.useState(false);
  const [orderRef,    setOrderRef]    = React.useState(null);

  const navigate = React.useCallback((r) => {
    setRoute(typeof r === "string" ? { name: r } : r);
    const el = document.querySelector("[data-proto-scroll]");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const pushToast = React.useCallback((t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, ...t }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 3200);
  }, []);

  const addToCart = React.useCallback((productId, size, qty = 1) => {
    setCart(c => {
      const i = c.findIndex(x => x.productId === productId && x.size === size);
      if (i >= 0) { const next = [...c]; next[i] = { ...next[i], qty: next[i].qty + qty }; return next; }
      return [...c, { productId, size, qty }];
    });
    const allProds = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
    const p = allProds.find(x => x.id === productId);
    if (p) pushToast({ title: "Added to bag", body: `${p.name}${size ? ` · ${size}` : ""}`, kind: "success" });
  }, [pushToast]);

  const removeFromCart = React.useCallback((productId, size) => {
    setCart(c => c.filter(x => !(x.productId === productId && x.size === size)));
  }, []);

  const updateQty = React.useCallback((productId, size, delta) => {
    setCart(c => c.flatMap(x => {
      if (x.productId !== productId || x.size !== size) return [x];
      const q = x.qty + delta;
      return q <= 0 ? [] : [{ ...x, qty: q }];
    }));
  }, []);

  const clearCart = React.useCallback(() => setCart([]), []);

  const toggleWishlist = React.useCallback((productId) => {
    setWishlist(w => {
      const next = new Set(w);
      if (next.has(productId)) { next.delete(productId); pushToast({ title: "Removed from wishlist", kind: "info" }); }
      else                     { next.add(productId);    pushToast({ title: "Saved to wishlist",     kind: "success" }); }
      return next;
    });
  }, [pushToast]);

  const cartCount = cart.reduce((n, x) => n + x.qty, 0);
  const cartTotal = cart.reduce((n, x) => {
    const allProds = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
    const p = allProds.find(y => y.id === x.productId);
    return n + (p ? p.price * x.qty : 0);
  }, 0);

  const placeOrder = React.useCallback((formData) => {
    const allProds = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;
    const ref = "FT-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const items = cart.map(c => ({ ...c, product: allProds.find(p => p.id === c.productId) })).filter(i => i.product);
    const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    setOrderRef({ ref, items, total: cartTotal, date: new Date().toISOString(), deliveryDate, formData });
    setCart([]);
    pushToast({ title: "Order placed!", body: `Order ${ref} confirmed`, kind: "success" });
    navigate("order");
  }, [cart, cartTotal, pushToast, navigate]);

  const value = {
    route, navigate,
    cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal,
    wishlist, toggleWishlist,
    dark, setDark,
    toasts, pushToast,
    quickView, setQuickView,
    searchOpen, setSearchOpen,
    orderRef, placeOrder,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

const useStore = () => React.useContext(StoreCtx);

Object.assign(window, { StoreProvider, useStore });
