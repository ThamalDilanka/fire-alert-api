exports.smsHandler = async (req, res) => {
	try {
		// Check whether the request body has valid sending token
		if (
			req.headers.authorization !== process.env.EMAIL_SENDING_ACCESS_TOKEN
		) {
			throw {
				name: 'InvalidRequestBodyError',
				message: 'Bad request! Check the body object and the password',
			};
		}

		// Sending success message
		res.status(201).json({
			status: 'success',
		});
	} catch (err) {

		// Sending error message when error occurs
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
