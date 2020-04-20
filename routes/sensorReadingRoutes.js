const express = require('express');
const sensorReadingController = require('./../controllers/sensorReadingController');

const router = express.Router();

router.route('/').get(sensorReadingController.getSensorReadings); // sensorReadings root route
router.route('/:id').post(sensorReadingController.addSensorReading); // sensorReadings root route with query parameter

module.exports = router;
