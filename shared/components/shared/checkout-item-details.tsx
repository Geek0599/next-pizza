import React from 'react';
import { cn } from '@/shared/lib/utils';
import { LucideProps } from 'lucide-react';
import { number } from 'zod';

interface Props {
	title?: string;
	value?: React.ReactNode;
	Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
	iconSize?: number;
	iconClassName?: string;
	className?: string;
	classNameValue?: string
}

export const CheckoutItemDetails: React.FC<Props> = ({ title, value, Icon, iconSize = 18, iconClassName = 'text-gray-400', className, classNameValue }) => {
	return (
		<div className={cn('flex sm:items-stretch items-end my-4', className)}>
			<div className="flex items-end flex-1 text-lg text-neutral-500">
				{!Icon ? title : (
					<div className='flex gap-y-1 gap-x-2 flex-wrap items-center sm:max-w-none max-w-[55%]'>
						<Icon size={iconSize} className={iconClassName} />
						{title}
					</div>
				)}
				:
				<span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
			</div>

			<span className={cn("flex items-center gap-2 font-bold text-lg", classNameValue)}>{value} {(typeof value === "number") ? "грн." : ""}</span>
		</div>
	);
}