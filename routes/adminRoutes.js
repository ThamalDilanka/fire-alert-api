const express = require('express');
const adminController = require('./../controllers/adminController');
const authController = require('./../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(adminController.getAdmin);
router.route('/:id').patch(authController.protect, adminController.updateAdmin);

module.exports = router;
