import OrdersListClient from '@/compoment/OrdersListClient';
import { getOrders } from '@/lib/api';
import { Order } from '@/types/order';

export default async function OrdersPage() {
  const orders: Order[] = await getOrders();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Danh sách đơn hàng</h1>
      <OrdersListClient initialOrders={orders} />
    </div>
  );
}