import { axiosInstance } from './axios-instanse';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>('/cart')).data
}

export const updateItemQuantity = async (cartId: number, quantity: number): Promise<CartDTO> => {
	return (await axiosInstance.patch<CartDTO>('/cart/' + cartId, {quantity})).data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	return (await axiosInstance.post<CartDTO>('/cart', values)).data
}