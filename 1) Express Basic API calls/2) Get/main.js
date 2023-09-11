const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//. Importing database
const cars = require('../db/main');

/*
  * get function accepts 2 arguments :

  - route -> e.g. '/'
  - callback fxn -> This cb fxn can accept upto 3 parameters :
    . 'req' -> contains the body of the user request received
    . 'res' -> used to send the response back to user
    . 'next' -> to go to next middleware

  * Response methods
    
  The methods on the response object (res) that can be sent as a response to the client,
  and terminate the req-res cycle. If none of these methods are called by the middleware
  chain functions, the client request will be left hanging.

  . res.download()      ->      Prompt a file to be downloaded.
  . res.end()           ->      End the response process.
  . res.json()          ->      Send a JSON response.
  . res.jsonp()         ->      Send a JSON response with JSONP support.
  . res.redirect()      ->      Redirect a request.
  . res.render()        ->      Render a view template.
  . res.send()          ->      Send a response of various types.
  . res.sendFile()      ->      Send a file as an octet stream.
  . res.sendStatus()    ->      Set the status code and send its string representation.

*/

//* http://localhost:3000
app.get('/', (req, res) => res.send('Welcome to Ayush Cars'));

//* http://localhost:3000/api/cars
app.get('/api/cars', (req, res) => res.send(cars));

app.listen(port, () => console.log(`Listening on port ${port}...`));
