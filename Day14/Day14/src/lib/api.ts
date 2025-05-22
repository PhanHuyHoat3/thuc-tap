import { Order } from "@/types/order";

const API_BASE_URL = "http://localhost:3000" || '';

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function getOrderById(id: string): Promise<{ ok: boolean; data?: Order }> {
  const res = await fetch(`${API_BASE_URL}/api/${id}`);

  if (!res.ok) {
    return { ok: false };
  }

  const data = await res.json();
  return { ok: true, data };
}


export async function createOrder(data: Omit<Order, 'id'>): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function updateOrder(id: string, data: Partial<Order>): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update order');
  return res.json();
}

export async function deleteOrder(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 204) {
    return { message: 'Đã xoá thành công' };
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Xóa đơn hàng thất bại');
  }

  const data = await res.json();
  return data;
}
