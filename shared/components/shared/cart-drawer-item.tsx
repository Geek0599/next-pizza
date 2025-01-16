import { cn } from '@/shared/lib/utils';
import React from 'react';

import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemoveItem?: () => void
	className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ 
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickCountButton,
	onClickRemoveItem,
	className
 }) => {
	
	return (
		<div className={
				cn(
					'sm:p-4 p-3 sm:gap-x-6 gap-x-4 gap-y-1 bg-white grid sm:grid-cols-[60px_1fr] sm:grid-rows-[40px_20px_1fr] grid-cols-[60px_1fr]', 
					{'opacity-50 pointer-events-none': disabled}, 
					className
				)
			}>
			<CartItem.Image src={imageUrl} />

			<CartItem.Info name={name} details={details} />

			<hr className='my-3 sm:col-span-2 sm:col-start-2 col-span-2'/>

			<div className="flex items-center gap-2 sm:col-start-2 sm:col-span-2 col-span-2">
				<CountButton onClickCountButton={onClickCountButton} value={quantity}/>

				<div className="flex-1 flex gap-3 items-center justify-evenly">
					<CartItem.Price className='text-center' value={price}/>
					<Trash2Icon
						onClick={onClickRemoveItem}
						size={16}
						className='text-gray-400 cursor-pointer transition-colors hover:text-gray-600'
					/>
				</div>
			</div>
		</div>
	);
}