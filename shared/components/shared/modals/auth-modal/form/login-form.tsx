import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TypeFormLogin } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, Title } from '@/shared/components';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
	onClose?: VoidFunction
}

export const LoginForm: React.FC<Props> = ({ className, onClose}) => {
	const form = useForm<TypeFormLogin>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: TypeFormLogin) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false
			})

			if(resp && !resp.ok){
				throw Error()
			}

			toast.success('Ви успішно увійшли авторизувались', {
				icon: '✅'
			})

			onClose?.()
			
		} catch (error) {
			console.error('Error [Login]', error)
			toast.error('Не вдалося увійти в свій профіль', {
				icon: '❌'
			})
		}
	}
	return (
		<FormProvider {...form}>
			<form className={cn('flex flex-col gap-5', className)} onSubmit={form.handleSubmit(onSubmit)}>

				<div className="flex justify-between items-start gap-5">
					<div className="mr-2">
						<Title text='Вхід в аккаунт' size={'md'} className='font-bold'/>
						<p className='text-gray-400'>Введіть свою пошту та пароль, щою увійти в свій аккаунт</p>
					</div>
					<img width={60} height={60} src="/assets/images/phone-icon.png" alt="Phone icon" />
				</div>

				<FormInput name='email' label='E-Mail' required/>
				<FormInput isPassword name='password' label='Пароль' required/>

				<Button loading={form.formState.isSubmitting} className='h-12 text-base' type="submit">
					Увійти
				</Button>

			</form>
		</FormProvider>
	);
}