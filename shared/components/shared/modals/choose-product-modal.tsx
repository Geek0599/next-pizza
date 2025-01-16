'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={()=>router.back()}>
			<DialogContent className={cn('sm:p-3 p-2 py-3 w-full max-w-[1060px] min-h-[500px] border-transparent shadow-none', className)}>
				<DialogTitle className='hidden'></DialogTitle>
				<DialogDescription className='hidden'></DialogDescription>
				<ProductForm product={product} onSubmit={()=> router.back()}/> 
			</DialogContent>
		</Dialog>
	);
}