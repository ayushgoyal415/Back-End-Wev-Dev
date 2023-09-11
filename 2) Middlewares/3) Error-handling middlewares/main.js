const express = require("express");
const app = express();
app.listen(3000, () => console.log(`Listening on PORT 3000...`));

// Error-handling middleware always takes four arguments :
// You must provide four arguments to identify it as an error-handling middleware.
// Even if you don’t need to use the next object, you must specify it to maintain
// the signature. Otherwise, it will be interpreted as regular middleware and will
// fail to handle errors.

// Define error-handling middleware functions in the same way as other middleware
// functions, except with four arguments instead of three, specifically with the
// signature (err, req, res, next)):

app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Something broke!");
});

//-----------------------------------------------------------------------------
// Express has the following built-in middleware functions:
//-----------------------------------------------------------------------------
// express.static serves static assets such as HTML files, images, and so on.
// express.json parses incoming requests with JSON payloads.
// express.urlencoded parses incoming requests with URL-encoded payloads.

//-----------------------------------------------------------------------------
// Third-party middleware
// Use third-party middleware to add functionality to Express apps.
//-----------------------------------------------------------------------------
// eg. using cookie-parser after installing -> npm install cookie-parser
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());
