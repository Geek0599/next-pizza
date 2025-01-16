import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "./get-user-session"
import crypto from 'crypto';

export const findOrCreateCart = async (token?: string) => {
	const session = await getUserSession()

	let userCart = await prisma.cart.findFirst({
		where: {
			OR: [
				...(session?.id ? [{ userId: Number(session.id) }] : []),
				...(token ? [{ token }] : []),
			],
		},
	});

	// додаємо userId до кошику користувача якщо він аворизований
	if (userCart && session && session.id && String(userCart.userId) !== session.id) {
		userCart = await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				userId: Number(session.id)
			}
		})
	}
	// видаляємо userId у кошика користувача, який вийшов з аккаунту
	if (userCart && !session && userCart.userId) {
		userCart = await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				userId: null
			}
		})
	}

	if (!userCart) {
		if (!token) {
			token = crypto.randomUUID()
		}
		userCart = await prisma.cart.create({
			data: {
				token: token,
				userId: Number(session?.id) ?? null
			}
		})
	}

	return userCart
}