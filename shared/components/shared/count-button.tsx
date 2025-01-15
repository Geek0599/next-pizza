import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CountIconButton } from './count-icon-button';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClickCountButton,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between sm:gap-3 gap-2', className)}>
      <CountIconButton
        onClick={() => onClickCountButton?.('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={cn("w-5 inline-block text-center", size === 'sm' ? 'text-sm' : 'text-md')}>{value}</b>

      <CountIconButton onClick={() => onClickCountButton?.('plus')} size={size} type="plus" />
    </div>
  );
};
