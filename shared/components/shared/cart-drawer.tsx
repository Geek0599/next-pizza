'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
 } from "@/shared/components/ui/sheet"
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks';


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { totalAmount, items, loading, removeCartItem, onClickCountButton} = useCart()
	const count = items.length
	
	const renderPluralFormCart = (quantity: number): string => {
		if (quantity % 100 >= 11 && quantity % 100 <= 14) {
				return 'товарів';
		}
		switch (quantity % 10) {
				case 1:
					return 'товар';
				case 2:
				case 3:
				case 4:
					return 'товари';
				default:
					return 'товарів';
		}
	}
	
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between bg-[#f4f1ee] md:p-6 md:pb-0 sm:p-5 sm:pb-0 p-4 pb-0'>
				<div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>

					{!totalAmount && (
						<div className="flex flex-col items-center justify-center mx-auto">
							<Image src="/assets/images/empty-box.png" alt='Empty cart' width={120} height={120} loading='lazy' decoding='async'/>
							<Title size='sm' text='Кошик пустий' className='text-center font-bold my-2'/>
							<SheetTitle>
								<p className='text-center text-neutral-500 mb-5 max-w-72'>
									Додайте хоча б один товар, щоб зробити замовлення
								</p>
							</SheetTitle>
							<SheetDescription></SheetDescription>
							<SheetClose asChild>
								<Button  className='min-h-12 text-base' size="lg">
									<ArrowLeft className='w-5 mr-1 basis-[35px] shrink-0'/>
									Повернутися назад
								</Button>
							</SheetClose>
						</div>
					)}

					{ totalAmount > 0 && (
						<>
							<SheetHeader>
								<SheetTitle className='text-left'>У кошику <span className='font-bold'>{count} {renderPluralFormCart(count)}</span></SheetTitle>
								<SheetDescription>

								</SheetDescription>
							</SheetHeader>
							{/* items */}
							<div className="md:-mx-6 sm:-mx-5 -mx-4 mt-5 overflow-auto scrollbar flex-1">
								{items.map((productItem)=>(
									<div key={productItem.id} className='mb-2'>
										<CartDrawerItem 
											id={productItem.id} 
											imageUrl={productItem.imageUrl} 
											details={getCartItemDetails(productItem.ingredients, productItem.pizzaType as PizzaType, productItem.pizzaSize as PizzaSize)} 
											disabled={productItem.disabled}
											name={productItem.name} 
											price={productItem.price} 
											quantity={productItem.quantity}
											onClickCountButton={(type) => onClickCountButton(productItem.id, productItem.quantity, type)}
											onClickRemoveItem={()=> removeCartItem(productItem.id)}
										/>
									</div>
								))}
							</div>

							<SheetFooter className='md:-mx-6 sm:-mx-5 -mx-4 bg-white md:p-4 sm:p-6 p-4'>
								<div className="w-full">

									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											Загалом
											<span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
										</span>

										<span className="font-bold text-lg">{totalAmount} грн.</span>
									</div>
									<Link href="/checkout">
										<Button loading={loading} type="submit" className="w-full h-12 text-base">
											Оформити замовлення
											<ArrowRight className='w-5 ml-2'/>
										</Button>
									</Link>

								</div>
							</SheetFooter>
						</>)
					}

				</div>
			</SheetContent>
		</Sheet>
	);
}