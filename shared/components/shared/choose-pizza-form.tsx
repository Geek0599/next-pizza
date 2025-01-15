'use client';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { GroupVariants, PizzaImage, Title, IngredientItem } from '@/shared/components/shared';
import { Button } from '../ui';
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { caclTotalPizzaPrice, getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading?: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	ingredients,
	items,
	loading,
	onSubmit,
 }) => {
	const { size, type, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient} = usePizzaOptions(items)
	
	const { textDetails, textIngredients } = getPizzaDetails(size, type, ingredients, selectedIngredients)

	const totalPrise = caclTotalPizzaPrice(type, size, items, ingredients, selectedIngredients)

	const handleClickAdd = () => {
		if(currentItemId){			
			onSubmit(
				currentItemId,
				Array.from(selectedIngredients)
			)
		}
	}
	
	
	return (
		<div className={cn('flex lg:flex-row flex-col flex-1', className)}>
			<PizzaImage imageUrl={imageUrl} size={size}/>

			<div className="lg:w-[490px] bg-[#faf8f8] md:p-7 sm:p-5 p-4 rounded-md">
				<Title text={name} size='md' className='font-extrabold mb-1'/>
				<p className="text-gray-400">{textDetails}</p>

				<div className="flex flex-col gap-3 my-3">
					<GroupVariants items={pizzaTypes}  selectedValue={String(type)} onClick={(value)=> setType(Number(value) as PizzaType)} />
					<GroupVariants items={availableSizes}  selectedValue={String(size)} onClick={(value)=> setSize(Number(value) as PizzaSize)} />
				</div>

				{textIngredients && (
					<p className='text-gray-400 font-bold py-1 my-2'><span className='text-primary'>Додаткові інгредієнти:</span> {textIngredients}</p>
				)}
				<div className="bg-gray-50 py-2 sm:px-5 px-2 rounded-md max-h-[420px] overflow-auto scrollbar">
					<div className="grid lg:grid-cols-3 justify-items-center grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl} 
								name={ingredient.name} 
								price={ingredient.price} 
								onClick={()=>{addIngredient(ingredient.id)}} 
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>



				<Button 
					loading={loading} 
					onClick={handleClickAdd} 
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
					Додати в корзину за {totalPrise} грн.
				</Button>
			</div>
		</div>
	);
}