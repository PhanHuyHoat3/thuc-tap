    import { Product } from '@/types/Product';
    import Image from 'next/image';

    export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?_limit=10`);
    const data = await res.json();
    return data.map((item: any) => ({ id: item.id.toString() }));
    }

    async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return {
        id: data.id,
        title: data.title,
        description: data.body,
        imageUrl: `https://picsum.photos/seed/${data.id}/600/400`,
    };
    }

    export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);
    return {
        title: product.title,
        description: product.description,
        openGraph: {
        images: [product.imageUrl],
        },
    };
    }

    export default async function ProductDetail({
    params,
    }: {
    params: { id: string };
    }) {
    const product = await getProduct(params.id);

    return (
        <div className="product-detail">
        <Image
            src={product.imageUrl}
            alt={product.title}
            width={800}
            height={500}
            className="product-image"
            priority
        />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        </div>
    );
    }
