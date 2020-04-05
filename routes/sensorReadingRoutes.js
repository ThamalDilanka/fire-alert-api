const express = require('express');
const sensorReadingController = require('./../controllers/sensorReadingController');

const router = express.Router();

router
	.route('/:id')
	.get(sensorReadingController.getSensorReadings)
	.post(sensorReadingController.addSensorReading);

module.exports = router;
