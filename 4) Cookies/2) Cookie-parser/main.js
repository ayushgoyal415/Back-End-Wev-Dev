const express = require('express');
const app = express();

app.listen(3000, () => console.log(`Listening on port 3000...`));

const time = () => {
  const d = new Date();
  return d.getTime();
};

const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

/*
	- Cookie parser is an external module
	- Returns a middleware which parse the req.headers.cookie into req.cookies

	* Arguments
	- secret : optional, parse the signed cookie into req.signedCookies using secret/array of secrets
	- options : decode function to decode the cookie value

	*	http://localhost:3000/
	*	http://localhost:3000/clear
	
*/

app.get('/', (req, res) => {
  const { last_logged } = req.cookies;

  if (last_logged) {
    return res
      .cookie('last_logged', time())
      .send(
        `Welcome Back!! Last logged : ${
          (time() - last_logged) / 1000
        } seconds ago`
      );
  }
  res.cookie('last_logged', time()).send('Welcome!!');
});

app.get('/clear', (req, res) => {
  res.clearCookie('last_logged').send('Cookie Cleared');
});
