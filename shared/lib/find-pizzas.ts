import { ProductWithRelations } from "@/@types/prisma";
import { prisma } from "@/prisma/prisma-client";
import { Category, Prisma, Product } from "@prisma/client";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
	sort?: string
}

type CategoryWithProducts = Prisma.CategoryGetPayload<{
	include: {
		products: {
			include: {
				ingredients: true,
				items: true; // Включаємо звʼязані `items` для кожного продукту
			};
		};
	};
}>;

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(',').map(Number);
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
	const ingredientsIdArr = params.ingredients?.split(',').map(Number);

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;


	const getOrderBy = (selectedSort: string | undefined): Prisma.ProductOrderByWithRelationInput => {
		switch (selectedSort) {
			case 'new':
				return { id: 'desc' };  // Сортування по id  по спаданню
			case 'asc':
				return { name: 'asc' };  // Сортування по name по зростанню
			default:
				return { id: 'desc' };  // Якщо нічого не обрано, тоді сортування по спадаючому варіанту
		}
	};

	const orderBy = getOrderBy(params.sort);

	const categories: CategoryWithProducts[] = await prisma.category.findMany({
		include: {
			products: {
				orderBy: orderBy,
				where: {
					ingredients: ingredientsIdArr
						? {
							some: {
								id: {
									in: ingredientsIdArr,
								},
							},
						}
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	});

	// Сортування товарів по ціні (для випадків 'priceAsc' та 'priceDesc')
	if (params.sort === 'priceAsc' || params.sort === 'priceDesc') {
		categories.forEach((category) => {
			category.products = category.products.sort((a, b) => {
				const aPrice = a.items.length > 0 ? a.items[0].price : Infinity;
				const bPrice = b.items.length > 0 ? b.items[0].price : Infinity;

				if (params.sort === 'priceAsc') return aPrice - bPrice;
				if (params.sort === 'priceDesc') return bPrice - aPrice;

				return 0
			});
		});
	}

	return categories;
}