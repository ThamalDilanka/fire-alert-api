const { promisify } = require('util');
const Admin = require('./../models/Admin');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.signup = async (req, res, next) => {
	try {
		let newAdmin = await Admin.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		const token = signToken(newAdmin._id);

		// Remove password from admin
		newAdmin.password = undefined;

		res.status(201).json({
			status: 'success',
			token,
			data: {
				admin: newAdmin,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Check email is exists in request
		if (!email || !password) {
			res.status(400).json({
				status: 'failed',
				message: 'Please enter email and password',
			});

			return next();
		}

		const admin = await Admin.findOne({ email }).select('+password');
		const correct = await admin.checkPassword(password, admin.password);

		if (!admin || !correct) {
			res.status(400).json({
				status: 'failed',
				message: 'Invalid Credentials',
			});

			return next();
		}

		// Send token to user
		const token = signToken(admin._id);

		res.status(200).json({
			status: 'success',
			token,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.protect = async (req, res, next) => {
	try {
		let token = getTokenFromRequest(req);

		// Check whether is in correct format
		if (!token) {
			res.status(401).json({
				status: 'failed',
				message: 'You are not logged in',
			});

			return;
		}

		// Verify token
		try {
			const decoded = await promisify(jwt.verify)(
				token,
				process.env.JWT_SECRET
			);
		} catch (err) {
			if (err.name === 'JsonWebTokenError') {
				res.status(401).json({
					status: 'failed',
					message: 'Invalid Token',
				});
			}

			if (err.name === 'TokenExpiredError') {
				res.status(401).json({
					status: 'failed',
					message: 'Token has expired',
				});
			}

			return;
		}
		next();
	} catch (err) {
		res.status(401).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Extract the token from the request
const getTokenFromRequest = (req) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	return token;
};
