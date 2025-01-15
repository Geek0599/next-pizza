'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../../ui';
import { RequiredSymbol } from '../required-symbol';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';
import { useFormContext } from 'react-hook-form';
import { EyeButton } from '../eye-button';
import { cn } from '@/shared/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
	isPassword?: boolean
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, isPassword, ...props}) => {
	const [isVisible, setIsVisible] = useState(false)
	
	const {
		register,
		formState: { errors },
		watch,
		setValue
	} = useFormContext()

	const value = watch(name);
	const errorText = errors[name]?.message as string;

	const onClickClear = ()=>{
		setValue(name, '', {shouldValidate: true})
	}
	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol/>}
				</p>
			)}
			<div className='relative'>
				<Input type={isPassword ? (isVisible ? 'text' : 'password') : undefined} className="h-12 text-md pr-[40px] text-ellipsis whitespace-nowrap" {...register(name)} {...props} />
				{value && <ClearButton onClick={onClickClear} className={cn({'right-12': isPassword})}/>}
				{isPassword && <EyeButton isVisible={isVisible} onClick={()=> setIsVisible(!isVisible)}/>}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2'/>}
		</div>
	);
}