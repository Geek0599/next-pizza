import { Button, Container } from "@/shared/components";
import Link from "next/link";

export default function OrderPaymentSuccess() {
	return (
		<Container>
			<div className="pt-12 flex flex-col items-center gap-4 text-2xl text-center">
				<h1>Оплата пройшла успішно!</h1>
				<p>Дякуємо за ваше замовлення! Повідомлення відправлено на вашу пошту.</p>
				<Link href='/'>
					<Button size='lg' asChild><span>Перейти на головну</span></Button>
				</Link>
			</div>
		</Container>
	);
};

