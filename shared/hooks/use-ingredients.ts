import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

export const useIngredients = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		setLoading(true)
		Api.ingredients
			.getAll()
			.then(ingredients => setIngredients(ingredients))
			.catch(error => console.error(error))
			.finally(()=> setLoading(false) )
	}
	,[])

	return { 
		ingredients, 
		loading, 
	}
}