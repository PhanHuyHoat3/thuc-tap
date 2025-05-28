import Link from 'next/link';
import styles from '../app/BookItem.module.css';

export default function BookItem({ book }: { book: any }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.body}>{book.body}</p>
      <Link href={`/books/${book.id}`} className={styles.link}>
        Details →
      </Link>
    </div>
  );
}
