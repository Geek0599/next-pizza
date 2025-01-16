import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value;
		const session = await getUserSession()

		if (!token && !session) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		let cart = await findOrCreateCart(token)

		const userCart = await prisma.cart.findFirst({
			where: {
				id: cart.id
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});


		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error);
		return NextResponse.json({ message: 'Не вдалося знайти корзину' }, { status: 500 })
	}

}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		const userCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: { every: { id: { in: data.ingredients } } }
			}
		})

		// Якщо товар був знайдений то ми робимо + 1
		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id
				},
				data: {
					quantity: findCartItem.quantity + 1
				}
			})
		} else {
			// Якощо товар не знайдений
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: {
						connect: data.ingredients?.map((id) => ({ id }))
					}
				}
			})
		}

		const updatedUserCart = await updateCartTotalAmount(userCart.token);

		const resp = NextResponse.json(updatedUserCart);

		resp.cookies.set('cartToken', userCart.token);

		return resp;

	} catch (error) {
		console.log('[CART_POST] Server error', error);
		return NextResponse.json({ message: 'Не вдалося створити корзину' }, { status: 500 })
	}
}