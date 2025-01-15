import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TypeFormRegister } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/shared/lib/utils';
import { Button, FormInput, Title } from '@/shared/components';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/api/actions';


interface Props {
	className?: string;
	setType: VoidFunction
}

export const RegisterForm: React.FC<Props> = ({ className, setType }) => {
	const form = useForm<TypeFormRegister>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = async (data: TypeFormRegister) => {
		try {
			await registerUser({
				fullName: data.fullName,
				email: data.email,
				password: data.password
			})

			toast.loading(
				(t) => (
				  <p className='flex flex-col'>
					<h2 className='mb-1'>Ви успішно створили новий профіль!</h2>
					<h3>Вам надійшло повідомлення на пошту, для того щоб підтвердити ваш аккаунт.</h3>
					<button className='mt-2 font-bold self-end' onClick={() => toast.dismiss(t.id)}>Закрити</button>
				  </p>
				),
				{
				  icon: '✅',
				}
			);
			
			setType()
		} catch (error) {
			console.error('Error [Regist]', error)
			toast.error('Не вдалося створити новий профіль, спробуйти пізніше', {
				icon: '❌'
			})
		}
	}


	return (
		<FormProvider {...form}>
			<form className={cn('flex flex-col gap-5', className)} onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-start gap-5">
					<div className="mr-2">
						<Title text='Реєстрація нового аккаунту' size={'md'} className='font-bold leading-7 mb-2'/>
						<p className='text-gray-400'>Введіть свої дані, для того, щоб створити свій аккаунт</p>
					</div>
					<img width={60} height={60} src="/assets/images/phone-icon.png" alt="Phone icon" />
				</div>

				<FormInput name='email' label='E-Mail' required/>
				<FormInput name='fullName' label='Своє імʼя та прізвище' required/>
				<FormInput isPassword name='password' label='Пароль' required/>
				<FormInput isPassword name='confirmPassword' label='Повторіть свій пароль' required/>

				<Button loading={form.formState.isSubmitting} className='h-12 text-base' type="submit">
					Зареєструватися
				</Button>
			</form>
		</FormProvider>
	);
}