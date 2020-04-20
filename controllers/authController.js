const { promisify } = require('util');
const Admin = require('./../models/Admin');
const jwt = require('jsonwebtoken');

// Build a JWT
const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// signup endpoint handler
exports.signup = async (req, res, next) => {
	try {
		let newAdmin = await Admin.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		// Get the sign token
		const token = signToken(newAdmin._id);

		// Remove password from admin
		newAdmin.password = undefined;

		// Send back the response
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

// login endpoint handler
exports.login = async (req, res, next) => {
	try {
		// getting email and password from the request body
		const { email, password } = req.body;

		// Check email is exists in request
		if (!email || !password) {
			res.status(400).json({
				status: 'failed',
				message: 'Please enter email and password',
			});

			// Call the next middleware and terminate the function
			return next();
		}

		// Find the admin from the database with given email
		const admin = await Admin.findOne({ email }).select('+password');

		// Check the hashed password with given password and assign the result to correct variable
		const correct = await admin.checkPassword(password, admin.password);

		// Check whether the existence of admin or correct values
		if (!admin || !correct) {
			// Sending response to the user if given credentials are invalid
			res.status(400).json({
				status: 'failed',
				message: 'Invalid Credentials',
			});

			// Call the next middleware and terminate the function
			return next();
		}

		// Send token to user
		const token = signToken(admin._id);

		// Sending response with Json Web Token to the user
		res.status(200).json({
			status: 'success',
			token,
		});
	} catch (err) {
		// Send error message if error occurs
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// The protect middle ware that assignable for any route
exports.protect = async (req, res, next) => {
	try {
		// Get the token from request header
		let token = getTokenFromRequest(req);

		// Check whether is in correct format
		if (!token) {
			// Sending response if token is not valid
			res.status(401).json({
				status: 'failed',
				message: 'You are not logged in',
			});

			// terminate the function
			return;
		}

		// Verify token
		try {
			// Decode the token
			const decoded = await promisify(jwt.verify)(
				token,
				process.env.JWT_SECRET
			);
		} catch (err) {
			// Handle the custom exceptions
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

			// terminate the function
			return;
		}

		// Call the next middleware if authentication succeeded
		next();
	} catch (err) {
		// Sending error message if error occurs
		res.status(401).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Extract the token from the request
const getTokenFromRequest = (req) => {
	// Separate the JWT from the header
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	return token;
};
