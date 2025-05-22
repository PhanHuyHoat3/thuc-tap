'use client';

import { useState } from 'react';
import OrderItem from '@/compoment/OrderItem';
import { Order } from '@/types/order';
import { deleteOrder } from '@/lib/api';

interface OrdersListClientProps {
  initialOrders: Order[];
}

export default function OrdersListClient({ initialOrders }: OrdersListClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
  if (!confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;

  setLoadingId(id);
  try {
    await deleteOrder(id);
    alert('Đã xóa đơn hàng thành công');
    setOrders((prev) => prev.filter((order) => order.id !== id));
  } catch (error) {
    alert((error as Error).message);
  } finally {
    setLoadingId(null);
  }
};

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onDelete={handleDelete}
          disabled={loadingId === order.id}
        />
      ))}
    </ul>
  );
}