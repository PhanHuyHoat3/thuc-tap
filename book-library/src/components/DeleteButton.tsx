    'use client';

    import { useMutation } from '@apollo/client';
    import { DELETE_POST } from '@/graphql/mutations';
    import { GET_BOOKS } from '@/graphql/queries';
    import { toast } from 'react-toastify';
    import { useRouter } from 'next/navigation';

    interface DeleteButtonProps {
    id: string;
    }

    export default function DeleteButton({ id }: DeleteButtonProps) {
    const router = useRouter();
    const [deletePost, { loading }] = useMutation(DELETE_POST, {
        refetchQueries: [{ query: GET_BOOKS }],
        update(cache, { data }) {
        // Cập nhật cache thủ công
        const existingBooks = cache.readQuery<{
            posts: { data: { id: string }[] };
        }>({
            query: GET_BOOKS,
        });

        if (existingBooks) {
            cache.writeQuery({
            query: GET_BOOKS,
            data: {
                posts: {
                ...existingBooks.posts,
                data: existingBooks.posts.data.filter((book) => book.id !== id),
                },
            },
            });
        }
        },
        onError: (err) => {
        toast.error(err.message || 'Không thể xóa sách.');
        },
        onCompleted: () => {
        toast.success('Xóa sách thành công.');
        router.refresh(); // Làm mới server component
        },
    });

    const handleDelete = async () => {
        if (!confirm('Bạn có chắc muốn xóa sách này không?')) return;
        try {
        await deletePost({ variables: { id } });
        } catch (err) {
        // Lỗi được xử lý bởi onError
        }
    };

    return (
        <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 hover:underline disabled:opacity-50"
        >
        {loading ? 'Đang xóa...' : 'Xóa'}
        </button>
    );
    }
