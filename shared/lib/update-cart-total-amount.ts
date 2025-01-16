import { prisma } from "@/prisma/prisma-client"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import { getUserSession } from "./get-user-session";

export const updateCartTotalAmount = async (token: string) => {
	const session = await getUserSession()

	const userCart = await prisma.cart.findFirst({
		where: {
			OR: [
				...(session?.id ? [{ userId: Number(session.id) }] : []),
				...(!session?.id && token ? [{ token }] : []),
			],
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc'
				},
				include: {
					productItem: {
						include: {
							product: true
						}
					},
					ingredients: true
				}
			}
		}
	})

	if (!userCart) {
		return;
	}

	if (!userCart.userId && session && session.id) {

	}

	const totalAmount = userCart.items.reduce((acc, item) => acc + calcCartItemTotalPrice(item), 0)

	return await prisma.cart.update({
		where: {
			id: userCart.id
		},
		data: {
			totalAmount: totalAmount
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc'
				},
				include: {
					productItem: {
						include: {
							product: true
						}
					},
					ingredients: true
				}
			}
		}
	})
}