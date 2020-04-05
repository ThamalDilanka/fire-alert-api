const Sensor = require('../models/Sensor');

exports.createSensor = async (req, res) => {
	console.log(req.body);
	try {
		const newSensor = await Sensor.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				sensor: newSensor,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.getAllSensors = async (req, res) => {
	try {
		const sensors = await Sensor.find(req.query);

		res.status(200).json({
			status: 'success',
			results: sensors.length,
			data: {
				sensors,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.getSensor = async (req, res) => {
	try {
		const sensor = await Sensor.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				sensor,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.updateSensor = async (req, res) => {
	try {
		const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				sensor,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.deleteSensor = async (req, res) => {
	try {
		await Sensor.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
