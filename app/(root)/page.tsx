import { Container, Filters, Title, ProductsGroupList, TopBar } from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import { Stories } from "@/shared/components/shared";

export default async function Home({ searchParams } : { searchParams : GetSearchParams }) {
	const categories = await findPizzas(searchParams)	

	const isEmpty = categories.every(category => category.products.length === 0);
	
  return (
   <>
		<Stories />
		<Container className="md:mt-10 sm:mt-8 my-4">
			<Title text="Всі піцци" size="lg" className="font-extrabold"/>
		</Container>
		<TopBar categories={categories.filter((category)=>category.products.length > 0)}/>
		<Container className="pb-14">
			<div className="flex xl:flex-row flex-col lx:gap-[80px] md:mt-10 sm:mt-8 mt-6 sm:gap-[55px] gap-[40px]">
				{/* Filters */}
				<div className="xl:w-[250px]">
					<Suspense>
						<Filters />
					</Suspense>
				</div>

				{/* Product List */}
				<div className="flex-1">
					<div className="flex flex-col">
						{
							categories.map((category) => (
								category.products.length > 0 && (
									<ProductsGroupList 
										key={category.id} 
										title={category.name} 
										items={category.products} 
										categoryId={category.id}
										className="sm:pt-24 first:pt-0 pt-5 sm:mt-0 mt-16 first:mt-0"
									/>
								)
							))
						}
						{
							isEmpty && <Title className="text-center font-bold" size='sm' text="Продуктів не знайдено"/>
						}
					</div>
				</div>
			</div>
		</Container>
	</>
  );
}
