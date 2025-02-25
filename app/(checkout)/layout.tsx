import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata : Metadata = {
	title: 'Оформлення замовлення',
	description: 'Оформлення замовлення в сервісі Next Pizza UA -  доставці піцци',
 }
 
 export default function CheckoutLayout({
	children,
 }: {
	children: React.ReactNode
 }) {
	return (
	  <main className="min-h-screen bg-[#f4f1ee]">
			<Container>
				<Suspense>
					<Header hasSearch={false} hasCart={false} className="border-gray-200"/>
				</Suspense>
				{children}
			</Container>
	  </main>
	)
 }
 