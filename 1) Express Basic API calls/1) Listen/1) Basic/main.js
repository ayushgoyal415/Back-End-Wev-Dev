const express = require('express'); //. require(express) returns a constructor function

//. The object (eg. app) constructed using express function has various methods
//. (e.g. get, put, post, listen etc)
const app = express();

/*
  * ENVIRONMENT VARIABLES

  An environment variable is a variable that is part of the environment in which a
  process runs. Its value is usually set outside the application.
  - PORT is also an environment variable. We can set PORT manually using cmd.
  - Mostly PORT is dynamically assigned to us by the hosting environment.


  * SETTING 'PORT'
  . run cmd -> set PORT=5000
  . Can also use dotenv module


  * GETTING VALUE OF PORT

  When PORT is dynamically assigned to us, we may not know what should our app
  listen to. So in these cases we need to find the value of PORT using 'process.env'
  
*/

//. Storing value of port to PORT (env variable) or 3000 (if PORT is undefined)
const PORT = process.env.PORT || 3000;

//. Listening to port (this links the app to the port)
//. Note: Similar to http module, express listen can accept -> PORT, IP address, cb fxn
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
