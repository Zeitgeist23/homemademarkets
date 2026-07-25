import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-label="Homemade Markets homepage hero">
        <Image
          src="/homemade-markets-hero.jpg"
          alt="Homemade Markets farmers market stand with pizza, jambalaya, desserts, navigation and brand messaging"
          width={1063}
          height={693}
          priority
          sizes="(max-width: 1063px) 100vw, 1063px"
          className="hero-image"
        />
      </section>
    </main>
  );
}
