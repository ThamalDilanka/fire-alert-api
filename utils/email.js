const sgMail = require('@sendgrid/mail');
const htmlToText = require('html-to-text');

exports.sendEmail = async (to, subject, html) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const email = {
		to,
		from: process.env.EMAIL_FROM,
		subject,
		text: htmlToText.fromString(html),
		html,
	};

	await sgMail.send(email);
};
