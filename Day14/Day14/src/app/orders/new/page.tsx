'use client';

import OrderForm from '@/compoment/OrderForm';
import { createOrder } from '@/lib/api';
import { Order } from '@/types/order';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();

  const handleAddOrder = async (data: Omit<Order, 'id'>) => {
    try {
      await createOrder(data);
      router.push('/orders');
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert('Có lỗi xảy ra khi thêm đơn hàng.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <OrderForm onSubmit={handleAddOrder} />
    </div>
  );
}