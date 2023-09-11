const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cars = require('../db/main');
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/api/cars', (req, res) => res.send(cars));

/*

	Posting requires http client posting service (e.g. postman, thunder client)
	which allows the request object to send data via property named body. The data
	in body can be posted in various formats -> JSON, urlencoded, form etc. This
	data needs to be parsed into a language that JS can understand.

*/

// Using middleware functions to parse request body objects
app.use(express.json()); //. parsing JSON data
app.use(express.urlencoded()); //. parsing urlencoded data

/*
	* Try Posting and then getting

	POST http://localhost:3000/api/cars
	content-type: application/json

	{
		"name" : "verna"
	}

	http://localhost:3000/api/cars

*/

app.post('/api/cars', (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).send('Name is required');

  if (name.length < 3)
    return res.status(400).send('Name must be at least 3 letters long');

  if (cars.hasOwnProperty(name))
    return res.status(400).send('Car with same name already present.');

  cars[name] = {};

  res.sendStatus(201); //. Equivalent to -> res.send(Created).status(201)
});
