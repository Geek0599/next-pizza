import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
	className?: string;
	items: { name: string; id: number }[];
	activeTabId?: number;
	itemElementRender?: (item: { name: string; id: number; isActive: boolean }) => React.ReactElement;
	onClick?: ({ name , id }: { name: string; id: number }) => any
 }
 
 export const TabBar: React.FC<Props> = ({ items, activeTabId, itemElementRender, onClick, className }) => {
	return (
		<div className={cn('inline-flex sm:flex-nowrap flex-wrap gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
			{
				items.map((item) => {
					const {name, id } = item;

				return itemElementRender ? 
					(
						itemElementRender({ name, id, isActive: activeTabId === id })
					) : (
						<button
							key={id}
							className={cn(
								'flex items-center font-bold h-11 rounded-2xl px-5',
								activeTabId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
							)}
							onClick={()=> onClick?.(item)}
						>
							{name}
						</button>
					)
				})
			}
		</div>
	 );
 }