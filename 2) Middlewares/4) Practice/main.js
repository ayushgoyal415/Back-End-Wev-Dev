const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening on port 3000...'));

const cars = [
	{
		name: 'zen',
		speed: 80,
		price: 100000,
		// last_updated: 'Jan-1-2022 at 9 hours 4 minutes 30 seconds',
	},
	{
		name: 'santro',
		speed: 100,
		price: 200000,
		// last_updated: 'Jan-1-2022 at 9 hours 4 minutes 30 seconds',
	},
];

// Constructing a middleware that parse the JSON string to object and attach last update time.
app.use(express.json(), (req, res, next) => {
	req.body.last_updated = new Date().toLocaleTimeString();
	next();
});

//* http://localhost:3000/cars
app.get('/cars', (req, res) => res.send(cars));

/*

	POST http://localhost:3000/cars
	content-type: application/json

	{
		"name": "verna",
		"speed": "120",
		"price": "400000"
	}

*/
app.post('/cars', (req, res) => {
	cars.push(req.body);
	res.sendStatus(201);
});

/*

	PUT http://localhost:3000/cars/zen
	content-type: application/json

	{
		"price": "20"
	}

*/
app.put('/cars/:name', (req, res) => {
	const car = cars.find(c => c.name == req.params.name);
	Object.assign(car, req.body); // Copying entire request body into the object
	res.sendStatus(200);
});
