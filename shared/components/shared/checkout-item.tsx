'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
  id: number;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {	

  return (
    <div
      className={cn(
        'md:flex gap-3 items-center justify-between grid grid-cols-[53%_1fr]',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex md:flex-row flex-col items-center gap-5 flex-[1_1_25%] row-start-1 row-end-3">
        <CartItemDetails.Image src={imageUrl} alt={`Піцца ${name}`} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} className='flex-1 text-center' />

      <div className="flex flex-row items-center sm:gap-5 gap-3 justify-evenly">
        <CartItemDetails.CountButton onClickCountButton={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
