'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>📚 Welcome to Book Library</h1>
      <p className={styles.description}>
        This is a simple book management app using Next.js, Apollo Client, and
        GraphQL.
      </p>
      <Link href="/books" className={styles.button}>
        View Books
      </Link>
    </main>
  );
}
