const mongoose = require('mongoose');

// Build sensors reading schema
const sensorReadingSchema = new mongoose.Schema({
	sensor: {
		type: String,
		ref: 'Sensor',
	},
	reading: {
		smokeLevel: {
			type: Number,
			required: true,
		},
		co2Level: {
			type: Number,
			required: true,
		},
		time: {
			type: Date,
			default: Date.now,
		},
	},
});

// Create and export sensor readings schema
const SensorReading = mongoose.model('sensorReadings', sensorReadingSchema);
module.exports = SensorReading;
