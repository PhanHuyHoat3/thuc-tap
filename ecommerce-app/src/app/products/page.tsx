    import { gql } from '@apollo/client';
    import { getClient } from '@/lib/apolloClient';
    import ProductItem from '@/components/ProductItem';

    const GET_PRODUCTS = gql`
    query {
        posts {
        data {
            id
            title
            body
        }
        }
    }
    `;

    export const revalidate = 60;

    export default async function ProductListPage() {
    const { data } = await getClient().query({ query: GET_PRODUCTS });

    return (
        <>
        {data.posts.data.map((product: any) => (
            <ProductItem key={product.id} product={product} />
        ))}
        </>
    );
    }
