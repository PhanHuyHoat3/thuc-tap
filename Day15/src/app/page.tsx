import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Product Catalog</h1>
      <p>
        Explore our range of products with detailed descriptions and images.
      </p>
      <Link href="/products">
        <button style={{ marginTop: '1rem' }}>View Products</button>
      </Link>
    </div>
  );
}
