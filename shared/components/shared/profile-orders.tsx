'use client';
import React, { useEffect, useState } from 'react';
import { WhiteBlock } from './white-block';
import { Title } from './title';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';
import { calcCartItemTotalPrice, getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants';
import { OrderItem } from './order-item';
import { OrderStatus } from './order-status';
import { Skeleton } from '../ui';
import { Api } from '@/shared/services/api-client';
import toast from 'react-hot-toast';
import { CartOrder, CartItemWithDetails} from '@/shared/services/orders';
import { formatDate } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

export const ProfileOrders: React.FC<Props> = ({ className }) => {
	const [orders, setOrders] = useState<CartOrder[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(()=>{
		async function fetchUserOrders() {
			try{
				setLoading(true)

				const orders = await Api.orders.getOrders()

				if(orders && orders.length){					
					setOrders(orders)
				}

			} catch(error) {
				console.log('Error при спробі завантажити ваші замовлення', error);
				return toast.error('Помилка при спробі завантажити ваші замовлення', {
					icon: '❌'
				})
			}
		}
		
		fetchUserOrders().catch((error)=>{
			console.log('Error Fetch orders', error);
			setError(true)
		})
		.finally(()=>{
			setLoading(false)
		})
		
	}, [])


	return (
		<div className={className}>
			<div className="grid gap-7">
				{
					// error
					error && !loading && (
						<div className='text-center grid gap-3 py-3'>
							<Title text='Вибачте, щось пішло не так. Спробуйде пізніше!' size="sm" className="font-bold" />
						</div>
					)
				}
				{
					// loading
					!loading && !error && orders.length === 0 && (
						<div className='text-center grid gap-3 py-3'>
							<Title text='У вас поки що немає замовлень' size="sm" className="font-bold" />
						</div>
					)
				}
				{
					// result
					(orders.length > 0 && orders || loading ? [...Array(2)] : []).map((order: CartOrder, index)=>(
						<WhiteBlock
							key={loading ?  index : order.id}
							endAdornment={loading ? <Skeleton className='inline-block w-32 h-8 rounded-sm'/> : null} 
							title={loading ? 'Замовлення №' : `Замовлення № ${order.orderId}`}
						>
							<div className="flex flex-col">

									{
										loading ? (
											[...Array(2)].map((_, index)=> (
												<CheckoutItemSkeleton key={index} className='lg:h-[92px]'/> 
											))
										) : (
											order.items.map((item: CartItemWithDetails) =>(
												<OrderItem
													key={item.id}
													className={'py-4'}
													id={order.id} 
													imageUrl={item.productItem.product.imageUrl} 
													details={getCartItemDetails(item.ingredients, item.productItem.pizzaType as PizzaType, item.productItem.size as PizzaSize)} 
													name={item.productItem.product.name} 
													price={calcCartItemTotalPrice(item)}
													quantity={item.quantity} 
												/>
											))
										)
									}
								
							</div>
							<div className="sm:pt-4 pt-3 pb-3 px-1 border-t border-gray-100 flex items-center justify-between flex-wrap gap-y-2 gap-x-6">
								<h4 className='text-[20px] font-bold  flex flex-wrap gap-2 items-center justify-end'>Вартість доставки: {loading ? <Skeleton className='inline-block w-20 h-10 rounded-sm' /> : <span className='text-primary'>{order.deliveryPrice === 0 ? 'безкоштовно' : order.deliveryPrice + ' грн.'}</span>}</h4>
								<h4 className='text-[20px] font-bold flex flex-wrap gap-2 items-center'>Дата замовлення: {loading ? <Skeleton className='inline-block w-32 h-8 rounded-sm' /> : <span className='text-primary'>{formatDate(order.createdAt)}</span>}</h4>
							</div>
							<div className="sm:pt-4 pt-3 sm:pb-1 px-1 border-t border-gray-100 flex flex-wrap gap-3 items-center justify-between">
								<OrderStatus value={loading ? '' : order.status} loading={loading} />
								<h4 className='text-[22px] font-bold  flex flex-wrap gap-2 items-center justify-end'>Сума {loading ? <Skeleton className='inline-block w-20 h-10 rounded-sm' /> : <span className='text-primary'>{order.totalAmount} грн.</span>}</h4>
							</div>
						</WhiteBlock>
					))
				}
			</div>
		</div>
	);
}