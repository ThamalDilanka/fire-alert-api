const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');

// Importing routes from the routes folder
const sensorRoutes = require('./routes/sensorRoutes');
const sensorReadingRoutes = require('./routes/sensorReadingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const emailRoutes = require('./routes/emailRoutes');

// Creating a Express application
const app = express();

// Setting body parser to get access of request.body
app.use(bodyParser.json());

// Logging all the requests to the console in development environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Setting the routes to the app as middlewares
app.use('/api/v1/sensors', sensorRoutes);
app.use('/api/v1/sensorReadings', sensorReadingRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/email', emailRoutes);

module.exports = app;
