'use client';

import { validateOrder } from '@/lib/validate';
import { Order } from '@/types/order';
import { useState, useEffect } from 'react';

interface OrderFormProps {
  onSubmit: (data: Omit<Order, 'id'>) => Promise<void> | void;
  initialData?: Omit<Order, 'id'>;
}

interface FormErrors {
  title?: string;
  description?: string;
  userId?: string;
}

export default function OrderForm({ onSubmit, initialData }: OrderFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? '');
      setDescription(initialData.description ?? '');
      setUserId(initialData.userId ?? '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = validateOrder({ title, description, userId });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        if (err.path?.length) {
          fieldErrors[err.path[0] as keyof FormErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title, description, userId });
    } catch (err: any) {
      setErrors({ title: err?.message || 'Đã có lỗi xảy ra khi gửi đơn hàng' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">
        {initialData ? 'Chỉnh sửa đơn hàng' : 'Tạo đơn hàng mới'}
      </h2>

      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
          Tiêu đề
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Nhập tiêu đề đơn hàng"
          required
          minLength={3}
          disabled={loading}
        />
        {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
          Mô tả
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Nhập mô tả đơn hàng"
          required
          minLength={10}
          disabled={loading}
        />
        {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="userId" className="block mb-1 font-medium text-gray-700">
          Mã người dùng
        </label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.userId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Nhập mã người dùng"
          required
          disabled={loading}
        />
        {errors.userId && <p className="text-red-500 mt-1 text-sm">{errors.userId}</p>}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading
            ? 'Đang gửi...'
            : initialData
            ? 'Cập nhật đơn hàng'
            : 'Tạo đơn hàng'}
        </button>
      </div>
    </form>
  );
}