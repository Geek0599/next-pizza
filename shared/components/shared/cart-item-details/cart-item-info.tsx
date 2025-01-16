import { cn } from "@/shared/lib/utils";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className}) => {
	
  return (
    <div className="sm:text-left text-center sm:row-auto sm:col-span-2 self-center row-start-1 row-end-2 col-start-2 col-end-3">
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 sm:w-[90%] sm:mt-0 mt-2">{details}</p>}
    </div>
  );
};
