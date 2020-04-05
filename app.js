const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');

// Importing routes from the routes folder
const sensorRoutes = require('./routes/sensorRoutes');

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

module.exports = app;
