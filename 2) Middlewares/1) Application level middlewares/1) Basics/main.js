const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening on port 3000'));

// Express is a routing and middleware web framework that has minimal functionality
// of its own: An Express application is essentially a series of middleware fxn calls.

// Middleware functions are functions that have access to the request object(req),
// the response object(res), and the next middleware function in the application's
// (app) request-response cycle.

//-----------------------------------------------------------------------------------
// Middleware functions can perform the following tasks:
//-----------------------------------------------------------------------------------
// 1) Execute any code.
// 2) Make changes to the req & res objects. (eg. parsing req.body, adding res headers)
// 3) End the request-response cycle.
// 4) Call the next middleware function in the stack.

//-----------------------------------------------------------------------------------
// An Express application can use the following types of middleware:
//-----------------------------------------------------------------------------------
// 1) Application-level middleware
// 2) Router-level middleware
// 3) Error-handling middleware
// 4) Built-in middleware
// 5) Third-party middleware

//-----------------------------------------------------------------------------------
// Application-level middleware function (ALMF) -> Functions called by using app.
//-----------------------------------------------------------------------------------
// Bind application-level middleware to an instance of the app object by using the
// app.use() and app.METHOD() functions (eg. .get(), .post(), .put()).
//-----------------------------------------------------------------------------------

// i) ALMF with no mount path and no http request type -> This type of function is
// executed every time the app receives an http request (eg .get(), .put(), .post()).
//* http://localhost:3000/
app.use((req, res, next) => {
	console.log(`Request made at ${new Date().toLocaleTimeString()}`);
	next();
	// next() is must here, otherwise no http request will be able to proceed past
	// this middleware because :
	// - it is defined at the top of other middleware functions
	// - this fxn lacks mount path and http request type thus receiving every request
});
app.get('/', (req, res) => res.send('Welcome'));

// ii) ALMF with mount path (/cars/:name) but no http request type -> This type of
// function is executed only for http requests on the path specified however the
// request can be of any type (eg .get(), .put(), .post()).
//* http://localhost:3000/cars/zen
app.use('/cars/:name', (req, res, next) => {
	console.log('Request Type:', req.method);
	next();

	//-------------------------------------------------------------------------------
	// We used next() here thus the req-res will be sent to the next middleware fxn
	// What happens if we don't use next() in this middleware function
	//-------------------------------------------------------------------------------
	// Using next() is must in this fxn because of 2 reasons :
	// 1) Problem of hanging request ->
	// This fxn is not handling the req properly to be able to terminate the req-res
	// cycle, i.e, it is not sending back some info (eg. res.status() or res.send())
	// Thus if the current middleware fxn does not end the req-res cycle, it must
	// call next() to pass control to the next middleware fxn. Otherwise, the request
	// will be left hanging.

	// 2) Problem of rendering other useful middleware functions useless :
	// If we hadn't use next() here, the req-res cycle would have terminated here.
	// That is, even if another middleware fxn (defined after this middleware fxn)
	// exists which possess the similar http request type (any type here) and mount
	// path (/cars/name), it will not receive this req-res cycle. Thus rendering such
	// fxn(s) useless.

	// So in order to handle req-res cycles properly, we must keep on passing the
	// req-res cycle (using next()) to the next middleware fxn until we reach a
	// middleware fxn that can handle the req-res cycle properly enough to be able
	// to terminate the chain by not using next().

	// Note : In the middleware chain, the order in middleware codes were defined in
	// the app is very important. As the req-res cycle first enters the middleware
	// which was defined at first in the code and then the next() passes the control
	// of the req-res cycle to the middleware which was defined next to this middleware.
});

// iii) ALMF with http request type (eg .get(), .put(), .post()) -> This type of
// function is executed only for http requests belonging to the defined request type
// and that too at the path specified. We have already discussed these type of
// middleware functions.
app.get('/cars/:name', (req, res, next) => {
	res.send(`Car : ${req.params.name}`);

	// Note : This middleware is necessary to be declared to handle the previous
	// middleware. Otherwise it would lead to hanging request.

	// This is the proper way of terminating a req-res cycle that is by sending a
	// response back to the client and not calling next().
});

//-----------------------------------------------------------------------------------
// Stacking middleware functions listening to similar http request type (any type)
// and path mount (/cars/:name)
//-----------------------------------------------------------------------------------
// Note : this middleware will execute for only those req-res cycles that have not
// already been terminated before it (eg. the previous middleware which has already
// terminated the http get requests for /cars/:name. Thus this middleware will be
// executed for all http requests belonging to /cars/:name except for the get requests).

/*
	> Try posting

	POST http://localhost:3000/cars/zen
	content-type: application/json

	{
		"speed": "100"
	}

*/

app.use(
	'/cars/:name',
	(req, res, next) => {
		console.log('Request URL:', req.originalUrl);
		next();
	},

	(req, res, next) => {
		console.log('HTTP version:', req.httpVersion);
		next();
	}
);
app.post('/cars/:name', (req, res) => res.sendStatus(201));
