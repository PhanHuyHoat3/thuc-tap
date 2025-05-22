import OrderForm from '@/compoment/OrderForm';
import { getOrderById, updateOrder } from '@/lib/api';
import { Order } from '@/types/order';
import { notFound, redirect } from 'next/navigation';

export default async function EditOrderPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  if (!order) return notFound();

  console.log('order:', order, params.id);
  const orderData = order.data;

  const orderDataWithDefaults: Omit<Order, 'id'> = {
    title: orderData.title ?? '',
    description: orderData.description ?? '',
    userId: orderData.userId ?? '',
  };

  console.log('orderDataWithDefaults:', orderDataWithDefaults);

  const handleUpdate = async (data: Omit<Order, 'id'>) => {
    'use server';
    await updateOrder(params.id, data);
    redirect('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <OrderForm onSubmit={handleUpdate} initialData={orderDataWithDefaults} />
    </div>
  );
}