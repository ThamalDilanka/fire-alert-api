const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Importing routes from the routes folder
const sensorRoutes = require('./routes/sensorRoutes');
const sensorReadingRoutes = require('./routes/sensorReadingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const emailRoutes = require('./routes/emailRoutes');
const smsRoutes = require('./routes/smsRoutes');

// Creating a Express application
const app = express();

// CORS support
app.use(cors());

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
app.use('/api/v1/sms', smsRoutes);

// Setting static webpage
app.use(express.static('./client'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

module.exports = app;
