import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriseProps {
	priceFrom?: number;
	priceTo?: number;
}
interface QueryFilters extends PriseProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}
export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredientsIds: Set<string>;
	prises: PriseProps
}
interface ReturnProps extends Filters {
	setPrices: (name: keyof PriseProps, value: number) => void;
	setPizzaTypes: (value: string) =>  void;
	setSizes: (value: string) => void;
	setSelectedIngredientsIds: (value: string) => void;
}

export const useFilters = () : ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	const [selectedIngredientsIds, { toggle : toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));
	const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.has("pizzaTypes") ? searchParams.get('pizzaTypes')?.split(',') : []));
	const [prises, setPrices] = useState<PriseProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	})

	const updatePrise = (name: keyof PriseProps, value: number) => {
		setPrices((prises)=>({
			...prises,
			[name]: value
		}))
	}

	return useMemo(
		()=>({
			sizes,
			pizzaTypes,
			selectedIngredientsIds,
			prises,
			setPrices: updatePrise,
			setSelectedIngredientsIds: toggleIngredients,
			setSizes: toggleSizes,
			setPizzaTypes: togglePizzaTypes,
		}), 
		[sizes, pizzaTypes, selectedIngredientsIds, prises]
	)
}