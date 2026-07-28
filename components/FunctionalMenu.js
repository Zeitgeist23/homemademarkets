'use client';

import { useEffect, useMemo, useState } from 'react';

const MENU_IMAGE = '/homemade-markets-food-page.png?v=20260727-8';
const FACEBOOK_URL = 'https://www.facebook.com/HomemadeMarkets';
const CART_KEY = 'homemade-markets-menu-cart-v2';

const MENU_ITEMS = [
  {
    id: 'cheese',
    name: 'Cheese Pizza',
    price: 18,
    unit: 'pizza',
    hotspot: 'poster-add-cheese',
    viewerHotspot: 'poster-view-cheese',
    image: '/cheese-pizza-photo.svg?v=3',
    ingredients: [
      'Wood-fired pizza crust',
      'Pizza sauce',
      'Mozzarella and provolone cheese',
    ],
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni Pizza',
    price: 20,
    unit: 'pizza',
    hotspot: 'poster-add-pepperoni',
    viewerHotspot: 'poster-view-pepperoni',
    image: '/menu-popup-pepperoni.svg?v=3',
    ingredients: [
      'Wood-fired pizza crust',
      'Pizza sauce',
      'Mozzarella and provolone cheese',
      'Fresh pepperoni on top',
    ],
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken Pizza',
    price: 22,
    unit: 'pizza',
    hotspot: 'poster-add-bbq',
    viewerHotspot: 'poster-view-bbq',
    image: '/menu-popup-bbq-chicken.svg?v=3',
    ingredients: [
      'Wood-fired pizza crust',
      'BBQ sauce',
      'Fresh-cut chicken',
      'Mozzarella and provolone cheese',
      'Bacon bits on top',
    ],
  },
  {
    id: 'veggie',
    name: 'Veggie Pizza',
    price: 25,
    unit: 'pizza',
    hotspot: 'poster-add-veggie',
    viewerHotspot: 'poster-view-veggie',
    image: '/menu-popup-veggie.svg?v=3',
    ingredients: [
      'Wood-fired pizza crust',
      'Pizza sauce',
      'Garlic',
      'Fresh spinach',
      'Black olives',
      'Mozzarella and provolone cheese',
      'Fresh tomato slices on top',
      'Fresh mozzarella',
      'Fresh basil and oregano spices',
    ],
  },
  {
    id: 'jambalaya',
    name: 'Homemade Jambalaya',
    price: 10,
    unit: 'serving',
    hotspot: 'poster-add-jambalaya',
    viewerHotspot: 'poster-view-jambalaya',
    image: '/menu-popup-jambalaya.svg?v=3',
    ingredients: [
      'Short-grain rice',
      'Olive oil',
      'Garlic',
      'Cajun spices',
      'Andouille sausage',
      'Red and green peppers',
      'Salt',
      'Black pepper',
      'Black beans',
      'Corn',
    ],
  },
  {
    id: 'banana-bread',
    name: 'Chocolate Chip Banana Bread',
    price: 8,
    unit: 'loaf',
    hotspot: 'poster-add-banana',
    viewerHotspot: 'poster-view-banana',
    image: '/menu-popup-banana-bread.svg?v=3',
    ingredients: [
      'Enriched flour',
      'Chocolate chips',
      'Water',
      'Fresh bananas',
    ],
  },
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    price: 7,
    unit: 'cup',
    hotspot: 'poster-add-tiramisu',
    viewerHotspot: 'poster-view-tiramisu',
    image: '/menu-popup-tiramisu.svg?v=3',
    ingredients: [
      'Mascarpone cheese',
      'Egg yolks',
      'Sugar',
      'Ladyfingers',
      'Amaretto',
      'Chocolate powder',
    ],
  },
];

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function FunctionalMenu() {
  const [quantities, setQuantities] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [notice, setNotice] = useState('');
  const [customer, setCustomer] = useState({
    name: '',
    contact: '',
    pickup: '',
    notes: '',
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(CART_KEY) || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        setQuantities(saved);
      }
    } catch {
      setQuantities({});
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 1800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!drawerOpen && !previewItem) return undefined;

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      if (previewItem) setPreviewItem(null);
      else setDrawerOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [drawerOpen, previewItem]);

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

  function addItem(item) {
    setQuantities((current) => ({
      ...current,
      [item.id]: (current[item.id] || 0) + 1,
    }));
    setNotice(`${item.name} added`);
    setDrawerOpen(true);
  }

  function changeQuantity(id, change) {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] || 0) + change);
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  function orderSummary() {
    const lines = selectedItems.map(
      (item) => `${item.quantity} x ${item.name} — ${formatMoney(item.quantity * item.price)}`,
    );

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
      'This request is not confirmed until Homemade Markets replies with availability, final price, and pickup details.',
    ].filter(Boolean).join('\n');
  }

  async function copyOrder() {
    if (!selectedItems.length) {
      setNotice('Add at least one item first.');
      return false;
    }

    const summary = orderSummary();
    try {
      await navigator.clipboard.writeText(summary);
      setNotice('Order request copied.');
      return true;
    } catch {
      window.prompt('Copy this order request:', summary);
      return true;
    }
  }

  async function copyAndOpenFacebook() {
    const copied = await copyOrder();
    if (copied) window.open(FACEBOOK_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="poster-menu-page">
      <section className="poster-menu-stage" aria-label="Interactive Homemade Markets menu">
        <img
          className="poster-menu-image"
          src={MENU_IMAGE}
          alt="Homemade Markets menu with cheese, pepperoni, BBQ chicken and veggie pizzas, jambalaya, chocolate chip banana bread, and tiramisu"
        />

        <a className="poster-hotspot poster-about" href="/#about" aria-label="About Homemade Markets" />
        <a className="poster-hotspot poster-market-dates" href="/#market-dates" aria-label="View market dates" />
        <a className="poster-hotspot poster-catering" href="/#catering" aria-label="Catering information" />
        <button className="poster-hotspot poster-shop" type="button" onClick={() => setDrawerOpen(true)} aria-label={`Open order cart with ${itemCount} items`} />
        <a className="poster-hotspot poster-logo-home" href="/" aria-label="Return to the Homemade Markets landing page" />
        <a className="poster-hotspot poster-find-market" href="/#market-dates" aria-label="Find Homemade Markets at a market" />
        <button
          className="poster-hotspot poster-place-order"
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label={`Place order with ${itemCount} items in the cart`}
          title="Place Order"
        />

        {MENU_ITEMS.map((item) => (
          <button
            key={`${item.id}-preview`}
            type="button"
            className={`poster-hotspot poster-view-button ${item.viewerHotspot}`}
            onClick={() => setPreviewItem(item)}
            aria-label={`View enlarged photo and ingredients for ${item.name}`}
            title={`View ingredients for ${item.name}`}
          >
            <span className="poster-sr-only">View ingredients for {item.name}</span>
          </button>
        ))}

        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`poster-hotspot poster-add-button ${item.hotspot}`}
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} for ${formatMoney(item.price)} to the order`}
            title={`Add ${item.name}`}
          >
            <span className="poster-sr-only">Add {item.name}</span>
          </button>
        ))}

        <a className="poster-hotspot poster-facebook" href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Open Homemade Markets on Facebook" />
        <span id="menu-top" className="poster-menu-anchor" />
      </section>

      {notice && <div className="poster-menu-notice" role="status">{notice}</div>}

      {previewItem && (
        <div
          className="poster-3d-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreviewItem(null);
          }}
        >
          <section className="poster-3d-dialog" role="dialog" aria-modal="true" aria-labelledby="poster-3d-title">
            <button className="poster-3d-close" type="button" onClick={() => setPreviewItem(null)} aria-label="Close food details">×</button>
            <div className="poster-3d-copy">
              <span>Menu Item Details</span>
              <h2 id="poster-3d-title">{previewItem.name}</h2>
            </div>

            <img
              className={`poster-food-photo poster-food-photo-${previewItem.id}`}
              src={previewItem.image}
              alt={previewItem.name}
              draggable="false"
            />

            <div className="poster-food-ingredients">
              <h3>Ingredients</h3>
              <ul>
                {previewItem.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <button className="poster-3d-add" type="button" onClick={() => addItem(previewItem)}>
              Add {previewItem.name} — {formatMoney(previewItem.price)}
            </button>
          </section>
        </div>
      )}

      {drawerOpen && (
        <div
          className="poster-cart-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDrawerOpen(false);
          }}
        >
          <aside className="poster-cart-drawer" role="dialog" aria-modal="true" aria-labelledby="poster-cart-title">
            <header className="poster-cart-header">
              <div>
                <span>Homemade Markets</span>
                <h2 id="poster-cart-title">Your Order</h2>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close order cart">×</button>
            </header>

            {!selectedItems.length ? (
              <div className="poster-cart-empty">
                <strong>Your order is empty.</strong>
                <p>Close this panel and click one of the existing + Add buttons on the menu.</p>
              </div>
            ) : (
              <>
                <div className="poster-cart-items">
                  {selectedItems.map((item) => (
                    <article key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{formatMoney(item.price)} per {item.unit}</span>
                      </div>
                      <div className="poster-quantity-control">
                        <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                        <b>{item.quantity}</b>
                        <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                      </div>
                      <em>{formatMoney(item.quantity * item.price)}</em>
                    </article>
                  ))}
                </div>

                <div className="poster-cart-total">
                  <span>Estimated subtotal</span>
                  <strong>{formatMoney(subtotal)}</strong>
                </div>

                <div className="poster-customer-fields">
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
                    <textarea rows="3" value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} />
                  </label>
                </div>

                <p className="poster-cart-disclaimer">
                  This is an order request. Availability, final price, pickup time, and the order itself must be confirmed by Homemade Markets.
                </p>

                <div className="poster-cart-actions">
                  <button type="button" className="poster-cart-primary" onClick={copyAndOpenFacebook}>Copy Order &amp; Open Facebook</button>
                  <button type="button" onClick={copyOrder}>Copy Order Request</button>
                  <button type="button" className="poster-cart-clear" onClick={() => setQuantities({})}>Clear Order</button>
                  <button type="button" onClick={() => setDrawerOpen(false)}>Continue Shopping</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
