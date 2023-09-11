const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening to port 3000'));

//-------------------------------------------------------------------------------------
// What is a route handler?
//-------------------------------------------------------------------------------------
// Route handlers enable you to define multiple routes for a path. The following example
// defines two routes for GET requests to the /cars/:name path :
// 1) A middleware sub stack that handles GET requests to the /cars/:name path
// 2) An alternate middleware (ie. route handler) for the /cars/:name path

//-------------------------------------------------------------------------------------
// What is the benefit of making a route handler here?
//-------------------------------------------------------------------------------------
// In the following example, there can be 2 routes for any get request made to the path
// /cars/:name based on the size of name :

// 1) If size > 3 characters : The middleware sub stack will send the response back to the
// client. Thus the route handler never got a chance to execute.
//* http://localhost:3000/cars/santro

// 2) If size <= 3 characters : In this case the first middleware from middleware stack
// will cause the middleware stack to end prematurely (ie. without giving the second
// middleware from middleware stack a chance to execute) and passing the req-res control
// directly to the next route ie. the route handler.
//* http://localhost:3000/cars/zen

// Middleware Sub stack
app.get(
	'/cars/:name',

	// First middleware from middleware sub stack
	(req, res, next) => {
		// If size <= 3, the next('route') command will pass the control from this
		// middleware sub stack to the next route ie. the route handler. NOTE: the
		// next('route') fxn will work only in middleware functions that were loaded
		// by using the app.METHOD() or router.METHOD() functions.

		// Else if size > 3, the next() command will pass the control from this
		// middleware to the next middleware (ie. the second middleware from sub stack)
		if (req.params.name.length <= 3) {
			next('route');
			return;
			// Return is important otherwise after executing the route handler,
			// the req-res control will again come back to this function and this
			// time next() will get executed and thus passing control to the second
			// middleware from middleware sub stack leading to error that we cannot
			// put headers to response objects that have already been sent.
		}
		next();

		//-------------------------------------------------------
		// Making the code shorter by using return inline
		// if (req.params.name.length <= 3) return next("route");
		// next();
		//-------------------------------------------------------
	},

	//-------------------------------------------------------------------------
	// Further shortening the above code by using ternary operator
	// (req, res, next) => (req.params.name.length <= 3 ? next("route") : next()),
	//-------------------------------------------------------------------------

	// Second middleware from middleware sub stack
	(req, res, next) => res.send('Regular Car')
);

// Alternate route (ie. route handler)
app.get('/cars/:name', (req, res, next) => {
	res.send('Imported Car');
});
