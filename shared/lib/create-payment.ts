import crypto from 'crypto';



export async function createPayment({ amount, currency, description, order_id }: { amount: number, currency: string, description: string, order_id: string }) {

	try {
		const publicKey = process.env.LIQPAY_PUBLIC_KEY || '';
		const privateKey = process.env.LIQPAY_PRIVATE_KEY || '';

		const paymentData = {
			public_key: publicKey,
			version: '3',
			action: 'pay',
			amount,
			currency,
			description,
			order_id,
			server_url: `${process.env.NODE_ENV === 'development' ? process.env.BASE_URL_TUNNEL : process.env.BASE_URL}/api/liqpay-callback`,
			result_url: `${process.env.BASE_URL}/order-payment-success`,
		};

		const data = Buffer.from(JSON.stringify(paymentData)).toString('base64');
		const signature = crypto
			.createHash('sha1')
			.update(privateKey + data + privateKey)
			.digest('base64');


		const liqpayUrl = `https://www.liqpay.ua/api/3/checkout`;
		const queryParams = new URLSearchParams({
			data,
			signature,
		});

		// Повертаємо URL для редіректу
		return `${liqpayUrl}?${queryParams.toString()}`;
	} catch (error) {
		console.error('Ошибка создания платежа:', error);
	}

}