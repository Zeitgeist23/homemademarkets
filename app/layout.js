import './globals.css';

export const metadata = {
  title: 'Homemade Markets | Local Food. Made with Care.',
  description: 'Homemade pizzas, jambalaya, desserts and more—made fresh with quality ingredients you can trust.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
