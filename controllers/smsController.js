const messagebird = require('messagebird')(
	`${process.env.MESSAGEBIRD_ACCESSKEY}`
);
const Sensor = require('../models/Sensor');
const Moment = require('moment');

exports.smsHandler = async (req, res) => {
	try {
		// Extracting the values from the request body
		const { to, sensor, reading } = req.body;

		// Check whether the request body has valid sending token
		if (
			!to ||
			!sensor ||
			req.headers.authorization !== process.env.EMAIL_SENDING_ACCESS_TOKEN
		) {
			throw {
				name: 'InvalidRequestBodyError',
				message: 'Bad request! Check the body object and the password',
			};
		}

		// Find the sensor object from the data base and assign it to a variable
		const sensorObject = await Sensor.findById(sensor);

		// SMS Text
		const message = `Fire Alert! A Harmful air condition has been detected in ${sensorObject.floor} floor, room ${sensorObject.room}. There may be a fire emergency inside.`;

		// Build the SMS Object
		let params = {
			originator: 'Fire Alert',
			recipients: [`${to}`],
			body: message,
		};

		// Sending the SMS
		messagebird.messages.create(params, function (err, response) {
			if (err) {
				// Sending the error message if sms sending failed
				res.status(400).json({
					status: 'failed',
					message: err,
				});
				return;
			}
			// Sending success message
			res.status(201).json({
				status: 'success',
				data: response,
			});
		});
	} catch (err) {
		// Sending error message when error occurs
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
