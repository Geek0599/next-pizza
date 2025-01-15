'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/shared/components/ui';
import { ClearButton, ErrorText } from '@/shared/components';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', {shouldValidate: true});
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton className='top-5 right-2' onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className='mt-2'/>}
    </div>
  );
};