import { cn } from '@/shared/lib/utils';

interface Props {
  src: string;
  className?: string;
  alt?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className, alt = 'image' }) => {
  return <img width={60} height={60} loading='lazy' decoding='async' className={cn('w-[60px] h-[60px]', className)} src={src} alt={alt} />;
};
