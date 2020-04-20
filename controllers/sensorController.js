const Sensor = require('../models/Sensor');

// Add new sensor
exports.createSensor = async (req, res) => {
	try {
		// Create a new sensor in the data base and get it to a variable
		const newSensor = await Sensor.create(req.body);

		// Sending back the response with added sensor object
		res.status(201).json({
			status: 'success',
			data: {
				sensor: newSensor,
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

// Returns all the sensors
exports.getAllSensors = async (req, res) => {
	try {
		// Getting the all sensor objects from the database
		const sensors = await Sensor.find(req.query);

		// Sending back the response with all the sensor objects
		res.status(200).json({
			status: 'success',
			results: sensors.length,
			data: {
				sensors,
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

// Returns a sensor object matches with the given id
exports.getSensor = async (req, res) => {
	try {
		// Find the sensor from database and assign it to a variable
		const sensor = await Sensor.findById(req.params.id);

		// Sending back the response with the sensor object
		res.status(200).json({
			status: 'success',
			data: {
				sensor,
			},
		});
	} catch (err) {
		// Sending the error message when error occurs
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Updating the sensor details
exports.updateSensor = async (req, res) => {
	try {
		// Update the database and getting updated sensor object
		const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		// Sending response back to the user with updated sensor object
		res.status(200).json({
			status: 'success',
			data: {
				sensor,
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

// Deleting the sensor from the database
exports.deleteSensor = async (req, res) => {
	try {
		// Remove the sensor from the database
		await Sensor.findByIdAndDelete(req.params.id);

		// Sending response the success message
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		// Sending a error message when error occurs
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
