const express = require('express');
const sensorController = require('./../controllers/sensorController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(sensorController.getAllSensors)
	.post(authController.protect, sensorController.createSensor);

router
	.route('/:id')
	.get(sensorController.getSensor)
	.patch(sensorController.updateSensor)
	.delete(authController.protect, sensorController.deleteSensor);

module.exports = router;