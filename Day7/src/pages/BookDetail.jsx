// src/pages/BookDetail.jsx
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_BOOK } from '../graphql/queries';
import styles from '../styles/BookDetail.module.css';

function BookDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK, { variables: { id } });

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>Lỗi: {error.message}</div>;

  const { book } = data;

  return (
    <div className={styles.detailContainer}>
      <h2>{book.title}</h2>
      <p>Tác giả: {book.author}</p>
      <p>Năm xuất bản: {book.publishedYear}</p>
      <div className={styles.actions}>
        <Link to={`/books/${id}/edit`} className={styles.button}>Sửa</Link>
        <Link to="/" className={styles.button}>Quay lại</Link>
      </div>
    </div>
  );
}

export default BookDetail;