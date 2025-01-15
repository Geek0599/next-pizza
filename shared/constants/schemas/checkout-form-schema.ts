import { z } from 'zod';

export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, { message: 'Імʼя має складатися щонайменше з 2 букв' }),
	lastName: z.string().min(2, { message: 'Прізвище має складатися щонайменше з 2 букв' }),
	email: z.string().email({ message: 'Введіть справжню пошту' }),
	phone: z.string().regex(/^\+380\d{9}$/, 'Введіть номер в форматі +380XXXXXXXXX'),
	address: z.string().min(5, { message: 'Введіть правильно адрессу' }),
	comment: z.string().optional(),
})

export type CheckoutFormValuesType = z.infer<typeof checkoutFormSchema>