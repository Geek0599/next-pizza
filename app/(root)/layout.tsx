import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Next Pizza UA | Головна Сторінка",
	description: "Скуштуйте найкращу піцу з доставкою в Україні! Top Next Pizza пропонує свіжі інгредієнти, унікальні рецепти та швидку доставку прямо до ваших дверей.",
};
 

export default function HomeLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
		<main className="min-h-screen">
			<Suspense>
				<Header />
			</Suspense>
			{children}
			{modal}
		</main>
  );
}
