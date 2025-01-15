import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('md:flex lg:gap-5 gap-7 items-center justify-between grid grid-cols-[55%_1fr] py-4', className)}>
      <div className="flex md:flex-row flex-col items-center gap-4 flex-[1_1_25%] row-start-1 row-end-3">
        <div className="shrink-0 basis-[60px] w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse" />
        <h2 className="w-full h-11 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="lg:h-5 h-8 lg:w-10 w-14 bg-gray-200 rounded animate-pulse flex-1 text-center mx-auto md:self-auto self-end" />
      <div className="lg:h-9 h-11 bg-gray-200 rounded animate-pulse flex-1 md:self-auto self-end" />
    </div>
  );
};
