import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface PayOrderTemplateProps {
  orderId: number;
  items: CartItemDTO[]
}

export const OrderSuccessTemplate: React.FC<PayOrderTemplateProps> = ({
  orderId,
  items
}) => {
	return (
		<div>
		  <h1>Дякуємо за замовлення! 🥹🥰 Замовлення №{orderId} було успішно сплачено!</h1>
	 
		  <h2>Список замовлення:</h2>
	 
		  <hr/>
		  <ul>
			 {items.map((item)=>(
				 <li key={item.id}>
					 {item.productItem?.product?.name} | {item.productItem?.price} грн. х {item?.quantity} шт. = {' '}
					 {item.productItem?.price * item?.quantity} грн.
				 </li>
			 ))}
		  </ul>
		</div>
	 );
	
}
