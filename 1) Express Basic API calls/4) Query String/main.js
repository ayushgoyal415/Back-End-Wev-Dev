const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cars = require('../db/main');
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*

  Query string is used to pass additional information inside API request

  This below API stores the key-value pairs inside the req object as follows :
	* http://localhost:3000/api/cars?car=zen&prop=average

  req = {
    query{
      car: 'zen',
      prop: 'average'
    }
  }

*/

app.get('/api/cars', (req, res) => {
  const { car, prop } = req.query;

  //. CASE 1 : If both car and prop were not sent
  // http://localhost:3000/api/cars
  if (car === undefined && prop === undefined) return res.send(cars);

  //. CASE 2 : If only prop was sent
  // http://localhost:3000/api/cars?prop=average
  if (car === undefined) return res.status(400).send('Please add car in query');

  //. Checking if car exists or not
  if (cars[car] === undefined) return res.status(404).send('Car not found');

  //. CASE 3 : If only car was sent
  // http://localhost:3000/api/cars?car=zen
  if (prop === undefined) return res.send(cars[car]);

  //. Checking if prop exists or not
  if (cars[car][prop] === undefined)
    return res.status(404).send('Prop not found');

  //. CASE 4 : If both car and prop were sent
  // http://localhost:3000/api/cars?car=zen&prop=average
  res.send(cars[car][prop]);
});
