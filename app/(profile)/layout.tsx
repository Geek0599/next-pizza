import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Мій профіль",
	description: "Керуйте своїми замовленнями та налаштуваннями в сервісі Next Pizza UA — зручна доставка піци для вас.",
 };
 
 
 export default function CheckoutLayout({
	children,
 }: {
	children: React.ReactNode
 }) {
	return (
	  <main className="min-h-screen bg-[#f4f1ee] pb-8">
			<Container>
				<Suspense>
					<Header hasSearch={false} hasCart={false} className="border-gray-200"/>
				</Suspense>
				{children}
			</Container>
	  </main>
	)
 }
 