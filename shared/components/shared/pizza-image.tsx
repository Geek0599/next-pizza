import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
	className?: string;
	imageUrl: string;
	size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ className, imageUrl, size }) => {
	return (
		<div className={cn('flex items-center gap-4 justify-center flex-1 relative w-full sm:min-h-[500px] min-h-[400px]', className)}>
			<img 
				src={imageUrl} 
				alt="Product" 
				className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
					'sm:w-[300px] w-[200px] sm:h-[300px] h-[200px]': size === 20,
					'sm:w-[400px] w-[300px] sm:h-[400px] h-[300px]': size === 30,
					'sm:w-[500px] w-[350px] sm:h-[500px] h-[350px]': size === 40,
				})}
				loading="lazy" 
				decoding="async" 
			/>
			 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 sm:w-[450px] sm:h-[450px] w-[320px] h-[320px]" />
			 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 sm:w-[370px] sm:h-[370px] w-[270px] h-[270px]" />
		</div>
	);
}