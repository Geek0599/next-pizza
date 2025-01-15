import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { _ingredients, categories, products } from "./constants";

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number;
	pizzaType?: 1 | 2;
	size?: 20 | 30 | 40;
}) => {
	return {
		productId,
		price: randomNumber(150, 350),
		pizzaType,
		size,
	} as Prisma.ProductItemUncheckedCreateInput;
};


async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User Test',
				email: "user@test.ua",
				password: hashSync('111111', 10),
				verified: new Date,
				role: 'USER'
			},
			{
				fullName: 'Admin Admin',
				email: "admin@test.ua",
				password: hashSync('111111', 10),
				verified: new Date,
				role: 'ADMIN'
			}
		]
	})
	await prisma.category.createMany({
		data: categories
	})
	await prisma.ingredient.createMany({
		data: _ingredients
	})
	await prisma.product.createMany({
		data: products
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пеппероні фреш',
			imageUrl: '/assets/images/pizzas/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сирна',
			imageUrl: '/assets/images/pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl: '/assets/images/pizzas/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 40),
			},
		},
	});

	await prisma.productItem.createMany({
		data: [
			// Піцца Папероні Фреш
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

			// Піцца "Сирна"
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			// Піцца "Чоризо фреш"
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

			// Інші продукти
			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
			generateProductItem({ productId: 11 }),
			generateProductItem({ productId: 12 }),
			generateProductItem({ productId: 13 }),
			generateProductItem({ productId: 14 }),
			generateProductItem({ productId: 15 }),
			generateProductItem({ productId: 16 }),
			generateProductItem({ productId: 17 }),
		],
	});

	await prisma.story.createMany({
		data: [
			{
				name: 'Новинки',
				previewImageUrl: '/assets/images/stories/new-pizzas.jpg',
			},
			{
				name: 'Акції',
				previewImageUrl: 'assets/images/stories/discount.webp',
			},
			{
				name: 'Вайб',
				previewImageUrl: '/assets/images/stories/vibe.jpg',
			},
			{
				name: 'Меми',
				previewImageUrl: '/assets/images/stories/mem.jpg',
			},
			{
				name: 'Відгуки',
				previewImageUrl: '/assets/images/stories/reviews.jpg',
			},
			{
				name: 'Доставка',
				previewImageUrl: '/assets/images/stories/delivery.jpg',
			},
		],
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/new-1.jpeg',
			},
			{
				storyId: 1,
				sourceUrl: '/assets/images/stories/new-2.jpg',
			},
			{
				storyId: 2,
				sourceUrl: 'assets/images/stories/discount-1.webp',
			},
			{
				storyId: 2,
				sourceUrl: 'assets/images/stories/discount-2.webp',
			},
			{
				storyId: 3,
				sourceUrl: 'assets/images/stories/vibe-1.jpg',
			},
			{
				storyId: 3,
				sourceUrl: 'assets/images/stories/vibe-2.jpg',
			},
			{
				storyId: 3,
				sourceUrl: 'assets/images/stories/vibe-3.jpg',
			},
			{
				storyId: 3,
				sourceUrl: 'assets/images/stories/vibe-4.jpg',
			},
			{
				storyId: 3,
				sourceUrl: 'assets/images/stories/vibe-5.jpg',
			},
			{
				storyId: 3,
				sourceUrl: 'assets/images/stories/vibe-6.jpg',
			},
			{
				storyId: 4,
				sourceUrl: 'assets/images/stories/mem-1.png',
			},
			{
				storyId: 4,
				sourceUrl: 'assets/images/stories/mem-2.png',
			},
			{
				storyId: 4,
				sourceUrl: 'assets/images/stories/mem-3.png',
			},
			{
				storyId: 4,
				sourceUrl: 'assets/images/stories/mem-4.png',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-1.jpg',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-2.jpg',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-3.jpg',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-4.jpg',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-5.jpg',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-6.jpg',
			},
			{
				storyId: 5,
				sourceUrl: 'assets/images/stories/reviews-7.jpg',
			},
			{
				storyId: 6,
				sourceUrl: 'assets/images/stories/delivery-1.jpg',
			},
		],
	});
}
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}
async function main() {
	try {
		await down()
		await up()
	} catch (error) {
		console.error(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	})