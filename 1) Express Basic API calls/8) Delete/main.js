const express = require("express");
const app = express();

const cars = require("../db/main");
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/api/cars", (req, res) => res.send(cars));

/*
	* Deleting and then getting

	DELETE http://localhost:3000/api/cars/zen
	http://localhost:3000/api/cars

*/

app.delete("/api/cars/:name", (req, res) => {
	const {name} = req.params;
	if (!cars[name]) return res.status(404).send("Car not found");
	delete cars[name];

	res.sendStatus(202); //. 202 : ACCEPTED
});


