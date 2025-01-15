'use client';
import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';
import { ClearButton } from './clear-button';
import { cn } from '@/shared/lib/utils';

type Item = FilterChecboxProps

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaysholder?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selectedIds?: Set<string>;
	className?: string;
	name?: string;
	isSortOnChekedItems?: boolean
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaysholder = 'Пошук...',
	className,
	loading,
	onClickCheckbox,
	selectedIds,
	name,
	isSortOnChekedItems = true,
	defaultValue
 }) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearcValue] = useState('');
	let selectedItemsQuantity = items.filter((item)=> selectedIds?.has(item.value)).length


	if(loading){		
		return (
			<div className={className}>
				<p className="fonts-bold mb-3">{title}</p>
				{
					[...Array(limit)].map((item, index)=>(
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]'/>
					))
				}
			</div>
		)
	}

	const list = (function(){
		if(showAll){
			return items.filter((item)=> item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
		}else if(isSortOnChekedItems){
			let selectedItemsList = selectedItemsQuantity ? items.filter((item)=> selectedIds?.has(item.value)).concat(...items.filter((item)=> !selectedIds?.has(item.value))) : []
			if(selectedItemsQuantity && selectedItemsQuantity >= limit ){
				return selectedItemsList.slice(0, selectedItemsQuantity + 1) 
			}
			return (selectedItemsQuantity ? selectedItemsList : (defaultItems || items)).slice(0, limit)
		}
		return items
	})()

	const onClickClear = ()=>{
		setSearcValue('')
	}

	const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearcValue(e.target.value);
	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className="mb-5 relative">
					<Input value={searchValue} onChange={onSearchInput} placeholder={searchInputPlaysholder} className='bg-gray-50 border-none'/>
					{searchValue && <ClearButton onClick={onClickClear}/>}
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{
					list.length ? list.map((item, index)=>(
						<FilterCheckbox 
							key={index}
							text={item.text}
							value={item.value}
							endAdornment={item.endAdornment}
							checked={selectedIds?.has(item.value)}
							onCheckedChange={()=>{onClickCheckbox?.(item.value)}}
							name={name}
						/>
					)) : 'Інгредіентів не знайдено'
				}
			</div>

			{
				items.length > limit && items.length > selectedItemsQuantity && (
					<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
						<button onClick={()=>{
							setShowAll(!showAll)
							if(showAll){
								setSearcValue('')
							}
						}} className='text-primary mt-3'>
							{showAll ? 'Сховати' : '+ Показати все'}
						</button>
					</div>
				)
			}
		</div>
	);
}