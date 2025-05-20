import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      className="bg-blue-500 text-white p-4 shadow-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Trang chủ */}
        <Link
          href="/"
          className="text-xl font-bold hover:text-yellow-300 transition duration-300"
          aria-label="Trang chủ Blog-App"
        >
          Blog-App
        </Link>

        {/* Các liên kết */}
        <div className="flex space-x-6 text-base">
          <Link
            href="/posts"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            Bài viết
          </Link>
          <Link
            href="/posts/new"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            Thêm bài viết
          </Link>
        </div>
      </div>
    </nav>
  );
}