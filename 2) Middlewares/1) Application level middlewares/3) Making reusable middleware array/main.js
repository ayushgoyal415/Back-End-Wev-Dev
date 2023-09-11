const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening on port 3000..."));

// Making an array of functions -> which can be used to create middleware substacks
// handling different http requests and mounting to different paths.
const req_info = [
	(req, res, next) => {
		console.log("Request URL:", req.originalUrl);
		next();
	},

	(req, res, next) => {
		console.log("Request Type:", req.method);
		next();
	},
];

// http://localhost:3000/cars/zen

// Using array to construct a middleware sub-stack that handles the 'GET' requests
// to the /cars/:name path
app.get("/cars/:name", req_info, (req, res, next) => {
	res.send(`Car : ${req.params.name}`);
});

// Using the same array, this time to construct a middleware sub-stack that handles
// the 'POST' requests to the /cars/:name path
app.post("/cars/:name", req_info, (req, res, next) => {
	res.sendStatus(201);
});
