const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening on port 3000...'));

// There is a special routing method, app.all(), used to load middleware functions at a
// path for all HTTP request methods. For example, the following handler is executed for
// requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP
// request method supported in the http module.

app.all('/', (req, res, next) => {
	console.log(`New ${req.method} request...`);
	next(); // pass control to the next handler
});
app.get('/', (req, res) => res.send('Welcome')); //* http://localhost:3000/

//-------------------------------------------------------------------------------------------------------------------
// Differences between app.all() and app.use()
//-------------------------------------------------------------------------------------------------------------------

// In most cases they would work equivalently with the following differences :
// 1) The difference in order in which middleware would be applied:
// - app.all() attaches to the application's 'router' so it's used whenever the app.router middleware is reached
// - while app.use() attaches to the application's main middleware stack, so it's used in the order specified by
//   middleware, e.g., if you put it first, it will be the first thing to run. If you put it last, (after the router),
//   it usually won't be run at all.
// 2) One can use next("route") with app.all(), but not with app.use().
// 3) app.use() only sees whether url starts with the specified path whereas app.all() will match the complete path

// Usually, if you want to do something globally to all routes, app.use() is the better option.
