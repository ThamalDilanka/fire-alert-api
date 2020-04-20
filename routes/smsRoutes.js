const express = require('express');
const smsController = require('./../controllers/smsController');

const router = express.Router();

router.route('/').post(smsController.smsHandler); // sms root route

module.exports = router;
