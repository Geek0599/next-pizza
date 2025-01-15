import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea, FormInputAutocomplete } from '../form';

interface Props {
	className?: string;
}

export const CheckoutAddressFrom: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="3. Адреса доставки" className={className}>
			<div className="flex flex-col gap-5">
				<FormInputAutocomplete name="address" className="text-base" placeholder="Адреса доставки" />
				<FormTextarea
					name="comment"
					className="text-base"
					placeholder="Коментарій до замовлення"
					rows={5}
				/>
			</div>
		</WhiteBlock>
	);
}