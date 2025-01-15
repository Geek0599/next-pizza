'use server'

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components";
import { VerificationCodeTemplate } from "@/shared/components/shared/email-templates/verification-code";
import { CheckoutFormValuesType } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { generateOrderIdForLiqPay } from "@/shared/lib/utils";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";


export async function createOrder(data: CheckoutFormValuesType) {

	try {
		const cookieStore = cookies()
		const cartToken = cookieStore.get('cartToken')?.value;
		const session = await getUserSession()


		if (!cartToken) {
			throw new Error('Cart token is not found');
		}

		// Find cart by token
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true
							}
						}
					}
				}
			},
			where: {
				OR: [
					...(session?.id ? [{ userId: Number(session.id) }] : []),
					{ token: cartToken },
				]
			}
		})

		if (!userCart) {
			throw new Error('Cart is not found')
		}

		if (userCart.totalAmount === 0) {
			throw new Error('Cart is empty')
		}

		const orderId = generateOrderIdForLiqPay()

		const DELIVERY_PRICE = Number(process.env.NEXT_PUBLIC_DELIVERY_PRICE);
		const FREE_DELIVERY_PRICE_FROM = Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_PRICE_FROM);
		const deliveryPrice = userCart.totalAmount > FREE_DELIVERY_PRICE_FROM ? 0 : DELIVERY_PRICE
		const totalAmount = userCart.totalAmount + deliveryPrice

		// Create order
		const order = await prisma.order.create({
			data: {
				userId: userCart.user?.id,
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				addres: data.address,
				comment: data.comment,
				orderId,
				totalAmount,
				deliveryPrice,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items)
			}
		})

		// Clear totalAmout in cart
		await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount: 0
			}
		})
		// Clear cart items
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id
			}
		})
		// Create order payment link
		const paymentUrl = await createPayment({
			amount: totalAmount, // Сума платежу
			currency: 'UAH', // Валюта
			description: `Оплата замовлення № ${orderId}`, // Опис платежу
			order_id: orderId
		})

		if (paymentUrl) {
			// Create email for payment
			await sendEmail(
				data.email,
				`Next Pizza | Сплата замовлення № ${orderId}`,
				PayOrderTemplate({ orderId, totalAmount, paymentUrl, items: userCart.items, deliveryPrice })
			)
			return paymentUrl;
		}
	} catch (error) {
		console.log('[CREATE_ORDER] Server error', error);
		throw new Error(String(error))
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('Користувач не знайдений')
		}


		const findUder = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id)
			}
		})

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUder?.password,
				updatedAt: new Date()
			}
		})


	} catch (error) {
		console.log('[UPDATE_USER] Error', error);
		throw error
	}

}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email
			}
		})

		if (user) {
			if (!user.verified) {
				throw new Error('Пошта не підтверджена')
			}

			throw new Error('Такий користувач уже існує')
		}

		const createUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			}
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.vereficationCode.create({
			data: {
				code,
				userId: createUser.id
			}
		})// тут додатково можна додати час активності цього коду + додати в схему Prisma

		await sendEmail(
			createUser.email,
			`Next Pizza | Підтвердження реєстрації`,
			VerificationCodeTemplate({ code })
		)


	} catch (error) {
		console.error('Error [CREATE_USER]', error);
		throw error
	}
}