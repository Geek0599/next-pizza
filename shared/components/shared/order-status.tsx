import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Skeleton } from '../ui';

interface Props {
  value: string;
  loading?: boolean;
  className?: string;
}

export const OrderStatus: React.FC<Props> = ({ value, loading, className }) => {
	let status = ''
	switch (value) {
		case 'PENDING':
			status = 'очікує оплату'
			break;
		case 'SUCCEEDED':
			status = 'успішно сплачено'
			break;
		case 'CANSELLED':
			status = 'відмінений'
			break;
		default:
			status = 'дані відсутні'
			break;
	}
	return (
		<h4 className='sm:text-[22px] text-[20px] font-bold flex flex-wrap gap-x-2 items-center'>Статус замовлення: { loading ? <Skeleton className='inline-block w-32 h-8 rounded-sm' /> : <span className='text-primary'>{status}</span>}</h4>
	)
	
};
