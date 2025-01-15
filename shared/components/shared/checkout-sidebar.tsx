'use client';
import React, { useState } from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { Button, Skeleton } from '../ui';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { ErrorText } from './error-text';

interface Props {
	loading: boolean
	submiting: boolean
	isCartEmpty: boolean
	totalPrice: number
	vatPrice: number;
	deliveryPrice: number | string;
	cartPrice: number
	VAT_PERSENT: number
}

export const CheckoutSidebar: React.FC<Props> = ({ loading, submiting, isCartEmpty, totalPrice, deliveryPrice, vatPrice, cartPrice, VAT_PERSENT}) => {
	const FREE_DELIVERY_PRICE_FROM = Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_PRICE_FROM);

	return (
		<WhiteBlock className="sm:p-6 p-2 sticky top-4">
			<div className="flex flex-col gap-1">
				<span className="text-xl">Загалом:</span>
				<span className="text-[34px] font-extrabold flex items-center gap-2">{loading ? <Skeleton className='inline-block w-32 h-11'/> : totalPrice} грн.</span>
			</div>

			<CheckoutItemDetails title="Вартість замовлення" value={loading ? <Skeleton className='h-6 w-14 rounded-sm'/> : cartPrice} Icon={Package}/>
			<CheckoutItemDetails title="Доставка" value={loading ? <Skeleton className='h-6 w-14 rounded-sm'/> : deliveryPrice} Icon={Truck}/>
			<CheckoutItemDetails title={`Податки ${VAT_PERSENT}% державі`} value={loading ? <Skeleton className='h-6 w-14 rounded-sm'/> : vatPrice} Icon={Percent} classNameValue="font-normal text-primary"/>
			{!isCartEmpty && cartPrice < FREE_DELIVERY_PRICE_FROM && <ErrorText className='text-primary' text={`Доставка буде безкоштовною, якщо вартість замовлення буде більше ніж ${FREE_DELIVERY_PRICE_FROM} грн.`} />}
			
			<Button disabled={isCartEmpty} loading={loading || submiting} type="submit" form='checkout' className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Перейти до сплати
				<ArrowRight className="w-5 ml-2"/>
			</Button>
		</WhiteBlock>
	);
}