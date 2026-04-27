// ─────────────────────────────────────────────────────────────
// CHECKOUT PAGE
// ─────────────────────────────────────────────────────────────

function CheckoutPage() {
  const { cart, cartTotal, navigate, placeOrder } = useStore();
  const allProds = window.getAllProducts ? window.getAllProducts() : window.PRODUCTS;

  const [form, setForm] = React.useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "United States",
    cardNumber: "", expiry: "", cvv: "", cardName: "",
    payMethod: "card",
  });
  const [errors,   setErrors]   = React.useState({});
  const [step,     setStep]     = React.useState(1); // 1: shipping, 2: payment

  const items = cart.map(c => ({ ...c, product: allProds.find(p => p.id === c.productId) })).filter(i => i.product);

  if (items.length === 0) {
    return (
      <div data-screen-label="Checkout" className="ft-cart-empty">
        <div className="ft-cart-empty-inner">
          <Icon.Bag width="48" height="48" />
          <h1>Nothing to check out</h1>
          <p>Add some items to your bag first.</p>
          <button className="ft-btn ft-btn-primary ft-btn-lg" onClick={() => navigate("home")}>
            Shop now <Icon.ArrowRight width="16" height="16" />
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cartTotal;
  const shipping = subtotal >= 120 ? 0 : 12;
  const tax      = Math.round(subtotal * 0.08);
  const total    = subtotal + shipping + tax;

  const sf = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validateShipping = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email.includes("@")) e.email  = "Valid email required";
    if (!form.address.trim())   e.address   = "Required";
    if (!form.city.trim())      e.city      = "Required";
    if (!form.zip.trim())       e.zip       = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (form.payMethod !== "card") return true;
    const e = {};
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid card number";
    if (!form.expiry.includes("/")) e.expiry = "MM/YY format";
    if (form.cvv.length < 3) e.cvv = "3-4 digits";
    if (!form.cardName.trim()) e.cardName = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateShipping()) setStep(2); };
  const handleSubmit = (e) => { e.preventDefault(); if (validatePayment()) placeOrder(form); };

  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  return (
    <div data-screen-label="Checkout" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div className="ft-plp-header" style={{ marginBottom: 40 }}>
        <div className="ft-breadcrumb">
          <a onClick={() => navigate("home")}>Home</a> <span>/</span>
          <a onClick={() => navigate("cart")}>Bag</a> <span>/</span>
          <strong>Checkout</strong>
        </div>
        <h1 className="ft-plp-title">Checkout</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }}>
        {/* ── Left: form ── */}
        <form onSubmit={handleSubmit}>

          {/* Step indicator */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, alignItems: "center" }}>
            <StepBadge n={1} active={step >= 1} done={step > 1} label="Shipping" onClick={() => setStep(1)} />
            <div style={{ flex: 1, height: 1, background: "var(--ft-border, rgba(255,255,255,.1))" }} />
            <StepBadge n={2} active={step >= 2} done={false} label="Payment" />
          </div>

          {/* ── Shipping info ── */}
          {step === 1 && (
            <div style={{ display: "grid", gap: 20 }}>
              <SectionTitle icon={<Icon.MapPin width="16" height="16" />}>Shipping information</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="First name" error={errors.firstName}>
                  <input value={form.firstName} onChange={sf("firstName")} placeholder="Jane" className={errors.firstName ? "ft-input ft-input-err" : "ft-input"} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input value={form.lastName} onChange={sf("lastName")} placeholder="Smith" className={errors.lastName ? "ft-input ft-input-err" : "ft-input"} />
                </Field>
              </div>
              <Field label="Email address" error={errors.email}>
                <input type="email" value={form.email} onChange={sf("email")} placeholder="jane@example.com" className={errors.email ? "ft-input ft-input-err" : "ft-input"} />
              </Field>
              <Field label="Phone (optional)">
                <input type="tel" value={form.phone} onChange={sf("phone")} placeholder="+1 (555) 000-0000" className="ft-input" />
              </Field>
              <Field label="Street address" error={errors.address}>
                <input value={form.address} onChange={sf("address")} placeholder="123 Main Street, Apt 4B" className={errors.address ? "ft-input ft-input-err" : "ft-input"} />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
                <Field label="City" error={errors.city}>
                  <input value={form.city} onChange={sf("city")} placeholder="New York" className={errors.city ? "ft-input ft-input-err" : "ft-input"} />
                </Field>
                <Field label="State">
                  <input value={form.state} onChange={sf("state")} placeholder="NY" className="ft-input" />
                </Field>
                <Field label="ZIP / Post code" error={errors.zip}>
                  <input value={form.zip} onChange={sf("zip")} placeholder="10001" className={errors.zip ? "ft-input ft-input-err" : "ft-input"} />
                </Field>
              </div>
              <Field label="Country">
                <select value={form.country} onChange={sf("country")} className="ft-input" style={{ cursor: "pointer" }}>
                  {["United States","United Kingdom","Canada","Australia","Germany","France","Japan","Singapore","UAE"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <button type="button" className="ft-btn ft-btn-primary ft-btn-lg" onClick={handleNext} style={{ marginTop: 8 }}>
                Continue to payment <Icon.ArrowRight width="16" height="16" />
              </button>
              <button type="button" className="ft-btn ft-btn-outline" onClick={() => navigate("cart")}>
                Back to bag
              </button>
            </div>
          )}

          {/* ── Payment ── */}
          {step === 2 && (
            <div style={{ display: "grid", gap: 20 }}>
              <SectionTitle icon={<Icon.CreditCard width="16" height="16" />}>Payment method</SectionTitle>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <PayRadio label="Credit / Debit card" value="card" current={form.payMethod} onChange={sf("payMethod")}
                  suffix={<CardLogos />} />
                <PayRadio label="PayPal" value="paypal" current={form.payMethod} onChange={sf("payMethod")} />
                <PayRadio label="Apple Pay" value="apple" current={form.payMethod} onChange={sf("payMethod")} />
              </div>

              {form.payMethod === "card" && (
                <div style={{ display: "grid", gap: 16, marginTop: 8, padding: "20px", border: "1px solid var(--ft-border, rgba(255,255,255,.12))", borderRadius: 10 }}>
                  <Field label="Card number" error={errors.cardNumber}>
                    <input value={form.cardNumber} onChange={e => setForm(f => ({ ...f, cardNumber: formatCard(e.target.value) }))}
                      placeholder="1234 5678 9012 3456" maxLength={19}
                      className={errors.cardNumber ? "ft-input ft-input-err" : "ft-input"} />
                  </Field>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Expiry date" error={errors.expiry}>
                      <input value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                        placeholder="MM/YY" maxLength={5}
                        className={errors.expiry ? "ft-input ft-input-err" : "ft-input"} />
                    </Field>
                    <Field label="CVV / CVC" error={errors.cvv}>
                      <input value={form.cvv} onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                        placeholder="123" maxLength={4}
                        className={errors.cvv ? "ft-input ft-input-err" : "ft-input"} />
                    </Field>
                  </div>
                  <Field label="Cardholder name" error={errors.cardName}>
                    <input value={form.cardName} onChange={sf("cardName")} placeholder="Jane Smith"
                      className={errors.cardName ? "ft-input ft-input-err" : "ft-input"} />
                  </Field>
                </div>
              )}

              {form.payMethod !== "card" && (
                <div style={{ padding: "28px 20px", border: "1px solid var(--ft-border, rgba(255,255,255,.12))", borderRadius: 10, textAlign: "center", opacity: 0.6 }}>
                  You'll be redirected to {form.payMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete payment.
                </div>
              )}

              <button type="submit" className="ft-btn ft-btn-primary ft-btn-lg" style={{ marginTop: 8 }}>
                Place order · ${total.toLocaleString()} <Icon.ArrowRight width="16" height="16" />
              </button>
              <button type="button" className="ft-btn ft-btn-outline" onClick={() => setStep(1)}>
                Back to shipping
              </button>

              <div className="ft-cart-perks" style={{ marginTop: 4 }}>
                <div><Icon.Shield width="14" height="14" /> SSL encrypted checkout</div>
                <div><Icon.Return width="14" height="14" /> 30-day free returns</div>
                <div><Icon.Truck  width="14" height="14" /> Free shipping $120+</div>
              </div>
            </div>
          )}
        </form>

        {/* ── Right: order summary ── */}
        <aside className="ft-cart-summary" style={{ position: "sticky", top: 100 }}>
          <h3>Order summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {items.map(it => (
              <div key={`${it.productId}-${it.size}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img src={UNSPLASH(it.product.images[0], 200)} alt=""
                    style={{ width: 64, height: 80, objectFit: "cover", borderRadius: 6 }} />
                  <span style={{
                    position: "absolute", top: -6, right: -6, background: "var(--accent)", color: "#fff",
                    borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{it.qty}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {it.product.name}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{it.product.brand} · {it.size}</div>
                </div>
                <strong style={{ flexShrink: 0, fontSize: 14 }}>${(it.product.price * it.qty).toLocaleString()}</strong>
              </div>
            ))}
          </div>
          <div className="ft-cart-divider" />
          <div className="ft-cart-line"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
          <div className="ft-cart-line"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
          <div className="ft-cart-line"><span>Estimated tax</span><span>${tax}</span></div>
          <div className="ft-cart-divider" />
          <div className="ft-cart-total"><span>Total</span><span>${total.toLocaleString()}</span></div>
        </aside>
      </div>
    </div>
  );
}

function StepBadge({ n, active, done, label, onClick }) {
  return (
    <button onClick={onClick} disabled={!onClick}
      style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: 0, cursor: onClick ? "pointer" : "default", padding: 0 }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: 13,
        background: active ? "var(--accent)" : "rgba(255,255,255,.1)",
        color: active ? "#fff" : "rgba(255,255,255,.4)",
      }}>
        {done ? <Icon.Check width="14" height="14" /> : n}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, opacity: active ? 1 : 0.4 }}>{label}</span>
    </button>
  );
}

function SectionTitle({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ color: "var(--accent)" }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{children}</h3>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontSize: 11, color: "var(--accent)", marginTop: -2 }}>{error}</span>}
    </div>
  );
}

function PayRadio({ label, value, current, onChange, suffix }) {
  const active = current === value;
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
      border: `1px solid ${active ? "var(--accent)" : "rgba(255,255,255,.12)"}`,
      borderRadius: 10, cursor: "pointer",
      background: active ? "var(--accent-soft)" : "transparent",
    }}>
      <input type="radio" name="payMethod" value={value} checked={active} onChange={onChange} style={{ display: "none" }} />
      <span style={{
        width: 18, height: 18, borderRadius: "50%", border: `2px solid ${active ? "var(--accent)" : "rgba(255,255,255,.3)"}`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", display: "block" }} />}
      </span>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
      {suffix && <span style={{ marginLeft: "auto" }}>{suffix}</span>}
    </label>
  );
}

function CardLogos() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {["VISA", "MC", "AMEX"].map(b => (
        <span key={b} style={{
          fontSize: 9, fontWeight: 800, padding: "3px 5px",
          border: "1px solid rgba(255,255,255,.2)", borderRadius: 3,
          letterSpacing: "0.05em", opacity: 0.6,
        }}>{b}</span>
      ))}
    </div>
  );
}

// Inject input styles if not already present in styles.css
const _style = document.createElement("style");
_style.textContent = `
  .ft-input {
    width: 100%; padding: 11px 14px; border-radius: 8px; font-size: 14px;
    border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.04);
    color: inherit; outline: none; box-sizing: border-box; transition: border-color .2s;
  }
  .ft-input:focus { border-color: var(--accent); }
  .ft-input-err   { border-color: var(--accent) !important; }
  select.ft-input option { background: #1a1a1a; }
`;
document.head.appendChild(_style);

Object.assign(window, { CheckoutPage });
