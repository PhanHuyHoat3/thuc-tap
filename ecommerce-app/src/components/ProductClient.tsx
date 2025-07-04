    'use client';

    import CommentList from './CommentList';
    import CommentForm from './CommentForm';

    interface Props {
    productId: string;
    }

    export default function ProductClient({ productId }: Props) {
    console.log('ProductClient productId:', productId);
    return (
        <>
        <CommentList productId={productId} />
        <CommentForm productId={productId} />
        </>
    );
    }
