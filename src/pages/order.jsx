// ─────────────────────────────────────────────────────────────
// ORDER CONFIRMATION PAGE
// ─────────────────────────────────────────────────────────────

function OrderPage() {
  const { orderRef, navigate } = useStore();

  // If landed here without an order (e.g. direct navigation), redirect
  if (!orderRef) {
    React.useEffect(() => { navigate("home"); }, []);
    return null;
  }

  const { ref, items = [], total = 0, deliveryDate, formData = {} } = orderRef;

  return (
    <div data-screen-label="Order" style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px 100px", textAlign: "center" }}>
      {/* Success icon */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%", background: "var(--accent-soft)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 28px", color: "var(--accent)",
      }}>
        <Icon.Check width="36" height="36" />
      </div>

      <div className="ft-eyebrow" style={{ marginBottom: 8 }}>Order confirmed</div>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontFamily: "var(--font-display)", margin: "0 0 12px" }}>
        You're all set!
      </h1>
      <p style={{ opacity: 0.6, maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.7 }}>
        We've received your order and will start processing it right away.
        A confirmation email will be sent to{" "}
        <strong>{formData.email || "your inbox"}</strong>.
      </p>

      {/* Order info card */}
      <div style={{
        border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px 28px",
        textAlign: "left", marginBottom: 32, background: "rgba(255,255,255,.02)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
          <OrderMeta label="Order number" value={ref} accent />
          <OrderMeta label="Estimated delivery" value={deliveryDate || "3–5 business days"} />
          <OrderMeta label="Order total" value={`$${total.toLocaleString()}`} />
        </div>

        {items.length > 0 && (
          <>
            <div style={{ height: 1, background: "rgba(255,255,255,.1)", margin: "0 0 20px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map(it => (
                <div key={`${it.productId}-${it.size}`} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <img src={UNSPLASH(it.product.images[0], 200)} alt=""
                    style={{ width: 56, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{it.product.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
                      {it.product.brand} · Size {it.size} · Qty {it.qty}
                    </div>
                  </div>
                  <strong style={{ flexShrink: 0 }}>${(it.product.price * it.qty).toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delivery address */}
      {formData.address && (
        <div style={{
          border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "16px 20px",
          textAlign: "left", marginBottom: 32, display: "flex", gap: 12, alignItems: "flex-start",
          background: "rgba(255,255,255,.02)",
        }}>
          <Icon.MapPin width="18" height="18" style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
              {formData.firstName} {formData.lastName}
            </div>
            <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.6 }}>
              {formData.address}<br />
              {formData.city}{formData.state ? `, ${formData.state}` : ""} {formData.zip}<br />
              {formData.country}
            </div>
          </div>
        </div>
      )}

      {/* Perks */}
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 40, flexWrap: "wrap" }}>
        {[
          { icon: <Icon.Package width="16" height="16" />, text: "Processing in 1–2 days" },
          { icon: <Icon.Truck   width="16" height="16" />, text: "Free tracked shipping"   },
          { icon: <Icon.Return  width="16" height="16" />, text: "30-day returns"           },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, opacity: 0.7 }}>
            <span style={{ color: "var(--accent)" }}>{icon}</span>{text}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="ft-btn ft-btn-primary ft-btn-lg" onClick={() => navigate("home")}>
          Continue shopping <Icon.ArrowRight width="16" height="16" />
        </button>
        <button className="ft-btn ft-btn-outline ft-btn-lg" onClick={() => navigate({ name: "plp", category: "new" })}>
          New arrivals
        </button>
      </div>
    </div>
  );
}

function OrderMeta({ label, value, accent }) {
  return (
    <div>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.5, marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: accent ? "var(--accent)" : "inherit", fontFamily: accent ? "var(--font-display)" : "inherit" }}>
        {value}
      </div>
    </div>
  );
}

Object.assign(window, { OrderPage });
