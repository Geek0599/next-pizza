import React, { Suspense } from 'react';
import { cn } from '@/shared/lib/utils';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { Container } from './container';
import { Category } from '@prisma/client';

interface Props {
	categories: Category[]
	className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	return (
		<div className={cn('sm:sticky top-0 bg-white sm:py-4 py-2 pb-4 shadow-lg shadow-black/5 z-10', className)}>
			<Container className='flex flex-wrap min-[800px]:items-center items-start justify-between gap-x-3 sm:gap-y-4 gap-y-3 min-[800px]:flex-row flex-col'>
				<Categories items={categories}/>
				<Suspense>
					<SortPopup/>
				</Suspense>
			</Container>
		</div>
	);
}