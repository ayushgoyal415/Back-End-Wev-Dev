const express = require('express');
const app = express();
const cars = require('../db/main');
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/api/cars', (req, res) => res.send(cars));

// Using joi for input validation (Note : it returns a class)
const Joi = require('joi');
const schema = Joi.object({ name: Joi.string().min(3).required() });

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
  // Using schema to validate req.body. Returns either error and value
  const { error, value } = schema.validate(req.body);

  // Sending simplified error message
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  if (cars.hasOwnProperty(name))
    return res.status(400).send('Car with same name already present.');

  cars[name] = {};
  res.sendStatus(201);
});
