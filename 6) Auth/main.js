const express = require('express');
const app = express();
const session = require('express-session');

app.listen(3000, () => console.log('Listening on port 3000....'));

app.use(express.json());

app.use(
  session({
    secret: 'ayush',
    resave: false,
    saveUninitialized: false
  })
);

//. Importing login route (login request should be before authenticating middleware)
app.use('/api/', require('./routes/auth.js'));

/*

  * Checking middleware
  - This middleware catches all types of requests and checks if an object named 'user' is present
    inside req.sessions which ensures that the user is authenticated . Only authenticated users can
    get past this middleware and execute other requests.

  - It basically protects all routes below it.

  ~ Login route should not be protected by such middleware otherwise we cannot even access login.

  We can also define this middleware inside route files that we want to protect (ie. cars route)
  Specific protection is better than global protection as it gives us more control over what to
  protect and what not.

*/

//. Authenticating middleware
app.use((req, res, next) => {
  if (req.session.user) return next();
  res.sendStatus(401);
});

//. Importing cars route
app.use('/api/cars', require('./routes/cars.js'));

//. Making a function to return session info
app.get('/api/session', (req, res) =>
  res.send({ session_id: req.sessionID, session: req.session })
);

/*
  * Logging in
	POST http://localhost:3000/api/login
	content-type: application/json

	{
		"username": "ayush",
		"password": "hello"
	}

  * Posting a car
  POST http://localhost:3000/api/cars
	content-type: application/json
	
	{
		"name": "zen",
		"speed": 100,
		"average": 23,
		"main_features": ["Compact", "Cheap"]
	}

  * Getting cars
  http://localhost:3000/api/cars

  * Getting session
  http://localhost:3000/api/session

*/
