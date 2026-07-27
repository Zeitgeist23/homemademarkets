import './menu.css';

const FACEBOOK_URL = 'https://www.facebook.com/HomemadeMarkets';

const menuLinks = [
  { className: 'menu-logo-link', href: '/', label: 'Return to the Homemade Markets landing page' },
  { className: 'menu-classic-cheese', href: FACEBOOK_URL, label: 'Ask about ordering the Classic Cheese Pizza for $18', external: true },
  { className: 'menu-pepperoni', href: FACEBOOK_URL, label: 'Ask about ordering the Pepperoni Pizza for $20', external: true },
  { className: 'menu-bbq-chicken', href: FACEBOOK_URL, label: 'Ask about ordering the BBQ Chicken Pizza for $22', external: true },
  { className: 'menu-veggie', href: FACEBOOK_URL, label: 'Ask about ordering the Veggie Pizza for $25', external: true },
  { className: 'menu-jambalaya', href: FACEBOOK_URL, label: 'Ask about ordering Homemade Jambalaya for $10 per serving', external: true },
  { className: 'menu-banana-bread', href: FACEBOOK_URL, label: 'Ask about ordering Chocolate Chip Banana Bread for $8 per loaf', external: true },
  { className: 'menu-tiramisu', href: FACEBOOK_URL, label: 'Ask about ordering Classic Tiramisu for $7 per cup', external: true },
  { className: 'menu-qr-link', href: FACEBOOK_URL, label: 'Open Homemade Markets on Facebook', external: true },
  { className: 'menu-facebook-link', href: FACEBOOK_URL, label: 'Find Homemade Markets on Facebook', external: true },
];

export const metadata = {
  title: 'Menu | Homemade Markets',
  description: 'View Homemade Markets pizzas, jambalaya, chocolate chip banana bread, and tiramisu, and contact us about current availability.',
};

export default function MenuPage() {
  return (
    <main className="menu-page">
      <section className="menu-poster" aria-label="Interactive Homemade Markets menu">
        <img
          className="menu-poster-image"
          src="/homemade-markets-food-page.png?v=20260727-5"
          alt="Homemade Markets menu featuring Classic Cheese, Pepperoni, BBQ Chicken and Veggie pizzas, jambalaya, chocolate chip banana bread, and classic tiramisu"
        />

        {menuLinks.map((link) => (
          <a
            key={link.className}
            className={`menu-hotspot ${link.className}`}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
          >
            <span className="menu-sr-only">{link.label}</span>
          </a>
        ))}
      </section>
    </main>
  );
}
