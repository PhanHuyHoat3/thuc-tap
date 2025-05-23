    'use client';

    import dynamic from 'next/dynamic';
    import { Product } from '@/types/Product';

    const ProductItem = dynamic(() => import('./ProductItem'), { ssr: false });

    export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="product-grid">
        {products.map((product) => (
            <ProductItem key={product.id} product={product} />
        ))}
        </div>
    );
    }
