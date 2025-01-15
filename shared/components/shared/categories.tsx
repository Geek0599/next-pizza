
'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';
import { TabBar } from './tab-bar';

interface Props {
	items: Category[]
	className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore((state)=> state.activeId)
	return (
		<TabBar activeTabId={categoryActiveId} items={items} itemElementRender={({ name, id, isActive }) => (
			<a
				className={cn(
					'flex items-center font-bold h-11 rounded-2xl px-5',
					isActive && 'bg-white shadow-md shadow-gray-200 text-primary'
				)}
				key={id}
				href={`/#${name}`}
			>
				<button>{name}</button>
			</a>
		 )} 
		className={className}/>
	);
}