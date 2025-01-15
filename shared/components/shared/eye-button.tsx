import { cn } from '@/shared/lib/utils';
import { Eye, EyeOff, X } from 'lucide-react';
import React from 'react';

interface Props {
	className?: string;
	onClick?: VoidFunction;
	isVisible: boolean
}

export const EyeButton: React.FC<Props> = ({ onClick, isVisible, className}) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={cn('absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer', className)}
		>
			{isVisible ? <Eye />: <EyeOff />}
		</button>
	);
}