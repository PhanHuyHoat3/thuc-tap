import { getOrderById } from '@/lib/api';
import { Order } from '@/types/order';
import Link from 'next/link';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

async function getOrder(id: string): Promise<Order> {
  const response = await getOrderById(id);

  if (!response.ok) {
    throw new Error('Không tìm thấy đơn hàng');
  }

  const order: Order = response.data;
  return order;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order: Order = await getOrder(params.id);

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{order.title}</h1>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{order.description}</p>

      <div className="text-sm text-gray-500 mb-8">
        <p><strong>Mã đơn hàng:</strong> {order.id}</p>
        <p><strong>Mã người dùng:</strong> {order.userId}</p>
      </div>

      <Link
        href="/orders"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ← Quay lại danh sách đơn hàng
      </Link>
    </div>
  );
}