'use client';
import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients, useFilters, useQueryFilters } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

const rageSliderStep = 10;
const initFrom = 0;
const initTo = 1000;

export const Filters: React.FC<Props> = ({ className }) => {
	const {ingredients, loading} = useIngredients()
	const filters = useFilters()
	useQueryFilters(filters)
	
	const items = ingredients.map((ingredient)=> ({value: String(ingredient.id), text: ingredient.name}))

	const updatePrises = ([from, to] : number[]) => {	
		filters.setPrices('priceFrom', Number(from < to ? from : to - rageSliderStep))
		filters.setPrices('priceTo', Number(to > from ? to : from + rageSliderStep < (filters.prises.priceTo || initTo) ? from + rageSliderStep : filters.prises.priceTo))
	}

	
	return (
		<div className={cn('xl:block grid sm:grid-cols-2 grid-cols-[1fr] gap-x-9',className)}>
			<Title text='Фільтрація' size='sm' className='mb-5 font-bold sm:col-span-2' />

			<CheckboxFiltersGroup 
				title='Тип тіста'
				name='pizzaTypes'
				className='mb-5' 
				onClickCheckbox={filters.setPizzaTypes}
				selectedIds={filters.pizzaTypes}
				items={[
					{ text: 'Тонке', value: '1' },
         	   { text: 'Традиційне', value: '2' }
				]}
				isSortOnChekedItems={false}
			/>

			<CheckboxFiltersGroup 
				title='Розміри'
				name='sizes'
				className='mb-5' 
				onClickCheckbox={filters.setSizes}
				selectedIds={filters.sizes}
				items={[
					{text: '20 cм', value: '20'},
					{text: '30 cм', value: '30'},
					{text: '40 cм', value: '40'}
				]}
				isSortOnChekedItems={false}
			/>

			<div className="sm:mt-5 mt-3 border-y border-y-neutral-100 sm:py-6 sm:pb-7 py-4 sm:col-span-2">
				<p className='font-bold mb-3'>Ціни від і до:</p>
				<div className="flex gap-3 mb-5">
					<Input type='number' min={0} max={1000} placeholder={'0'} value={String(filters.prises.priceFrom || '')}
						onChange={(e)=>filters.setPrices("priceFrom", Number(+e.target.value >= initFrom && +e.target.value <= initTo ? e.target.value : initFrom))}
					/>
					<Input type='number' min={100} max={1000} placeholder={'1000'} value={String(filters.prises.priceTo || '')}
						onChange={(e)=>filters.setPrices("priceTo", Number(+e.target.value <= initTo && +e.target.value >= initFrom ? e.target.value : initTo))}
					/>
				</div>
				<div className='xl:px-0 px-6'>
					<RangeSlider min={0} max={1000} step={rageSliderStep} value={[filters.prises.priceFrom || initFrom, filters.prises.priceTo || initTo]} 
					onValueChange={updatePrises}/>
				</div>
			</div>

			<CheckboxFiltersGroup 
				title='Інгридієнти'
				className='mt-5' 
				name='ingredients'
				limit={6} 
				defaultItems={items.slice(0,6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredientsIds}
				selectedIds={filters.selectedIngredientsIds}
			/>
		</div>
	);
}