const express = require('express');
const sensorController = require('./../controllers/sensorController');

const router = express.Router();

router
	.route('/')
	.post(sensorController.createSensor)
	.get(sensorController.getAllSensors);

router
	.route('/:id')
	.get(sensorController.getSensor)
	.patch(sensorController.updateSensor)
	.delete(sensorController.deleteSensor);

module.exports = router;
