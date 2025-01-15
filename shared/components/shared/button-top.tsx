'use client';
import { cn } from '@/shared/lib/utils';
import { ChevronsUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
	className?: string;
}
const scrollFrom = 400;

export const ButtonTop: React.FC<Props> = ({ className }) => {
	const [visible, setIsVisible] = useState(false)

	const handlerClick = () =>{
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	useEffect(()=>{
		const handleScroll = () => {			
			if (window.scrollY > scrollFrom) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		handleScroll()

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	},[])


	return (
		<button onClick={handlerClick} type='button' className={cn('fixed bottom-3 right-3 sm:py-4 py-3 sm:px-3 px-2 rounded-[8px] bg-[#faf0e3] transition-all hover:bg-[#fbe9d3]', className, {
			'opacity-100': visible,
			'-translate-y-0': visible,
			'scale-100': visible,
			'scale-110': !visible,
			'-translate-y-2': !visible,
			'opacity-0': !visible
		})}>
			<ChevronsUp size={25} className='text-primary'/>
		</button>
	);
}