    // src/pages/Books.jsx
    import { useQuery } from '@apollo/client';
    import { Link } from 'react-router-dom';
    import BookItem from '../components/BookItem';
    import { GET_BOOKS } from '../graphql/queries';
    import styles from '../styles/Books.module.css';

    function Books() {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <div className={styles.loading}>Đang tải...</div>;
    if (error) return <div className={styles.error}>Lỗi: {error.message}</div>;

    return (
        <div className={styles.booksContainer}>
        <h2>Danh Sách Sách</h2>
        <Link to="/books/new" className={styles.addButton}>Thêm Sách Mới</Link>
        <div className={styles.bookList}>
            {data.books.map((book) => <BookItem key={book.id} book={book} />)}
        </div>
        </div>
    );
    }

    export default Books;