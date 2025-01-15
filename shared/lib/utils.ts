import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
	return (instance: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(instance);
			} else if (ref && typeof ref === "object" && "current" in ref) {
				(ref as React.MutableRefObject<T | null>).current = instance;
			}
		});
	};
}
export function generateOrderIdForLiqPay(): string {
	const timestamp = Date.now().toString();
	const randomPart = Math.floor(Math.random() * 1000000).toString();
	return (timestamp + randomPart).slice(-10);
}

export function widthScroll() {
	var div = document.createElement('div');
	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';
	div.style.visibility = 'hidden';
	document.body.appendChild(div);
	var scrollWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollWidth;
}

export const formatDate = (isoString: Date): string => {
	const date = new Date(isoString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};



