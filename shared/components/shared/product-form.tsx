'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/shared/store';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm, ChooseProductForm } from '.';

interface Props {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit : _onSubmit }) => {
	const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading])
	const firstItem = product.items[0]
	const isPizzaProduct = Boolean(product.items[0].pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try{
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients
			})
			toast.success(`${isPizzaProduct ? ('Піцца ' + product.name + ' додана') : (product.name + ' доданий') } до кошику`);
			_onSubmit?.();
		} catch(error) {
			toast.error('Не вдалося додати товар у кошик')
			console.error(error)
		}
	}

	
	if(isPizzaProduct){
		return (
			<ChoosePizzaForm 
				imageUrl={product.imageUrl} 
				name={product.name} 
				ingredients={product.ingredients} 
				items={product.items} 
				onSubmit={onSubmit}
				loading={loading} 
			/> 
		)
	}

	return (
		<ChooseProductForm 
			imageUrl={product.imageUrl} 
			name={product.name} 
			price={firstItem.price} 
			onSubmit={()=>onSubmit()}
			loading={loading} 
		/>
	)
}