'use client';
import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
	title: string;
	items: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	className,
	listClassName,
	categoryId
 }) => {
	const setActiveCategoryId = useCategoryStore((state)=> state.setActiveId)
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 0.8
	});

	useEffect(()=>{		
		if(intersection?.isIntersecting){			
			setActiveCategoryId(categoryId)
		}
	},[categoryId, intersection?.isIntersecting, title])

	 
	return (
		<div id={title} ref={intersectionRef} className={className}>
			<Title text={title} size='lg' className='font-extrabold mb-4' />
			<div className={cn('grid xl:grid-cols-3 gap-[50px] sm:grid-cols-2 grid-cols-1', listClassName)}>
				{
					items.map((product, i)=>(
						<ProductCard 
							key={product.id} 
							id={product.id} 
							name={product.name} 
							imageUrl={product.imageUrl} 
							price={product.items[0].price} 
							ingredients={product.ingredients}
						/>
					))
				}
			</div>
		</div>
	);
}