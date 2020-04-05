const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
	floor: {
		type: String,
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
});

const Sensor = mongoose.model('sensors', sensorSchema);
module.exports = Sensor;
