'use client';
import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useClickAway } from 'react-use';
import { sort } from '@/shared/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
	className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const sortItem = searchParams.get('sort') ? sort.find(item=> item.value === searchParams.get('sort'))?.name : sort[0].name
	const [selectedSort, setSelectedSort] = useState(sortItem)
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef(null)

	useClickAway(ref, () => {
		if(isOpen){
			setIsOpen(false)
		}
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
		  const params = new URLSearchParams(searchParams.toString())
		  params.set(name, value)
	
		  return params.toString()
		},
		[searchParams]
	 )

	const handlerClick = (item: {name: string, value: string}) => {
		setSelectedSort(item.name)
		router.push(pathname + '?' + createQueryString('sort', item.value), {
			scroll: false
		})
	}


	return (
		<div ref={ref} className={cn('relative', className)}>
			<div className='bg-gray-50 px-5 py-3 min-h-[52px] rounded-2xl cursor-pointer inline-flex items-center gap-1' onClick={()=>setIsOpen(prev=>!prev)}>
				<ArrowUpDown size={16}/>
				<div className="inline-flex flex-wrap items-center gap-1">
					<b>Cортування:</b>
					<b className='text-primary'>{selectedSort}</b>
				</div>
			</div>
			<div className={cn("absolute top-[110%] right-0 w-64 bg-gray-50 rounded-md shadow-md p-4 px-3 transition-all invisible opacity-0", {'visible opacity-100': isOpen})}>
				<ul className='grid gap-3'>
					{
						sort.map((item, index)=> (
							<li key={index} onClick={()=>handlerClick(item)} className={cn('hover:text-primary transition-colors cursor-pointer', {'text-primary': selectedSort === item.name})}><b>{item.name}</b></li>
						))
					}
				</ul>
			</div>
		</div>
	);
}