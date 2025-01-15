'use client';
import React, { useState } from 'react';
import { useIMask } from 'react-imask';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '../../ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const MaskedFormInput:React.FC<Props> = ({ name, label, required, className, mask, ...props }) =>{
	const [ opts ] = useState({ mask: mask });
	  const {
		setValue: setValueForm,
		formState: { errors },
	} = useFormContext();
	const errorText = errors[name]?.message as string;
	const {
		ref,
		value,
		setValue,
	} = useIMask(opts, {
		onAccept : (value: string, mask: string | object) => {
			const cleanedValue = value.replace(/\s/g, '');
			setValueForm(name, cleanedValue, { shouldValidate: true });
		}
	});

	  const onClickClear = ()=>{
			setValueForm(name, '', {shouldValidate: true})
			setValue('')
  	  }
  
  return (
	<div className={className}>
		{label && (
			<p className='font-medium mb-2'>
				{label} {required && <RequiredSymbol/>}
			</p>
		)}
		<div className='relative'>
			<Input ref={ref as React.RefObject<HTMLInputElement>} className="h-12 text-md" {...props} />
			{value && <ClearButton onClick={onClickClear}/>}
		</div>

		{errorText && <ErrorText text={errorText} className='mt-2'/>}
	</div>
  );
}
