const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const Golfcourse = require('./models/golfcourses');

mongoose
	.connect('mongodb://localhost:27017/golf', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return Server.start();
	})
	.catch((err) => {
		console.log('Error starting');
		process.exit(1);
	});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('home');
});
app.get('/golfcourse', async (req, res) => {
	const course = new Golfcourse({
		title: 'Soldiers',
		price: '$30',
		description: 'Flat course',
		location: 'Downtown Rochester',
	});
	await course.save();
	res.send(course);
});

app.listen(3000, () => {
	console.log('Server up on Port 3000');
});
