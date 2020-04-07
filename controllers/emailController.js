const Email = require('../utils/email');
const Sensor = require('../models/Sensor');
const pug = require('pug');

exports.emailHandler = async (req, res) => {
	try {
		const { to, sensor, reading } = req.body;

		if (
			!to ||
			!sensor ||
			!reading ||
			!req.headers.authorization ||
			req.headers.authorization !== process.env.EMAIL_SENDING_ACCESS_TOKEN
		) {
			throw {
				name: 'InvalidRequestBodyError',
				message: 'Bad request! Check the body object and the password',
			};
		}

		const sensorObject = await Sensor.findById(sensor);
		const subject = `Warning! A Harmful air condition detected in ${sensorObject.floor} floor, room ${sensorObject.room}`;
		const html = pug.renderFile(`${__dirname}/../views/emails/alert.pug`, {
			floor: sensorObject.floor,
			room: sensorObject.room,
			smokeLevel: reading.smokeLevel,
			co2Level: reading.co2Level,
			url: 'https://www.google.com',
		});

		await Email.sendEmail(to, subject, html);

		res.status(201).json({
			status: 'success',
			data: {
				subject,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
