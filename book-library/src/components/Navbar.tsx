    import Link from 'next/link';

    export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-200">
        <Link href="/" className="mr-4">
            Home
        </Link>
        <Link href="/books" className="mr-4">
            Books
        </Link>
        <Link href="/books/new">Add Book</Link>
        </nav>
    );
    }
