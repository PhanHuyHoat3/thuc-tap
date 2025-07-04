    'use client';

    import { useState } from 'react';
    import { TextField, Button } from '@mui/material';
    import { gql, useMutation } from '@apollo/client';

    const CREATE_COMMENT = gql`
    mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
        id
        productId
        userId
        content
        createdAt
        }
    }
    `;

    export default function CommentForm({ productId }: { productId: string }) {
    const [content, setContent] = useState('');

    const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
        onCompleted() {
        setContent('');
        // TODO: invalidation hoặc refetch comment list nếu cần
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
        await createComment({
            variables: {
            input: {
                productId,
                content,
            },
            },
        });
        } catch (err) {
        console.error('Failed to create comment:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <TextField
            label="Add a comment"
            fullWidth
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
        />
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            disabled={loading}
        >
            {loading ? 'Submitting...' : 'Submit'}
        </Button>
        {error && <p style={{ color: 'red' }}>Failed to submit comment.</p>}
        </form>
    );
    }
