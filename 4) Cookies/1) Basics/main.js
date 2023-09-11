const express = require('express');
const app = express();

app.listen(3000, () => console.log(`Listening on port 3000...`));

/*
  * What are cookies?
  - blocks of data that are sent from web server (eg. Express API) to the client (eg. web browser).
  - Chrome has a section where it stores cookies. Cookies will be stored in postman, if we are using
    postman as a client to make http requests

  * Why cookies are needed?
  - http requests are stateless -> that is, between subsequent http requests, there is no correlation
  - Cookies allow http requests to have a state.

  * How do cookies work?
  - When client(postman) make a request to a web server (Express API), it will send back a cookie
  - This cookie can then be stored on the client side (postman)
  - Any subsequent requests made to the server by the client will send back this cookie to the web server.
  - Web server can check for this cookie, validate it, can extract more information about user e.g. :
    . previous visits on site -> can be used to show welcome screen to new users
    . maintaining shopping cart data -> eg. remembering the items added to cart
    . keeping user logged in -> eg. for 60 days and then logout automatically
	
  * Cookie Arguments

  Cookies are stored as key-value pairs therefore a key and value must be sent:
  for eg. -> "logged" : true
  
  Additional cookie options can also be sent eg. :
  .  maxAge : Expires after specified milliseconds
  .  expires : expires at a particular time

  * Send cookie
  http://localhost:3000/

  * Clear cookie
  http://localhost:3000/clear

*/

app.get('/', (req, res, next) => {
  if (req.headers.cookie) return res.send('Welcome Back');

  res.cookie('logged', true, {
    maxAge: 5 * 1000, //. 5 seconds
    httpOnly: true,
    secure: false, //. Only https cookies can be secure
    sameSite: 'lax' //. Only secure cookies can be sent across different sites ie sameSite : 'none'
  });

  res.send('Welcome');

  console.log(`Cookie created at ${new Date().toLocaleTimeString()}`);

  next();
});

//. Making a middleware function that logs that the cookie has expired
app.get('/', (req, res, next) => {
  setTimeout(
    () => console.log(`Cookie Expired at ${new Date().toLocaleTimeString()}`),
    5 * 1000
  );
});

//. Function to manually clear cookie
app.get('/clear', (req, res, next) => {
  res.clearCookie('logged').send('Cookie cleared');
});
