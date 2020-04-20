const express = require('express');
const adminController = require('./../controllers/adminController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup); // Signup route
router.post('/login', authController.login); // Login route

router.route('/').get(adminController.getAdmin); // admin root route
router.route('/:id').patch(authController.protect, adminController.updateAdmin); // admin root route with query parameter

module.exports = router;
