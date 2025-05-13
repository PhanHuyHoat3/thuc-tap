    // src/components/BookItem.jsx
    import { useMutation } from '@apollo/client';
    import { Link } from 'react-router-dom';
    import { DELETE_BOOK, GET_BOOKS } from '../graphql/queries';
    import styles from '../styles/BookItem.module.css';

    function BookItem({ book }) {
    const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
        update(cache, { data: { deleteBook } }) {
        const { books } = cache.readQuery({ query: GET_BOOKS });
        cache.writeQuery({
            query: GET_BOOKS,
            data: { books: books.filter((b) => b.id !== deleteBook.id) },
        });
        },
    });

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc muốn xóa sách này không?')) {
        await deleteBook({ variables: { id: book.id } });
        }
    };

    return (
        <div className={styles.bookItem}>
        <h3>{book.title}</h3>
        <p>Tác giả: {book.author}</p>
        <p>Năm xuất bản: {book.publishedYear}</p>
        <div className={styles.actions}>
            <Link to={`/books/${book.id}`} className={styles.button}>Xem</Link>
            <Link to={`/books/${book.id}/edit`} className={styles.button}>Sửa</Link>
            <button onClick={handleDelete} disabled={loading} className={styles.button}>
            {loading ? 'Đang xóa...' : 'Xóa'}
            </button>
        </div>
        {error && <div className={styles.error}>Lỗi: {error.message}</div>}
        </div>
    );
    }

    export default BookItem;