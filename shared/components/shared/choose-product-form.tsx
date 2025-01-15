import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { Title } from '@/shared/components/shared';
import { Button } from '../ui';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	price: number;
	loading?: boolean;
	onSubmit?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	price,
	loading,
	onSubmit,
 }) => {
	return (
		<div className={cn('flex lg:flex-row flex-col flex-1 h-full', className)}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<img 
					src={imageUrl} 
					alt={name}
					loading="lazy" 
					decoding="async"
					className="relative left-2 top-2 transition-all z-10 duration-300 w-full max-w-[350px] max-h-[350px]"
				/>
			</div>

			<div className="lg:w-[490px] bg-[#faf8f8] p-7 rounded-md flex flex-col">
				<Title text={name} size='md' className='font-extrabold mb-1 flex-1'/>

				<Button
					loading={loading}
					onClick={()=>onSubmit?.()} 
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
					Додати в корзину за {price} грн.
				</Button>
			</div>
		</div>
	);
}