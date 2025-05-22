import { z } from 'zod';

export const orderSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  userId: z.string().min(1, 'Mã người dùng không được để trống'),
});

export function validateOrder(data: any) {
  return orderSchema.safeParse(data);
}