// Menu image is served from a real public asset to avoid broken data URIs.
export default function MenuPage() {
  return (
    <main style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh', background: '#f7f0e4' }}>
      <img
        src="/menu-page.webp?v=20260726-2"
        alt="Homemade Markets food-items page featuring pizzas, jambalaya, chocolate chip banana bread, and tiramisu"
        style={{ display: 'block', width: '100%', height: 'auto', margin: 0, padding: 0 }}
      />
    </main>
  );
}
