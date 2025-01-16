import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients?: Ingredient[];
	className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
	return (
		<div className={className}>
			<Link className='flex flex-col h-full' href={`product/${id}`}>
				<div className="flex justify-center items-center p-2 bg-secondary rounded-lg h-[260px]">
					<img className='w-[215px] h-[215px] object-contain' src={imageUrl} alt={name} />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold flex-1'/>

				<p className='text-sm text-gray-400'>
					{
						ingredients?.map((ingredient)=> ingredient.name).join(', ')
					}
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						{ingredients && ingredients?.length > 0 ? 'від' : ''} <b>{price} грн.</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						Додати
					</Button>
				</div>
			</Link>
		</div>
	);
}