const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cars = require('../../db/main');
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*

	Route params are used to provide essential values inside API request object.
	
  This below API stores the key-value pairs inside the req object as follows :
	* http://localhost:3000/api/cars/zen/average
		 	
  req = {
    params{
      car: "zen",
      prop: "average"
    }
  }

*/

app.get('/api/cars/:car/:prop', (req, res) => {
  //. Can also use destructuring -> const {car, prop} = req.params;
  const car = req.params.car;
  const prop = req.params.prop;

  /*

    Note : It is important to return after each statement otherwise the entire
    function will try to execute further and the code will throw following errors :
    . Cannot read property of undefined car (if car not found)
    . Cannot set response headers after they are sent.

  */

  //. Checking if the car exists
  if (!cars[car]) return res.status(404).send('Car not found');

  //. Checking if the property exists
  if (!cars[car][prop]) return res.status(404).send('Property not found');

  res.send(cars[car][prop]);
});
