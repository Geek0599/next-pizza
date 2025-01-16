import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const session = await getUserSession()

		if (!session || !session?.id) {
			return NextResponse.json({ message: 'Unauthorized user' }, { status: 500 })
		}


		const orders = await prisma.order.findMany({
			where: {
				userId: Number(session?.id)
			},
			select: {
				id: true,
				totalAmount: true,
				status: true,
				deliveryPrice: true,
				orderId: true,
				items: true,
				createdAt: true
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(orders)
	} catch (error) {
		console.log('[ORDERS_GET] Server error', error);
		return NextResponse.json({ error: error }, { status: 500 })
	}
}