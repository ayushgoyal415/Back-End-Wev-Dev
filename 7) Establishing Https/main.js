//. Importing key and certificate
const fs = require('fs');
const key = fs.readFileSync('C:/openssl/localhost.decrypted.key');
const cert = fs.readFileSync('C:/openssl/localhost.crt');

//. Creating an express app
const express = require('express');
const app = express();

//. Creating an https server using key, cert and express app
const https = require('https');
const server = https.createServer({ key, cert }, app);

//. Https server listening on PORT 3001
server.listen(3001, () => console.log(`Listening on PORT 3001...`));

//. Implementing express-session middleware with a secure cookie that
//. allows cookies to be sent on cross origin sites
const session = require('express-session');
app.use(
  session({
    secret: 'ayush',
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: 'none', secure: true }
  })
);

//. Implementing CORS middleware to allow posting from cross sites
const cors = require('cors');
app.use(cors({ origin: `http://localhost:5500`, credentials: true }));

app.get('/', (req, res) => res.send('Welcome')); // https://localhost:3001/
