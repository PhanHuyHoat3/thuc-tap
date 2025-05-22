import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Order App</h1>
      <Link
        href="/orders"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Danh sách đơn hàng
      </Link>
    </div>
  );
}