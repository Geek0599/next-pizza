import { z } from 'zod'

export const passwordSchema = z.string().min(6, { message: 'Пароль має складатися щонайменше з 6 символів' });

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Введіть правильно пошту' }),
	password: passwordSchema
})

export const formRegisterSchema = formLoginSchema.merge(
	z.object({
		fullName: z.string().min(2, { message: 'Введіть своє імʼя та прізвище' }),
		confirmPassword: passwordSchema
	})
).refine(data => data.password === data.confirmPassword, {
	message: 'Пароль не співпадає',
	path: ['confirmPassword']
})

export type TypeFormLogin = z.infer<typeof formLoginSchema>
export type TypeFormRegister = z.infer<typeof formRegisterSchema>