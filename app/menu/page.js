import Link from 'next/link';
import menuImageData from './menuImageData';

export default function MenuPage() {
  return (
    <main style={{ minHeight: '100vh', margin: 0, background: '#f7f0e4', padding: '24px' }}>
      <div style={{ maxWidth: '1427px', margin: '0 auto' }}>
        <div style={{ marginBottom: '18px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: '#111',
              color: '#fff',
              textDecoration: 'none',
              padding: '12px 18px',
              borderRadius: '6px',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            BACK TO HOME
          </Link>
        </div>

        <img
          src={menuImageData}
          alt="Homemade Markets menu featuring pizzas, jambalaya, chocolate chip banana bread, and tiramisu"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
    </main>
  );
}
