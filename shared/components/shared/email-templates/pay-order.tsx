import * as React from 'react';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface PayOrderTemplateProps {
  orderId: string;
  totalAmount: number
  paymentUrl: string
  items: CartItemDTO[]
  deliveryPrice: number
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
  items,
  deliveryPrice
}) => (
  <div>
    <h1>Замовлення №{orderId} </h1>

	 <h3>Оплатіть ваше замовлення на сумму <b>{totalAmount}</b> грн. Перейдіть <a href={paymentUrl}>по цьому посиланню</a> для сплати замовлення.</h3>
	 <h4>Список замовлення:</h4>
	<hr/>
	<ul>
		{items.map((item)=>(
			<li key={item.id}>
				{item.productItem?.product?.name} | {item.productItem?.price} грн. х {item?.quantity} шт. = {' '}
				{item.productItem?.price * item?.quantity} грн.
			</li>
		))}
		<li>Вартість доставки = {deliveryPrice > 0 ? deliveryPrice + ' ' + 'грн.' : 'безкоштовно! 😉'}</li>
	</ul>
  </div>
);
