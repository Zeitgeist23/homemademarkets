'use client';

import { useMemo, useState } from 'react';

const POSTER_IMAGE = '/homemade-markets-food-page.png?v=20260727-6';
const FACEBOOK_URL = 'https://www.facebook.com/HomemadeMarkets';

const MENU_ITEMS = [
  {
    id: 'classic-cheese',
    group: 'pizza',
    name: 'Classic Cheese Pizza',
    description: 'A golden, wood-fired crust topped with tomato sauce, mozzarella and parmesan.',
    price: 18,
    unit: 'pizza',
    photoClass: 'photo-classic-cheese',
  },
  {
    id: 'pepperoni',
    group: 'pizza',
    name: 'Pepperoni Pizza',
    description: 'A classic favorite with tomato sauce, mozzarella and pepperoni.',
    price: 20,
    unit: 'pizza',
    photoClass: 'photo-pepperoni',
  },
  {
    id: 'bbq-chicken',
    group: 'pizza',
    name: 'BBQ Chicken Pizza',
    description: 'Wood-fired crust with BBQ sauce, mozzarella, seasoned chicken and red onion.',
    price: 22,
    unit: 'pizza',
    photoClass: 'photo-bbq-chicken',
  },
  {
    id: 'veggie',
    group: 'pizza',
    name: 'Veggie Pizza',
    description: 'Tomato sauce, mozzarella, spinach, tomato, bell pepper and red onion.',
    price: 25,
    unit: 'pizza',
    photoClass: 'photo-veggie',
  },
  {
    id: 'jambalaya',
    group: 'favorite',
    name: 'Homemade Jambalaya',
    description: 'Classic Southern flavor, slow-simmered with savory spices, vegetables and tender cuts of meat.',
    price: 10,
    unit: 'serving',
    photoClass: 'photo-jambalaya',
  },
  {
    id: 'banana-bread',
    group: 'favorite',
    name: 'Chocolate Chip Banana Bread',
    description: 'Moist, rich and baked fresh with ripe bananas and chocolate chips.',
    price: 8,
    unit: 'loaf',
    photoClass: 'photo-banana-bread',
  },
  {
    id: 'tiramisu',
    group: 'favorite',
    name: 'Classic Tiramisu',
    description: 'Layers of espresso-soaked ladyfingers, whipped mascarpone cream and cocoa.',
    price: 7,
    unit: 'cup',
    photoClass: 'photo-tiramisu',
  },
];

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function MenuItemCard({ item, addItem }) {
  return (
    <article className={`real-menu-card real-menu-card-${item.group}`}>
      <div className="real-menu-card-copy">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="real-menu-card-bottom">
          <strong>{formatMoney(item.price)}{item.group === 'favorite' ? ` per ${item.unit}` : ''}</strong>
          <button type="button" onClick={() => addItem(item.id)}>
            Add to order
          </button>
        </div>
      </div>

      <div className={`real-menu-card-photo ${item.group === 'pizza' ? 'poster-crop-left' : 'poster-crop-right'} ${item.photoClass}`} aria-hidden="true">
        <img src={POSTER_IMAGE} alt="" />
      </div>
    </article>
  );
}

export default function FunctionalMenu() {
  const [quantities, setQuantities] = useState({});
  const [customer, setCustomer] = useState({ name: '', contact: '', pickup: '', notes: '' });
  const [notice, setNotice] = useState('');

  const selectedItems = useMemo(
    () => MENU_ITEMS
      .filter((item) => (quantities[item.id] || 0) > 0)
      .map((item) => ({ ...item, quantity: quantities[item.id] })),
    [quantities],
  );

  const itemCount = useMemo(
    () => selectedItems.reduce((total, item) => total + item.quantity, 0),
    [selectedItems],
  );

  const subtotal = useMemo(
    () => selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [selectedItems],
  );

  function addItem(id) {
    setQuantities((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setNotice('Item added to your order.');
  }

  function changeQuantity(id, change) {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] || 0) + change);
      const next = { ...current, [id]: nextQuantity };
      if (nextQuantity === 0) delete next[id];
      return next;
    });
  }

  function orderSummary() {
    const itemLines = selectedItems.map(
      (item) => `${item.quantity} x ${item.name} — ${formatMoney(item.quantity * item.price)}`,
    );

    return [
      'HOMEMADE MARKETS ORDER REQUEST',
      '',
      ...itemLines,
      '',
      `Estimated subtotal: ${formatMoney(subtotal)}`,
      customer.name ? `Name: ${customer.name}` : '',
      customer.contact ? `Phone or email: ${customer.contact}` : '',
      customer.pickup ? `Requested pickup date/time: ${customer.pickup}` : '',
      customer.notes ? `Notes: ${customer.notes}` : '',
      '',
      'This request is not confirmed until Homemade Markets replies with availability and pickup details.',
    ].filter(Boolean).join('\n');
  }

  async function copyOrder() {
    if (!selectedItems.length) {
      setNotice('Add at least one item before sending an order request.');
      return false;
    }

    const summary = orderSummary();

    try {
      await navigator.clipboard.writeText(summary);
      setNotice('Order request copied. Paste it into Facebook Messenger.');
      return true;
    } catch {
      window.prompt('Copy this order request:', summary);
      setNotice('Copy the order request shown, then send it through Facebook.');
      return true;
    }
  }

  async function openFacebookOrder() {
    if (!selectedItems.length) {
      setNotice('Add at least one item before sending an order request.');
      return;
    }

    window.open(FACEBOOK_URL, '_blank', 'noopener,noreferrer');
    await copyOrder();
  }

  const pizzaItems = MENU_ITEMS.filter((item) => item.group === 'pizza');
  const favoriteItems = MENU_ITEMS.filter((item) => item.group === 'favorite');

  return (
    <main className="functional-menu-page">
      <header className="functional-menu-brand">
        <a href="/" className="functional-menu-brand-crop" aria-label="Return to the Homemade Markets landing page">
          <img src={POSTER_IMAGE} alt="" aria-hidden="true" />
          <span className="real-menu-sr-only">Homemade Markets home</span>
        </a>
        <h1 className="real-menu-sr-only">Homemade Markets Menu</h1>
      </header>

      <div className="functional-menu-grid">
        <section className="functional-menu-column functional-menu-pizzas" aria-labelledby="pizza-menu-heading">
          <div className="functional-menu-heading">
            <h2 id="pizza-menu-heading">Wood-Fired Pizzas</h2>
            <p>Handcrafted · Small-batch · Market-made</p>
          </div>
          <div className="functional-menu-card-list">
            {pizzaItems.map((item) => <MenuItemCard key={item.id} item={item} addItem={addItem} />)}
          </div>
        </section>

        <section className="functional-menu-column functional-menu-favorites" aria-labelledby="favorites-menu-heading">
          <div className="functional-menu-heading">
            <h2 id="favorites-menu-heading">Market Favorites</h2>
            <p>Homemade · Comforting · Crowd-approved</p>
          </div>
          <div className="functional-menu-card-list">
            {favoriteItems.map((item) => <MenuItemCard key={item.id} item={item} addItem={addItem} />)}
          </div>
        </section>
      </div>

      <section className="functional-order-panel" id="order" aria-labelledby="order-heading">
        <div className="functional-order-heading">
          <div>
            <span>Order Request</span>
            <h2 id="order-heading">Build Your Homemade Markets Order</h2>
            <p>Select items above, choose quantities, then copy the request and send it through Facebook for confirmation.</p>
          </div>
          <div className="functional-order-count">
            <strong>{itemCount}</strong>
            <span>{itemCount === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {selectedItems.length ? (
          <div className="functional-order-layout">
            <div className="functional-order-items">
              {selectedItems.map((item) => (
                <article key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatMoney(item.price)} each</span>
                  </div>
                  <div className="functional-quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                    <b>{item.quantity}</b>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                  </div>
                  <em>{formatMoney(item.price * item.quantity)}</em>
                </article>
              ))}
              <div className="functional-order-total">
                <span>Estimated subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
            </div>

            <div className="functional-customer-form">
              <label>
                <span>Name</span>
                <input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} />
              </label>
              <label>
                <span>Phone or email</span>
                <input value={customer.contact} onChange={(event) => setCustomer({ ...customer, contact: event.target.value })} />
              </label>
              <label>
                <span>Requested pickup date/time</span>
                <input value={customer.pickup} onChange={(event) => setCustomer({ ...customer, pickup: event.target.value })} placeholder="Example: Saturday at 11:30 AM" />
              </label>
              <label>
                <span>Notes</span>
                <textarea rows="4" value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} />
              </label>
            </div>
          </div>
        ) : (
          <div className="functional-order-empty">
            <strong>Your order is empty.</strong>
            <p>Use the “Add to order” buttons on any menu item above.</p>
          </div>
        )}

        <p className="functional-order-disclaimer">
          Prices and availability require confirmation. Sending a request does not create a confirmed order or guaranteed pickup time.
        </p>

        <div className="functional-order-actions">
          <button type="button" className="functional-order-primary" onClick={openFacebookOrder} disabled={!selectedItems.length}>
            Copy Order &amp; Open Facebook
          </button>
          <button type="button" onClick={copyOrder} disabled={!selectedItems.length}>Copy Order Request</button>
          <button type="button" onClick={() => setQuantities({})} disabled={!selectedItems.length}>Clear Order</button>
        </div>

        <div className="functional-order-notice" aria-live="polite">{notice}</div>
      </section>

      <footer className="functional-menu-footer">
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Find Homemade Markets on Facebook</a>
        <a href="/">Return to the landing page</a>
      </footer>
    </main>
  );
}
