import qs from "qs"
import { Filters } from "./use-filters"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export const useQueryFilters = (filters: Filters) => {
	const isMounted = useRef(false)
	const router = useRouter()

	useEffect(() => {
		if (isMounted.current) {
			const currentQuery = qs.parse(window.location.search, {
				ignoreQueryPrefix: true
			});

			const newQuery = {
				...currentQuery,
				...filters.prises,
				pizzaTypes: Array.from(filters.pizzaTypes),
				sizes: Array.from(filters.sizes),
				ingredients: Array.from(filters.selectedIngredientsIds)
			};

			const query = qs.stringify(newQuery, {
				arrayFormat: 'comma'
			});

			router.push(`?${query}`, { scroll: false });
		} else {
			isMounted.current = true;
		}
	}, [filters, router]);

}