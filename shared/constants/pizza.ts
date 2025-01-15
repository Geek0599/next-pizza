export const mapPizzaSize = {
	20: 'Маленька',
	30: 'Середня',
	40: 'Велика'
} as const;

export const mapPizzaType = {
	1: 'Традиційне',
	2: 'Тонке'
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name])=>{
	return {
		name, 
		value
	}
})

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name])=>{
	return {
		name, 
		value
	}
})

export type PizzaType = keyof typeof mapPizzaType;
export type PizzaSize = keyof typeof mapPizzaSize;