import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: {params: { id: string}}) {
	try{
		const id = Number(params.id)
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get('cartToken')?.value;

		if(!token){
			return NextResponse.json({error: 'Cart token is not found'})
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: id
			}
		})

		if(!cartItem){
			return NextResponse.json({error: 'Cart item is not found'})
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity
			}
		})

		const updatedUserCart = await updateCartTotalAmount(token)
		return NextResponse.json(updatedUserCart)
	}catch(error){
		console.log('[CART_PATCH] Server error', error);
		return NextResponse.json({message: 'Не вдалося оновити корзину'}, {status: 500})
	}finally{

	}
}


export async function DELETE(req: NextRequest, { params }: {params: { id: string}}) {
	try {
		const id = Number(params.id);
		const token = req.cookies.get('cartToken')?.value

		if(!token){
			return NextResponse.json({message: 'Cart token is not found'})
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: id
			}
		})

		if(!cartItem){
			return NextResponse.json({message: 'Cart Item is not found'})
		}

		await prisma.cartItem.delete({
			where: {
				id: id
			}
		})

		const updatedUserCart = await updateCartTotalAmount(token)
		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_DELETE] Server error', error);
		return NextResponse.json({message: 'Не вдалося видалити корзину'}, { status: 500 })
	}
}