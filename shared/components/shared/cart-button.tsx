'use client';
import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const [totalAmount, productsQuantity, loading] = useCartStore(state => [state.totalAmount, state.items.length, state.loading])
	return (
		<CartDrawer>
			<Button 
				loading={loading} 
				className={cn('group relative min-w-[140px]', {'w-[141.5px]': loading}, className)}
			>
				<b>{totalAmount} грн.</b>
				<span className='h-full w-[1px] bg-white/30 mx-3'></span>
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart size={16} className='relative'/>
					<b>{productsQuantity}</b>
				</div>
				<ArrowRight
					size={20}
					className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
				/>
			</Button>
		</CartDrawer>
	);
}