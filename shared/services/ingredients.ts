import { Ingredient } from "@prisma/client"
import { axiosInstance } from "./axios-instanse"
import { ApiRoutes } from "./constants"

export const getAll = async ():Promise<Ingredient[]> => {
	return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data
}