const Admin = require('../models/Admin');

exports.getCredentials = async (req, res) => {
	console.log(req.body);
	try {
		const admin = await Admin.findById('5e8a29d640a25c36d44e292c');

		if (
			admin.userName === req.body.userName &&
			admin.password === req.body.password &&
			req.params.id === process.env.AUTH_REQUEST_PASSWORD
		) {
            res.status(200).json({
                status: 'Access Granted',
                data: {
                    authorized: true
                },
            });
		} else {
            res.status(400).json({
                status: 'Access Denied',
                data: {
                    authorized: false
                },
            });
        }



	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.updateAdmin = async (req, res) => {
	try {
		const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
