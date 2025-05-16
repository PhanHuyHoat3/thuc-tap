    import Link from 'next/link';

    export default function Navbar() {
    return (
        <nav className="bg-blue-500 text-white p-4">
        <div className="max-w-2xl mx-auto flex space-x-4">
            <Link href="/" className="hover:underline">
            Home
            </Link>
            <Link href="/todos" className="hover:underline">
            Todos
            </Link>
        </div>
        </nav>
    );
    }
