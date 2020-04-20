const Email = require('../utils/email');
const Sensor = require('../models/Sensor');
const pug = require('pug');
const Moment = require('moment');

exports.emailHandler = async (req, res) => {
	try {
		// Extracting the values from the request body
		const { to, sensor, reading } = req.body;

		// Check whether all the variable has passed
		if (
			!to ||
			!sensor ||
			!reading ||
			!req.headers.authorization ||
			req.headers.authorization !== process.env.EMAIL_SENDING_ACCESS_TOKEN
		) {
			// Throw an error if any condition unsatisfied
			throw {
				name: 'InvalidRequestBodyError',
				message: 'Bad request! Check the body object and the password',
			};
		}

		// Find the sensor object from the data base and assign it to a variable
		const sensorObject = await Sensor.findById(sensor);

		// Create a local time object with momentJS
		const time = Moment(sensorObject.time);

		// Email Subject
		const subject = `Fire Alert! A Harmful air condition detected in ${sensorObject.floor} floor, room ${sensorObject.room}`;

		// Render the email template
		const html = pug.renderFile(`${__dirname}/../Views/emails/alert.pug`, {
			floor: sensorObject.floor,
			room: sensorObject.room,
			smokeLevel: reading.smokeLevel,
			co2Level: reading.co2Level,
			date: time.format('MMM Do YYYY'),
			time: time.format('LT'),
			url: 'https://www.google.com',
		});

		// Sending the email
		await Email.sendEmail(to, subject, html);

		// Sending the response when email sending succeed
		res.status(201).json({
			status: 'success',
			data: {
				subject,
			},
		});
	} catch (err) {
		// Sending error message when error occurs
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
