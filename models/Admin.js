const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Build the admin schema
const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name!'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Confirmed Password doesn't matched",
		},
	},
});

// Check the password for login
adminSchema.methods.checkPassword = async function (
	candidatePassword,
	adminPassword
) {
	return await bcrypt.compare(candidatePassword, adminPassword);
};

// Password encryption
adminSchema.pre('save', async function (next) {
	// Add condition to check password change
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// Create and export admin schema
const Admin = mongoose.model('admins', adminSchema);
module.exports = Admin;
