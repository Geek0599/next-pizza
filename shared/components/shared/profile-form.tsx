'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TypeFormRegister } from './modals/auth-modal/form/schemas';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/api/actions';
import { log } from 'node:console';
import { WhiteBlock } from './white-block';
import { Api } from '@/shared/services/api-client';

interface Props {
	user: User;
}

export const ProfileForm: React.FC<Props> = ({ user }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: user.fullName,
			email: user.email,
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = async (data: TypeFormRegister) => {
		try{
			const res = await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			})			

			toast.success('Дані успішно оновлені', {
				icon: '✅'
			})
		} catch (error) {
			console.log('Error при оновленні даних');
			return toast.error('Помилка при оновленні даних', {
				icon: '❌'
			})
		}
	}

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/'
		})
	}


	return (
		<div className="mx-auto max-w-96 w-full">
			<WhiteBlock>
				<Title text="Особисті дані" size="md" className='font-bold'/>


				<FormProvider {...form}>
					<form className="flex flex-col gap-6 w-full mt-10" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-5">
							<FormInput name="email" label="E-Mail" required />
							<FormInput name="fullName" label="Полное имя" required />

							<FormInput isPassword name="password" label="Новый пароль" required />
							<FormInput isPassword name="confirmPassword" label="Повторите пароль" required />
						</div>

						<div className="grid gap-3">
							<Button disabled={form.formState.isSubmitting} className="text-base" type="submit">
								Зберегти
							</Button>

							<Button
								onClick={onClickSignOut}
								variant="secondary"
								disabled={form.formState.isSubmitting}
								className="text-base hover:bg-[#e8e5e1]"
								type="button">
								Вийти
							</Button>

						</div>

				</form>
				</FormProvider>
			</WhiteBlock>

		</div>
	);
}