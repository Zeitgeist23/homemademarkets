const FACEBOOK_URL = 'https://www.facebook.com/HomemadeMarkets';

const hotspotStyle = {
  position: 'absolute',
  display: 'block',
  zIndex: 20,
  borderRadius: '6px',
  outlineOffset: '3px',
  cursor: 'pointer',
};

const sectionStyle = {
  maxWidth: '1080px',
  margin: '0 auto',
  padding: '72px 24px',
  fontFamily: 'Arial, sans-serif',
  color: '#2b160f',
};

const actionStyle = {
  display: 'inline-block',
  background: '#6f1118',
  color: '#fff',
  textDecoration: 'none',
  padding: '13px 20px',
  borderRadius: '6px',
  fontWeight: 700,
};

export default function HomePage() {
  return (
    <main id="top" style={{ margin: 0, width: '100%', minHeight: '100vh', background: '#f7f0e4' }}>
      <section aria-label="Homemade Markets hero" style={{ width: '100%', margin: 0, padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', margin: 0, padding: 0 }}>
          <img
            src="/HOMEMADE%20Hero%20Image%20of%20Farmer%27s%20Market%20WOOD%20FIRED.png?v=20260725-5"
            alt="Homemade Markets farmers market booth featuring pizza, jambalaya, and desserts"
            style={{ display: 'block', width: '100%', height: 'auto', margin: 0, padding: 0 }}
          />

          <img
            src="/food-patch.webp?v=20260725-1"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '36.4583333333%',
              top: '54.9382716049%',
              width: '40.2777777778%',
              height: '14.8148148148%',
              display: 'block',
              objectFit: 'fill',
              pointerEvents: 'none',
            }}
          />

          <a aria-label="About Us" href="#about" style={{ ...hotspotStyle, left: '2.8%', top: '2.6%', width: '6.2%', height: '5.2%' }} />
          <a aria-label="Our Menu" href="/menu" style={{ ...hotspotStyle, left: '9.9%', top: '2.6%', width: '6.4%', height: '5.2%' }} />
          <a aria-label="Market Dates" href="#market-dates" style={{ ...hotspotStyle, left: '17.2%', top: '2.6%', width: '8.8%', height: '5.2%' }} />
          <a aria-label="Catering" href="#catering" style={{ ...hotspotStyle, left: '26.3%', top: '2.6%', width: '6.2%', height: '5.2%' }} />
          <a aria-label="Shop the menu" href="/menu#menu-order" style={{ ...hotspotStyle, left: '33.2%', top: '2.6%', width: '4.2%', height: '5.2%' }} />

          <a
            aria-label="See Our Menu"
            href="/menu"
            style={{
              position: 'absolute',
              left: '71.8%',
              top: '2.4%',
              width: '11.1%',
              height: '5.6%',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              background: '#8f1014',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(8px, 0.9vw, 16px)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            SEE OUR MENU
          </a>

          <a aria-label="Find Us at a Market" href="#market-dates" style={{ ...hotspotStyle, left: '83.5%', top: '2.4%', width: '13.1%', height: '5.6%' }} />
          <a aria-label="Build an order" href="/menu#menu-order" style={{ ...hotspotStyle, left: '10.9%', top: '80.0%', width: '11.6%', height: '5.8%' }} />
          <a aria-label="Open the interactive food menu" href="/menu" style={{ ...hotspotStyle, left: '36.4%', top: '54.8%', width: '40.4%', height: '15.1%' }} />
          <a aria-label="View the booth menu" href="/menu" style={{ ...hotspotStyle, left: '65.5%', top: '33.5%', width: '11.5%', height: '21%' }} />
          <a aria-label="Find Homemade Markets on Facebook" href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={{ ...hotspotStyle, left: '67%', top: '82%', width: '22%', height: '8%' }} />
        </div>
      </section>

      <section id="about" style={sectionStyle}>
        <h2 style={{ margin: '0 0 16px', color: '#6f1118', fontSize: '32px' }}>About Homemade Markets</h2>
        <p style={{ maxWidth: '760px', margin: 0, fontSize: '18px', lineHeight: 1.7 }}>
          From our kitchen to your table—handmade favorites made with quality ingredients and a whole lot of heart.
        </p>
      </section>

      <section id="menu" style={{ ...sectionStyle, background: '#fffaf1', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 24px', color: '#6f1118', fontSize: '32px' }}>Our Menu</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '24px' }}>
            {[
              ['Wood-Fired Pizza', 'Classic cheese, pepperoni, BBQ chicken, and veggie'],
              ['Jambalaya', 'Homemade jambalaya by the serving'],
              ['Desserts', 'Chocolate chip banana bread and classic tiramisu'],
            ].map(([title, description]) => (
              <article key={title} style={{ background: '#f7f0e4', border: '1px solid #d8c4a8', borderRadius: '12px', padding: '22px' }}>
                <h3 style={{ margin: '0 0 10px', color: '#2b160f' }}>{title}</h3>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{description}</p>
              </article>
            ))}
          </div>
          <a href="/menu" style={actionStyle}>View Interactive Menu</a>
        </div>
      </section>

      <section id="market-dates" style={sectionStyle}>
        <h2 style={{ margin: '0 0 16px', color: '#6f1118', fontSize: '32px' }}>Market Dates</h2>
        <p style={{ margin: '0 0 20px', fontSize: '18px', lineHeight: 1.7 }}>
          Upcoming farmers-market locations and dates will be posted here. Follow Homemade Markets on Facebook for the latest schedule and availability.
        </p>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={actionStyle}>Check Market Updates</a>
      </section>

      <section id="catering" style={{ ...sectionStyle, background: '#fffaf1', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 16px', color: '#6f1118', fontSize: '32px' }}>Catering</h2>
          <p style={{ margin: '0 0 20px', fontSize: '18px', lineHeight: 1.7 }}>
            Contact Homemade Markets through Facebook for catering availability and custom orders.
          </p>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={actionStyle}>Request Catering</a>
        </div>
      </section>

      <section id="shop" style={sectionStyle}>
        <h2 style={{ margin: '0 0 16px', color: '#6f1118', fontSize: '32px' }}>Shop</h2>
        <p style={{ margin: '0 0 20px', fontSize: '18px', lineHeight: 1.7 }}>Choose items from the current menu and build an order request online.</p>
        <a href="/menu#menu-order" style={actionStyle}>Start an Order</a>
      </section>

      <section id="order" style={{ ...sectionStyle, background: '#2b160f', color: '#fff', maxWidth: 'none', textAlign: 'center' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '32px' }}>Order Now</h2>
          <p style={{ margin: '0 0 22px', fontSize: '18px', lineHeight: 1.7 }}>
            Tap menu items to build a cart, calculate an estimated subtotal, and send the order request through Facebook for confirmation.
          </p>
          <a href="/menu#menu-order" style={{ ...actionStyle, background: '#fff', color: '#2b160f' }}>Build Your Order</a>
        </div>
      </section>
    </main>
  );
}
