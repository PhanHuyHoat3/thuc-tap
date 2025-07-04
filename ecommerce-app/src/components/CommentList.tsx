    import { useQuery, gql } from '@apollo/client';

    const GET_COMMENTS = gql`
    query GetComments($productId: ID!) {
        comments(productId: $productId) {
        id
        content
        createdAt
        }
    }
    `;

    export default function CommentList({ productId }: { productId: string }) {
    const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
        variables: { productId },
    });

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments.</p>;

    return (
        <div>
        {data.comments.map((c: any) => (
            <div key={c.id}>
            <p>{c.content}</p>
            <small>{new Date(c.createdAt).toLocaleString()}</small>
            </div>
        ))}
        </div>
    );
    }
