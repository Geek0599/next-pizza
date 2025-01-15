import { cn } from '@/shared/lib/utils';

interface Props {
quantity: number;
  className?: string;
}

export const OrderQuantity: React.FC<Props> = ({ quantity, className }) => {
  return <h2 className={cn('font-bold text-center', className)}>Кількість: {quantity}</h2>;
};
