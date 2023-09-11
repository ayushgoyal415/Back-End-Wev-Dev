//~ Note : The terminal should be opened in the folder containing the .env file
//. Setting PORT using dotenv module
require('dotenv').config();

const express = require('express');
const app = express();

//. Getting port from process.env
const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on PORT ${PORT}...`));
