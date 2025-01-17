import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { sendEmail } from '@/shared/lib';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates';
import { renderReactTemplate } from '@/shared/lib/renderReactTemplate';


// Функція перевірки підпису
function verifySignature(data: string, signature: string, privateKey: string): boolean {
	const expectedSignature = crypto
		.createHash('sha1')
		.update(privateKey + data + privateKey)
		.digest('base64');
	return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
	const privateKey = process.env.LIQPAY_PRIVATE_KEY || '';

	if (!privateKey) {
		return NextResponse.json(
			{ message: 'Private key not configured' },
			{ status: 500 }
		);
	}

	try {
		// Ручний парсинг тіла запиту
		const bodyText = await req.text();
		const urlParams = new URLSearchParams(bodyText);
		const data = urlParams.get('data');
		const signature = urlParams.get('signature');

		if (!data || !signature) {
			console.error('Missing data or signature:', { data, signature });
			return NextResponse.json(
				{ message: 'Invalid request: Missing data or signature' },
				{ status: 400 }
			);
		}

		// Перевіряємо підпис
		if (!verifySignature(data, signature, privateKey)) {
			console.error('Signature verification failed:', { data, signature });
			return NextResponse.json(
				{ message: 'Invalid signature' },
				{ status: 400 }
			);
		}

		// Розшифровуємо дані
		let decodedData: any;
		try {
			decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
		} catch (err) {
			console.error('Error decoding data:', err);
			return NextResponse.json(
				{ message: 'Error decoding data' },
				{ status: 400 }
			);
		}

		const { status, order_id, amount, currency, payment_id } = decodedData;


		if (!status || !order_id || !amount || !currency || !payment_id) {
			console.error('Missing required fields in decoded data:', decodedData);
			return NextResponse.json(
				{ message: 'Invalid data structure' },
				{ status: 400 }
			);
		}

		// console.log('status:', status);
		// console.log('order_id:', order_id);
		// console.log(`Summ: ${amount} ${currency}`);

		if (status === 'success') {
			const order = await prisma.order.findFirst({
				where: {
					orderId: order_id
				}
			})

			if (!order) {
				return NextResponse.json({ error: 'Order not found' })
			}

			await prisma.order.update({
				where: {
					id: order.id
				},
				data: {
					status: OrderStatus.SUCCEEDED,
					paymentId: String(payment_id),
				}
			})

			const items = JSON.parse(order?.items as string) as CartItemDTO[]

			await sendEmail({
				sendTo: order.email,
				subject: `Next Pizza | Ваше замовлення № ${order_id} сплачено 🎉🥰`,
				html: await renderReactTemplate(OrderSuccessTemplate({ orderId: order_id, items }))
			})

		} else {
			console.warn(`Платёж завершился с другим статусом: ${status}`);
		}

		// Відповідь для LiqPay
		return NextResponse.json({ message: 'Callback processed successfully' });
	} catch (error) {
		console.error('Ошибка обработки LiqPay callback:', error);
		return NextResponse.json(
			{ message: 'Server error' },
			{ status: 500 }
		);
	}
}
