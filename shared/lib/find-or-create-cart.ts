import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "./get-user-session"

export const findOrCreateCart = async (token: string) => {
	const session = await getUserSession()

	let userCart = await prisma.cart.findFirst({
		where: {
			OR: [
				...(session?.id ? [{ userId: Number(session.id) }] : []),
				{ token: token },
			]
		}
	})

	if (userCart && session && session.id) {
		userCart = await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				userId: Number(session.id)
			}
		})
	}

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token: token,
				userId: Number(session?.id) ?? null
			}
		})
	}

	return userCart
}