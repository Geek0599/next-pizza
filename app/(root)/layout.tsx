import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Main Page",
  description: "Top Nex Pizza in Ukraine",
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
