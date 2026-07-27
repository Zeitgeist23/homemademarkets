'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const products = [
  { id: 'classic-cheese', name: 'Classic Cheese Pizza', price: 18, left: '0%', top: '30.2%', width: '51.5%', height: '16.1%' },
  { id: 'pepperoni', name: 'Pepperoni Pizza', price: 20, left: '0%', top: '46.3%', width: '51.5%', height: '15.8%' },
  { id: 'bbq-chicken', name: 'BBQ Chicken Pizza', price: 22, left: '0%', top: '62.1%', width: '51.5%', height: '15.7%' },
  { id: 'veggie', name: 'Veggie Pizza', price: 25, left: '0%', top: '77.8%', width: '51.5%', height: '14.4%' },
  { id: 'jambalaya', name: 'Homemade Jambalaya', price: 10, left: '51.5%', top: '30.2%', width: '48.5%', height: '22.2%' },
  { id: 'banana-bread', name: 'Chocolate Chip Banana Bread', price: 8, left: '51.5%', top: '52.4%', width: '48.5%', height: '22.2%' },
  { id: 'tiramisu', name: 'Classic Tiramisu', price: 7, left: '51.5%', top: '74.6%', width: '48.5%', height: '17.7%' },
];

const FACEBOOK_URL = 'https://www.facebook.com/HomemadeMarkets';
const CART_KEY = 'homemade-markets-cart-v1';

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function MenuExperience() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [customer, setCustomer] = useState({ name: '', contact: '', pickup: '', notes: '' });

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]');
      if (Array.isArray(saved)) setCart(saved);
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(''), 1800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  function addProduct(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    setNotice(`${product.name} added`);
  }

  function changeQuantity(id, change) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0));
  }

  function orderSummary() {
    const lines = cart.map((item) => `${item.quantity} × ${item.name} — ${formatMoney(item.price * item.quantity)}`);
    return [
      'HOMEMADE MARKETS ORDER REQUEST',
      '',
      ...lines,
      '',
      `Estimated subtotal: ${formatMoney(subtotal)}`,
      customer.name ? `Name: ${customer.name}` : '',
      customer.contact ? `Phone or email: ${customer.contact}` : '',
      customer.pickup ? `Requested pickup date/time: ${customer.pickup}` : '',
      customer.notes ? `Notes: ${customer.notes}` : '',
      '',
      'This is an order request and is not confirmed until Homemade Markets replies.',
    ].filter(Boolean).join('\n');
  }

  async function copyOrder() {
    if (!cart.length) return;
    try {
      await navigator.clipboard.writeText(orderSummary());
      setNotice('Order summary copied');
    } catch {
      setNotice('Select and copy the order summary manually');
    }
  }

  async function copyAndOpenFacebook() {
    if (!cart.length) return;
    window.open(FACEBOOK_URL, '_blank', 'noopener,noreferrer');
    await copyOrder();
  }

  return (
    <main className="menu-experience" id="menu-top">
      <nav className="menu-toolbar" aria-label="Menu navigation">
        <Link href="/">Home</Link>
        <a href="#menu-image">Menu</a>
        <Link href="/#market-dates">Market Dates</Link>
        <Link href="/#catering">Catering</Link>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a>
        <button type="button" onClick={() => setDrawerOpen(true)}>Cart ({itemCount})</button>
      </nav>

      <section id="menu-image" className="menu-image-shell" aria-label="Interactive Homemade Markets menu">
        <img
          src="/homemade-markets-food-page.png?v=20260727-3"
          alt="Homemade Markets menu featuring wood-fired pizzas, jambalaya, chocolate chip banana bread, and classic tiramisu"
        />

        {products.map((product) => (
          <button
            key={product.id}
            className="menu-product-hotspot"
            type="button"
            aria-label={`Add ${product.name} for ${formatMoney(product.price)} to cart`}
            title={`Add ${product.name} — ${formatMoney(product.price)}`}
            onClick={() => addProduct(product)}
            style={{ left: product.left, top: product.top, width: product.width, height: product.height }}
          >
            <span>Add {product.name}</span>
          </button>
        ))}

        <button
          className="menu-footer-hotspot menu-qr-hotspot"
          type="button"
          aria-label="Open the order cart"
          onClick={() => setDrawerOpen(true)}
        />
        <a
          className="menu-footer-hotspot menu-facebook-hotspot"
          href={FACEBOOK_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Homemade Markets on Facebook"
        />
      </section>

      <section className="menu-order-instructions" id="menu-order">
        <span>Tap any menu item to add it</span>
        <h1>Build Your Homemade Markets Order</h1>
        <p>Your cart is saved in this browser. When it is ready, copy the order request and send it through Facebook. Prices shown are estimated from the current menu and availability may be limited.</p>
        <button type="button" onClick={() => setDrawerOpen(true)}>Review Cart ({itemCount})</button>
      </section>

      <button className="floating-cart-button" type="button" onClick={() => setDrawerOpen(true)} aria-label={`Open cart with ${itemCount} items`}>
        <span>Order Cart</span><strong>{itemCount}</strong>
      </button>

      {notice && <div className="menu-notice" role="status">{notice}</div>}

      {drawerOpen && (
        <div className="cart-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrawerOpen(false); }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-heading">
              <div><span>Homemade Markets</span><h2 id="cart-title">Order Cart</h2></div>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close cart">×</button>
            </div>

            {!cart.length ? (
              <div className="cart-empty"><strong>Your cart is empty.</strong><p>Close this panel and tap a menu item to add it.</p></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article key={item.id}>
                      <div><strong>{item.name}</strong><span>{formatMoney(item.price)} each</span></div>
                      <div className="quantity-control">
                        <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                        <b>{item.quantity}</b>
                        <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                      </div>
                      <em>{formatMoney(item.price * item.quantity)}</em>
                    </article>
                  ))}
                </div>

                <div className="cart-total"><span>Estimated subtotal</span><strong>{formatMoney(subtotal)}</strong></div>

                <div className="customer-fields">
                  <label><span>Name</span><input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} /></label>
                  <label><span>Phone or email</span><input value={customer.contact} onChange={(event) => setCustomer({ ...customer, contact: event.target.value })} /></label>
                  <label><span>Requested pickup date/time</span><input value={customer.pickup} onChange={(event) => setCustomer({ ...customer, pickup: event.target.value })} placeholder="Example: Saturday at 11:30 AM" /></label>
                  <label><span>Notes</span><textarea value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} rows="3" /></label>
                </div>

                <p className="cart-disclaimer">Submitting this request does not confirm an order, pickup time, price, or availability. Homemade Markets must reply to confirm it.</p>

                <div className="cart-actions">
                  <button type="button" className="cart-primary" onClick={copyAndOpenFacebook}>Copy Order &amp; Open Facebook</button>
                  <button type="button" onClick={copyOrder}>Copy Order Summary</button>
                  <button type="button" className="cart-clear" onClick={() => setCart([])}>Clear Cart</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
