const express = require('express');
const app = express();

const cars = require('../_database');
const port = process.env.PORT || 3000;

const Joi = require('joi');
const schema = Joi.object({ value: Joi.required() });

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/api/cars', (req, res) => res.send(cars));

app.use(express.json());

/*
	* Try putting and then getting

	PUT http://localhost:3000/api/cars/zen/average
	content-type: application/json
	
	{
		"value": "15"
	}
	
	http://localhost:3000/api/cars
*/

app.put('/api/cars/:name/:prop', (req, res) => {
  const { name, prop } = req.params;
  
	if (cars[name] === undefined) return res.status(404).send('Car not found');

  if (cars[name][prop] === undefined)
    return res.status(404).send('Property not found');

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  cars[name][prop] = req.body.value;
  res.sendStatus(200); //. Status 200 : OK
});
