import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-label="Homemade Markets homepage hero">
        <Image
          src="/homemade-markets-hero.webp"
          alt="Homemade Markets farmers market stand with pizza, jambalaya, desserts, navigation and brand messaging"
          width={600}
          height={391}
          priority
          sizes="100vw"
          className="hero-image"
        />
      </section>
    </main>
  );
}
