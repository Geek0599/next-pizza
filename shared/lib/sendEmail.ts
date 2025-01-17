'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const transporter = nodemailer.createTransport({
	host: SMTP_SERVER_HOST,
	port: 465,
	secure: true,
	auth: {
		user: SMTP_SERVER_USERNAME,
		pass: SMTP_SERVER_PASSWORD,
	},
});

type EmailParams = {
	sendTo: string;
	subject: string;
	text?: string;
	html?: string;
};

export const sendEmail = async ({
	sendTo,
	subject,
	text,
	html,
}: EmailParams & ({ text: string } | { html: string })) => {
	try {
		const isVerified = await transporter.verify();
	} catch (error) {
		console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
		return;
	}

	const info = await transporter.sendMail({
		from: `"Від Next Pizza UA" <next-pizza-ua@gmail.com>`,
		to: sendTo,
		subject: subject,
		text: html ? '' : text,
		html: text ? '' : html,
	});

	console.log('Message Sent', info.messageId);
	console.log('Mail sent to', sendTo);
	return info;
};


