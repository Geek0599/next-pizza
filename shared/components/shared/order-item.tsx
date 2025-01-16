'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface Props extends CartItemProps {
  className?: string;
  Skeleton?: React.ReactNode;
  loading?: boolean;
  id: number;
}

export const OrderItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
}) => {	

  return (
    <div
      className={cn(
        'md:flex gap-3 sm:items-center items-end justify-between grid grid-cols-[55%_1fr] border-t border-[#ffefdc] first:border-none',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex md:flex-row flex-col items-center sm:gap-5 gap-3  flex-[1_1_25%] row-start-1 row-end-3 sm:text-left text-center">
        <CartItemDetails.Image src={imageUrl} alt={`Піцца ${name}`} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} className='flex-1 text-center' />
		
      <div className="flex flex-row items-center gap-5 justify-evenly flex-1">
			<CartItemDetails.Quantity quantity={quantity} className='text-center' />
      </div>
    </div>
  );
};
