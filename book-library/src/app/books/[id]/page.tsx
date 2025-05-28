    import { client } from '@/lib/apollo';
    import { GET_BOOK } from '@/graphql/queries';

    interface Book {
    id: string;
    title: string;
    body: string;
    }

    export default async function BookDetailPage({
    params,
    }: {
    params: { id: string };
    }) {
    try {
        const { data } = await client.query({
        query: GET_BOOK,
        variables: { id: params.id },
        });

        const book: Book = data.post;

        return (
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-12">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
            {book.title}
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {book.body}
            </p>
        </div>
        );
    } catch (error) {
        return (
        <div className="max-w-4xl mx-auto mt-12 p-6 text-center text-red-600 font-semibold text-xl">
            Error loading book. Please try again later.
        </div>
        );
    }
    }
