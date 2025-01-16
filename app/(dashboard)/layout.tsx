import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata : Metadata = {
	title: 'Мій дашборд',
	description: 'Мій дашборд в Next Pizza UA',
 }
 
 export default function DashboardLayout({
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
 