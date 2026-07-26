import menuImageData from './menuImageData';

export default function MenuPage() {
  return (
    <main style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh', background: '#f7f0e4' }}>
      <img
        src={menuImageData}
        alt="Homemade Markets food-items page featuring pizzas, jambalaya, chocolate chip banana bread, and tiramisu"
        style={{ display: 'block', width: '100%', height: 'auto', margin: 0, padding: 0 }}
      />
    </main>
  );
}
