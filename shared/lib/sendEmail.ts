import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, Template: React.ReactNode) => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const { data, error } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: 'yuriidmitrik@gmail.com',
		subject: subject,
		react: Template,
	});

	if (error) {
		throw new Error('Email wosn`t sended')
	}

	return data
}