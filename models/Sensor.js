const mongoose = require('mongoose');

// Build the sensor schema
const sensorSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	floor: {
		type: Number,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
	activated: {
		type: Boolean,
		default: true,
	},
	lastReading: {
		smokeLevel: {
			type: Number,
			default: 0,
		},
		co2Level: {
			type: Number,
			default: 0,
		},
		time: {
			type: String,
			default: Date.now,
		},
	},
});

// Create and export the sensor schema
const Sensor = mongoose.model('sensors', sensorSchema);
module.exports = Sensor;
