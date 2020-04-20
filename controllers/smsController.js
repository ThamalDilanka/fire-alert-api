exports.smsHandler = async (req, res) => {
	try {
		if (
			req.headers.authorization !== process.env.EMAIL_SENDING_ACCESS_TOKEN
		) {
			throw {
				name: 'InvalidRequestBodyError',
				message: 'Bad request! Check the body object and the password',
			};
		}

		res.status(201).json({
			status: 'success',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
