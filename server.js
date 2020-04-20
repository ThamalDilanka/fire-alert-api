const dotenv = require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const app = require('./app');

// Build the connection string
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

// Connecting to the database
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to the mongoDB successfully'))
	.catch((err) => {
		console.log(
			'Something went wrong. Check your connection and credentials'
		);
	});

// Starting the express server
app.listen(port, () => {
	console.log(`Server starts running on port ${port}`);
});
