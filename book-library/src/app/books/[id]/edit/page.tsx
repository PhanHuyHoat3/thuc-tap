    import { client } from '@/lib/apollo';
    import { GET_BOOK } from '@/graphql/queries';
    import BookForm from '@/components/BookForm';

    interface Book {
    id: string;
    title: string;
    body: string;
    }

    export default async function EditBookPage({
    params,
    }: {
    params: { id: string };
    }) {
    try {
        const { data } = await client.query({
        query: GET_BOOK,
        variables: { id: params.id },
        });

        return <BookForm book={data.post} />;
    } catch (error) {
        return (
        <div className="max-w-4xl mx-auto mt-12 p-6 text-center text-red-600 font-semibold text-xl">
            Error loading book. Please try again later.
        </div>
        );
    }
    }
