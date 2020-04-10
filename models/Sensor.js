const mongoose = require('mongoose');

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
		},
		co2Level: {
			type: Number,
		},
		time: {
			type: String,
		},
	},
});

const Sensor = mongoose.model('sensors', sensorSchema);
module.exports = Sensor;
