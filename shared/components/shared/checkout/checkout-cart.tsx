import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';
import { Title } from '../title';
import { Button } from '../../ui';
import Link from 'next/link';

interface Props {
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
	removeCartItem: (id: number) => void;
	className?: string;
	loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, onClickCountButton, removeCartItem, loading }) => {	
	return (
		<WhiteBlock title="1. Кошик" className={className}>
			<div className="flex flex-col">

				{
					!loading && items.length === 0 && (
						<div className='text-center grid gap-3'>
							<Title text='Ваш кошик пустий' size="sm" className="font-bold" />
							<Link href='/'>
								<Button variant={'outline'} size='lg' asChild><span>Перейти на головну</span></Button>
							</Link>
						</div>
					)
				}

				{
					loading && items.length == 0 && [...Array(3)].map((_, index)=>(
						<CheckoutItemSkeleton key={index} className='lg:h-[92px]'/>
					))
				}

				{
					items && items.length > 0 && items.map((item, index, arr) => {						
						const isNotLast = index !== arr.length - 1
						return (
							item.disabled ?
							<div key={item.id}>
								<CheckoutItemSkeleton className='lg:h-[92px]'/> 
								{isNotLast && ( <hr />)}
							</div>
							:
							<div key={item.id}>
								<CheckoutItem
									className={'py-4'}
									id={item.id} 
									imageUrl={item.imageUrl} 
									details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)} 
									name={item.name} 
									price={item.price} 
									quantity={item.quantity} 
									disabled={item.disabled}
									onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
									onClickRemove={()=> removeCartItem(item.id)}
								/>
								{isNotLast && ( <hr />)}
							</div>
						)
					}
				)}
			</div>
		</WhiteBlock>
	);
}