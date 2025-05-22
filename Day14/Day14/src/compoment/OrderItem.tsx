"use client";

import { Order } from "@/types/order";
import Link from "next/link";

interface OrderItemProps {
	order: Order;
	onDelete?: (id: string) => void;
	disabled?: boolean;
}

export default function OrderItem({
	order,
	onDelete,
	disabled,
}: OrderItemProps) {
	const handleDelete = () => {
		if (onDelete) onDelete(order.id);
	};

	return (
		<li className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300 border border-gray-200 sm:flex-row sm:items-center sm:justify-between gap-4">
			<div className="flex-1">
				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					{order.title}
				</h2>
				<p className="text-gray-600 line-clamp-3">{order.description}</p>
				<p className="text-sm text-gray-500 mt-2">
					Mã người dùng: {order.userId}
				</p>
			</div>

			<div className="flex justify-between sm:mt-4">
				<Link
					href={`/orders/${order.id}`}
					className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition px-3 py-1 rounded"
				>
					Xem chi tiết →
				</Link>

				<Link
					href={`/orders/${order.id}/edit`}
					className="text-yellow-600 font-medium hover:underline hover:text-yellow-800 transition px-3 py-1 rounded"
				>
					Sửa
				</Link>

				<button
					onClick={handleDelete}
					className="text-red-600 font-medium hover:underline hover:text-red-800 transition px-3 py-1 rounded disabled:opacity-50"
					type="button"
					disabled={disabled}
				>
					{disabled ? "Đang xóa..." : "Xóa"}
				</button>
			</div>
		</li>
	);
}
