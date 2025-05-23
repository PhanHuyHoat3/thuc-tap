    'use client';

    import { Product } from '@/types/Product';
    import Link from 'next/link';
    import Image from 'next/image';

    export default function ProductItem({ product }: { product: Product }) {
    return (
        <div className="product-card">
        <Image
            src={product.imageUrl}
            alt={product.title}
            width={300}
            height={200}
            className="product-image"
        />
        <h3>{product.title}</h3>
        <p>{product.description.slice(0, 100)}...</p>
        <Link href={`/products/${product.id}`}>
            <button className="view-button">View Details</button>
        </Link>
        </div>
    );
    }
