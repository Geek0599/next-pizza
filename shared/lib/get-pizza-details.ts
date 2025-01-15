import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

interface ReturnProps {
	textDetails: string;
	textIngredients: string | null;
}

export const getPizzaDetails = (
	size: PizzaSize,
	type: PizzaType,
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
): ReturnProps => {
	const textDetails = `${size}см, ${mapPizzaType[type]} тісто`;
	const textIngredients = selectedIngredients.size ? ingredients.filter((item) => selectedIngredients.has(item.id)).map((item) => item.name).join(', ') : null

	return {
		textDetails,
		textIngredients
	}
}