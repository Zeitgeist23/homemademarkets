const foods = [
  { name: 'Cheese Pizza', group: 'Wood-Fired Pizzas', icon: '🍕' },
  { name: 'Pepperoni Pizza', group: 'Wood-Fired Pizzas', icon: '🍕' },
  { name: 'BBQ Chicken Pizza', group: 'Wood-Fired Pizzas', icon: '🍕' },
  { name: 'Veggie Pizza', group: 'Wood-Fired Pizzas', icon: '🍕' },
  { name: 'Jambalaya', group: 'Homemade Favorites', icon: '🍲', description: 'Rice, red and green peppers, andouille sausage' },
  { name: 'Chocolate Chip Banana Bread', group: 'Homemade Favorites', icon: '🍞' },
  { name: 'Tiramisu', group: 'Homemade Favorites', icon: '🍰' },
];

const colors = {
  cream: '#f7eddf',
  creamLight: '#fff8ee',
  brown: '#2f170e',
  red: '#8f1014',
  border: '#c98f7c',
  black: '#111514',
};

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  padding: '0 22px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  boxSizing: 'border-box',
};

function FoodCard({ food }) {
  return (
    <article className="food-card">
      <div className="food-icon" aria-hidden="true">{food.icon}</div>
      <h3>{food.name}</h3>
      {food.description ? <p>{food.description}</p> : null}
      <a href="#order" className="add-button" aria-label={`Add ${food.name} to order`}>
        + Add
      </a>
    </article>
  );
}

export default function HomePage() {
  const pizzas = foods.filter((food) => food.group === 'Wood-Fired Pizzas');
  const favorites = foods.filter((food) => food.group === 'Homemade Favorites');

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${colors.cream}; color: ${colors.brown}; }
        a:focus-visible, button:focus-visible { outline: 3px solid ${colors.red}; outline-offset: 3px; }
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
          padding: 18px 3%;
          background: rgba(247, 237, 223, 0.97);
          border-bottom: 2px solid ${colors.red};
          backdrop-filter: blur(8px);
        }
        .nav-left, .nav-right { display: flex; align-items: center; gap: 34px; }
        .nav-right { justify-content: flex-end; gap: 14px; }
        .nav-link {
          color: ${colors.black};
          text-decoration: none;
          font: 700 13px/1 Arial, sans-serif;
          letter-spacing: .08em;
          white-space: nowrap;
        }
        .brand-mark { text-align: center; font-size: 42px; line-height: .8; color: ${colors.red}; }
        .brand-mark span { display: block; color: ${colors.brown}; font-size: 15px; letter-spacing: .28em; margin-top: 7px; }
        .hero {
          display: grid;
          grid-template-columns: minmax(360px, 0.9fr) minmax(560px, 1.45fr);
          min-height: 760px;
          padding: 38px 4% 52px;
          gap: 46px;
          align-items: center;
          background: radial-gradient(circle at 35% 20%, #fff7ec 0, ${colors.cream} 58%, #f2e4d1 100%);
        }
        .hero-copy { text-align: center; padding: 22px; }
        .chef { font-size: 80px; line-height: 1; }
        .heart { color: ${colors.red}; font-size: 38px; margin-top: -10px; }
        .script-logo {
          margin: 0;
          font-family: 'Brush Script MT', 'Segoe Script', cursive;
          font-size: clamp(72px, 7vw, 124px);
          font-weight: 700;
          line-height: .78;
          letter-spacing: -0.05em;
          color: ${colors.brown};
        }
        .markets {
          margin: 26px 0 24px;
          font-family: Georgia, serif;
          font-size: clamp(38px, 4vw, 66px);
          letter-spacing: .12em;
        }
        .divider { width: 78%; height: 1px; background: ${colors.brown}; margin: 0 auto 24px; position: relative; }
        .divider::after { content: '◆'; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -54%); background: ${colors.cream}; padding: 0 10px; font-size: 9px; }
        .tagline { font: 700 23px/1.45 Arial, sans-serif; letter-spacing: .12em; margin: 0 0 18px; }
        .hero-copy p { max-width: 390px; margin: 0 auto 28px; font: 20px/1.5 Georgia, serif; }
        .menu-panel { align-self: stretch; display: flex; flex-direction: column; justify-content: center; }
        .menu-heading {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin: 10px 0 16px;
          font: 700 22px/1 Arial, sans-serif;
          letter-spacing: .08em;
        }
        .menu-heading::before, .menu-heading::after { content: ''; width: 70px; height: 1px; background: ${colors.border}; }
        .food-grid { display: grid; gap: 16px; }
        .pizza-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .favorites-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .food-card {
          min-height: 270px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 18px 14px 14px;
          border: 1px solid ${colors.border};
          border-radius: 14px;
          background: rgba(255, 248, 238, .72);
          text-align: center;
          box-shadow: 0 7px 18px rgba(47, 23, 14, .05);
        }
        .food-icon {
          width: 150px; height: 150px;
          display: grid; place-items: center;
          border-radius: 50%;
          background: #fff3df;
          font-size: 92px;
          box-shadow: inset 0 0 0 1px rgba(143,16,20,.12), 0 8px 18px rgba(47,23,14,.12);
        }
        .food-card h3 { margin: 14px 0 8px; font: 700 19px/1.15 Georgia, serif; }
        .food-card p { margin: 0 0 10px; font: 14px/1.3 Georgia, serif; }
        .add-button {
          margin-top: auto;
          min-width: 92px;
          padding: 8px 18px;
          border: 1px solid ${colors.red};
          border-radius: 5px;
          color: ${colors.red};
          background: transparent;
          text-decoration: none;
          font: 700 15px/1 Arial, sans-serif;
        }
        .add-button:hover { background: ${colors.red}; color: white; }
        .section { padding: 76px 6%; text-align: center; }
        .section.alt { background: ${colors.creamLight}; }
        .section h2 { margin: 0 0 18px; font: 700 36px/1.2 Georgia, serif; color: ${colors.red}; }
        .section p { max-width: 760px; margin: 0 auto 24px; font: 18px/1.7 Arial, sans-serif; }
        .order-box { max-width: 780px; margin: 0 auto; padding: 34px; border-radius: 18px; background: ${colors.brown}; color: white; }
        .order-box h2 { color: white; }
        @media (max-width: 1100px) {
          .site-header { grid-template-columns: 1fr auto; }
          .brand-mark { display: none; }
          .hero { grid-template-columns: 1fr; }
          .menu-panel { width: 100%; }
          .hero-copy { padding-top: 0; }
        }
        @media (max-width: 760px) {
          .site-header { position: static; display: block; padding: 16px; }
          .nav-left, .nav-right { justify-content: center; flex-wrap: wrap; gap: 16px; }
          .nav-right { margin-top: 14px; }
          .hero { padding: 34px 18px; min-height: 0; }
          .pizza-grid, .favorites-grid { grid-template-columns: 1fr 1fr; }
          .food-icon { width: 120px; height: 120px; font-size: 72px; }
        }
        @media (max-width: 480px) {
          .pizza-grid, .favorites-grid { grid-template-columns: 1fr; }
          .nav-left { gap: 12px; }
          .script-logo { font-size: 68px; }
          .markets { font-size: 36px; }
        }
      `}</style>

      <header className="site-header">
        <nav className="nav-left" aria-label="Primary navigation">
          <a className="nav-link" href="#about">ABOUT US</a>
          <a className="nav-link" href="#menu">OUR MENU</a>
          <a className="nav-link" href="#market-dates">MARKET DATES</a>
          <a className="nav-link" href="#catering">CATERING</a>
          <a className="nav-link" href="#shop">SHOP</a>
        </nav>

        <a className="brand-mark" href="#top" aria-label="Homemade Markets home">
          👨‍🍳<span>♥</span>
        </a>

        <nav className="nav-right" aria-label="Quick actions">
          <a href="#menu" style={{ ...buttonStyle, background: colors.red, color: '#fff' }}>SEE OUR MENU</a>
          <a href="#market-dates" style={{ ...buttonStyle, background: colors.red, color: '#fff' }}>FIND US AT A MARKET</a>
        </nav>
      </header>

      <section id="top" className="hero" aria-label="Homemade Markets landing page">
        <div className="hero-copy">
          <div className="chef" aria-hidden="true">👨‍🍳</div>
          <div className="heart" aria-hidden="true">♥</div>
          <h1 className="script-logo">Homemade</h1>
          <div className="markets">• MARKETS •</div>
          <div className="divider" />
          <p className="tagline">MADE WITH CARE.<br />MADE FOR YOU.</p>
          <p>From our kitchen to your table—handmade favorites made with quality ingredients and a whole lot of heart.</p>
          <a href="#order" style={{ ...buttonStyle, background: colors.black, color: '#fff', minWidth: '180px' }}>PLACE ORDER</a>
        </div>

        <div id="menu" className="menu-panel">
          <h2 className="menu-heading">♥ WOOD-FIRED PIZZAS ♥</h2>
          <div className="food-grid pizza-grid">
            {pizzas.map((food) => <FoodCard key={food.name} food={food} />)}
          </div>
          <h2 className="menu-heading" style={{ marginTop: '28px' }}>♥ HOMEMADE FAVORITES ♥</h2>
          <div className="food-grid favorites-grid">
            {favorites.map((food) => <FoodCard key={food.name} food={food} />)}
          </div>
        </div>
      </section>

      <section id="about" className="section alt">
        <h2>About Homemade Markets</h2>
        <p>Homemade Markets serves small-batch comfort food prepared with care, including wood-fired pizzas, jambalaya, chocolate chip banana bread, and tiramisu.</p>
      </section>

      <section id="market-dates" className="section">
        <h2>Market Dates</h2>
        <p>Upcoming farmers-market locations and dates will be posted here.</p>
      </section>

      <section id="catering" className="section alt">
        <h2>Catering</h2>
        <p>Contact Homemade Markets for catering availability, larger orders, and event service.</p>
        <a href="https://www.facebook.com/HomemadeMarkets" target="_blank" rel="noreferrer" style={{ ...buttonStyle, background: colors.red, color: '#fff' }}>CONTACT US ON FACEBOOK</a>
      </section>

      <section id="shop" className="section">
        <h2>Shop</h2>
        <p>Online ordering and pickup options will be added here.</p>
      </section>

      <section id="order" className="section alt">
        <div className="order-box">
          <h2>Place an Order</h2>
          <p>Message Homemade Markets on Facebook to ask about current availability and place an order.</p>
          <a href="https://www.facebook.com/HomemadeMarkets" target="_blank" rel="noreferrer" style={{ ...buttonStyle, background: '#fff', color: colors.brown }}>OPEN FACEBOOK</a>
        </div>
      </section>
    </main>
  );
}
