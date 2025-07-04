    // src/app/products/[id]/ProductDetailClient.tsx
    'use client';

    import { gql, useQuery } from '@apollo/client';
    import CommentForm from '@/components/CommentForm';
    import CommentList from '@/components/CommentList';

    const GET_PRODUCT = gql`
    query GetProduct($id: ID!) {
        post(id: $id) {
        id
        title
        body
        }
    }
    `;

    export default function ProductDetailClient({ id }: { id: string }) {
    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product.</p>;

    const product = data.post;

    return (
        <div>
        <h1>{product.title}</h1>
        <p>{product.body}</p>
        <CommentForm productId={product.id} />
        <CommentList productId={product.id} />
        </div>
    );
    }
