import { useEffect } from "react";
import { useCartStore } from "../store";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(state => state)
	useEffect(() => {
		cartState.fetchCartItems()
	}, [])

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		if (type === 'minus' && quantity === 1) return
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		cartState.updateItemQuantity(id, newQuantity)
	}

	return { ...cartState, onClickCountButton }
}

