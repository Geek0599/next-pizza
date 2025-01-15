import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';
import {MaskedFormInput} from '../form/form-mask-input';

interface Props {
	className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональні дані" className={className}>
			<div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
				<FormInput name="firstName" className="text-base" placeholder="Ім`я" />
				<FormInput name="lastName" className="text-base" placeholder="Прізвище" />
				<FormInput name="email" className="text-base" placeholder="E-Mail" />
				<MaskedFormInput name="phone" className="text-base" mask="+{38 \0}00 000 00 00" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	);
}