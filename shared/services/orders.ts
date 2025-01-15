import { CartItem, Order, Prisma } from "@prisma/client";
import { axiosInstance } from "./axios-instanse";

export type CartOrderWithJsonItems = Pick<Order, 'id' | 'totalAmount' | 'status' | 'deliveryPrice' | 'orderId' | 'createdAt' | 'items'>;

export type CartItemWithDetails = Prisma.CartItemGetPayload<{
	include: {
		ingredients: true;
		productItem: {
			include: {
				product: true;
			};
		};
	};
}>;

export type CartOrder = Pick<Order, 'id' | 'totalAmount' | 'status' | 'deliveryPrice' | 'orderId' | 'createdAt'> & {
	items: CartItemWithDetails[];
};


export const getOrders = async (): Promise<CartOrder[]> => {
	return (await axiosInstance.get<CartOrderWithJsonItems[]>('/orders')).data.map((order) => {
		return {
			...order,
			items: JSON.parse(order.items as string) as CartItem[],
		} as CartOrder;
	});
};
