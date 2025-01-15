import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функція для підрахунку загальної вартості піцци обраної за параметрами
 * @param type - Тип тіста обраної піцци
 * @param size - Розмір обраної піцци
 * @param items - Список варіацій піцц
 * @param ingredients - Список доступних інгредієнтів
 * @param selectedIngredients - Обрані інгредієнти по ID
 * @returns number - Загальна вартість піцци обраної за параметрами
 */
export const caclTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice = Number(items.find((item) => item.pizzaType === type && item.size === size)?.price || 0)
	const ingredientsPrice = ingredients.filter((item) => selectedIngredients.has(item.id))
										   .reduce((acc, item) => acc + item.price, 0)
	return pizzaPrice + ingredientsPrice;
}