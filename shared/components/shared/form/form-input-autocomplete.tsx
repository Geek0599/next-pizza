'use client';

import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "../../ui";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { useFormContext } from "react-hook-form";
import { mergeRefs } from "@/shared/lib/utils";
import '@/public/assets/css/autocomplete-fix.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInputAutocomplete: React.FC<Props> = ({ name, label, required, className, ...props }) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue
	} = useFormContext();
	const { onChange, onBlur, name: nameInput, ref: refInput } = register(name);
	

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	
	const { ref } : { ref: React.RefObject<HTMLInputElement>} = usePlacesWidget({
		apiKey,
		onPlaceSelected: (place) => {
			setValue(name, place.formatted_address, { shouldValidate: true })
		},
		options: {
			types: ["address"],
			componentRestrictions: { country: "ua" },
			strictBounds: true,
		 },
	});

	const value = watch(name);
	const errorText = errors[name]?.message as string;

	const onClickClear = () => {
		setValue(name, '', { shouldValidate: true });
		if(ref.current){
			ref.current.value = ''		
		}
	};

	return (
		<div className={className}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}
			<div className='relative'>
				<Input  
					onChange={onChange} // assign onChange event 
					onBlur={onBlur} // assign onBlur event
					name={name} // assign name prop
					ref={mergeRefs(ref, refInput)}  
					className="h-12 text-md pr-[40px] text-ellipsis whitespace-nowrap" 
					{...props} 
				/>
				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	);
};
