import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      className="bg-red-400 text-white p-4 shadow-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold hover:text-yellow-300 transition duration-300"
          aria-label="Trang chủ Order-app"
        >
          Order app
        </Link>

        <div className="flex space-x-6 text-base">
          <Link
            href="/orders"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            Danh sách đơn hàng
          </Link>
          <Link
            href="/orders/new"
            className="hover:underline hover:text-yellow-300 transition duration-300"
          >
            Thêm đơn hàng
          </Link>
        </div>
      </div>
    </nav>
  );
}
