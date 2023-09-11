const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening on port 3000...'));

//. Loading the router module in the main app and prefixing all routes
//. defined in birds router with /birds
app.use('/birds', require('./routes/birds'));

/*

  The app will now be able to handle requests to /birds and /birds/about, as well as
  call the timeLog middleware function that is specific to the route.
 
  http://localhost:3000/birds
  http://localhost:3000/birds/about

*/
