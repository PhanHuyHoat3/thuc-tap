import { Product } from '@/types/Product';
import ProductList from '@/components/ProductList';

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?_limit=10`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.body,
    imageUrl: `https://picsum.photos/seed/${item.id}/600/400`,
  }));
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Product List</h1>
      <ProductList products={products} />
    </div>
  );
}
