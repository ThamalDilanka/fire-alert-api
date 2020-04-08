const express = require('express');
const sensorReadingController = require('./../controllers/sensorReadingController');

const router = express.Router();

router.route('/').get(sensorReadingController.getSensorReadings);
router.route('/:id').post(sensorReadingController.addSensorReading);

module.exports = router;
