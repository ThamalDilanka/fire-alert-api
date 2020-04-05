const SensorReading = require('../models/SensorReading');

exports.addSensorReading = async (req, res) => {
	try {
		const requestBody = await SensorReading.create(req.body);
		const newSensorReading = {
			sensor: req.params.id,
			...requestBody,
		};

		res.status(201).json({
			status: 'success',
			data: {
				sensorReading: newSensorReading,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.getSensorReadings = async (req, res) => {
	try {
		if (req.query.time === 'last') {
			const lastSensorReading = await SensorReading.find({}).sort({_id:-1}).limit(1)

			res.status(200).json({
				status: 'success',
				data: {
					lastSensorReading,
				},
			});

		} else {
			const sensorReadings = await SensorReading.find({
				sensor: req.params.id,
			});

			res.status(200).json({
				status: 'success',
				results: sensorReadings.length,
				data: {
					sensorReadings,
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
