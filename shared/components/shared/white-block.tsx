import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';

interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn('bg-white rounded-3xl sm:p-0 p-1', className)}>
      {title && (
        <div className="flex items-center gap-2 sm:p-5 p-4 sm:px-7 px-5 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn('sm:px-5 px-4 py-4 max-w-[400px]:px-3 max-w-[400px]:py-3', contentClassName)}>{children}</div>
    </div>
  );
};
