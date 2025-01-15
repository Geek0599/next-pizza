'use client';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { CheckoutSidebar, Container, Title, CheckoutAddressFrom, CheckoutCart, CheckoutPersonalForm } from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValuesType } from '@/shared/constants'
import { useCart } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/api/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

const VAT_PERSENT =  Number(process.env.NEXT_PUBLIC_VAT_PERSENT)
const DELIVERY_PRICE = Number(process.env.NEXT_PUBLIC_DELIVERY_PRICE);
const FREE_DELIVERY_PRICE_FROM = Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_PRICE_FROM);

export default function CheckoutPage(){
	const [submiting, setSubmiting] = useState(false)
	const { totalAmount, items, removeCartItem, loading, onClickCountButton } = useCart()
	const session = useSession()
	const form = useForm<CheckoutFormValuesType>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: ''
		}
	})

	useEffect(()=>{
		async function fetchUserInfo() {
			setSubmiting(true)
			const data = await Api.auth.getMe()
			const [firstName, lastName] = data?.fullName?.split(' ')

			form.setValue('email', data.email)
			form.setValue('firstName', firstName)
			form.setValue('lastName', lastName)
		}
		
		if(session && session.status === 'authenticated'){
			setSubmiting(true)
			fetchUserInfo().finally(()=>{
				setSubmiting(false)
			})
		}
	},[session, form])

	const cartPrice = totalAmount
	const vatPrice = Number(((totalAmount / 100) * VAT_PERSENT).toFixed(2))
	const totalPrice =  totalAmount ? Number((totalAmount + (totalAmount > FREE_DELIVERY_PRICE_FROM ? 0 : DELIVERY_PRICE)).toFixed(2)) : 0
	const deliveryPrice = totalAmount > FREE_DELIVERY_PRICE_FROM ? 'безкоштовно' : DELIVERY_PRICE
	const isCartEmpty =  !totalAmount ? true : false
	

	const onValidSubmit = async (formData: CheckoutFormValuesType) => {
		
		try{
			setSubmiting(true)
			const url = await createOrder(formData);

			toast.error('Замовлення успішно створено 🍕 Перехід на сплату...', {
				icon: '✅ 🥰'
			})

			if(url){
				window.location.href = url
			}

		} catch(err) {
			console.log(err);
			toast.error('Виникла помилка при створенні замовлення', {
				icon: '❌'
			})
			setSubmiting(false)
		}
		
	}

	return (
		<div className="mt-10">
      	<Title text="Оформлення замовлення" className="font-extrabold mb-8 text-[36px]" />

			<div className="flex lg:flex-row flex-col gap-8 pb-20">
				{/* Left side */}
				<div className="flex-1">
					<FormProvider {...form}>
						<form id="checkout" className="flex flex-col gap-8" onSubmit={form.handleSubmit(onValidSubmit)}>
							<CheckoutCart loading={loading} items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} />
							<CheckoutPersonalForm className={cn({'opacity-40 pointer-events-none': isCartEmpty})} />
							<CheckoutAddressFrom className={cn({'opacity-40 pointer-events-none': isCartEmpty})}/>
						</form>
					</FormProvider>
				</div>

				{/* Right side */}
				<div className="lg:w-[450px] lg:basis-[450px] shrink-0">
					<CheckoutSidebar 
						isCartEmpty={isCartEmpty} 
						loading={loading} 
						submiting={submiting} 
						totalPrice={totalPrice} 
						VAT_PERSENT={VAT_PERSENT}
						deliveryPrice={deliveryPrice}
						vatPrice={vatPrice}
						cartPrice={cartPrice}
					/>
				</div>
			</div>
		</div>
	)
}