    import { client } from '@/lib/apollo';
    import { GET_BOOKS } from '@/graphql/queries';
    import Link from 'next/link';
    import DeleteButton from '@/components/DeleteButton';

    interface Book {
    id: string;
    title: string;
    body: string;
    }

    export default async function BooksPage() {
    const { data } = await client.query({
        query: GET_BOOKS,
        fetchPolicy: 'network-only', // Bỏ qua cache, luôn lấy dữ liệu mới
    });

    return (
        <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Danh sách sách</h1>
        <div className="mb-6">
            <Link
            href="/books/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
            + Thêm sách mới
            </Link>
        </div>

        <ul>
            {data.posts.data.map((book: Book) => (
            <li key={book.id} className="mb-4 border p-4 rounded shadow-sm">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p>{book.body}</p>
                <div className="mt-2">
                <Link
                    href={`/books/${book.id}`}
                    className="text-blue-600 hover:underline mr-4"
                >
                    Xem chi tiết
                </Link>
                <Link
                    href={`/books/${book.id}/edit`}
                    className="text-orange-600 hover:underline mr-4"
                >
                    Sửa
                </Link>
                <DeleteButton id={book.id} />
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
    }
