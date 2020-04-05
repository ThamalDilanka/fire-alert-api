const express = require('express');
const adminController = require('./../controllers/adminController');

const router = express.Router();

router
	.route('/:id')
	.post(adminController.getCredentials)
	.patch(adminController.updateAdmin);

module.exports = router;
