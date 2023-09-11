const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening on port 3000...'));

function get(A) {
  for (let i = 0; i < A.length; i++)
    app.get(A[i], (req, res) => res.send(`Url : ${req.url}, Route : ${A[i]}`));
}

// The hyphen (-) and the dot (.) are interpreted literally by string-based paths.

//* Route paths based on string patterns:
const A = [
  '/ab?cd',
  /**
   * 1) 'b' may or may not be present
   * . http://localhost:3000/acd
   * . http://localhost:3000/abcd
   */

  '/a(bc)?de',
  /**
   * 2) bc may or may not be present
   * . http://localhost:3000/ade
   * . http://localhost:3000/abcde
   */

  '/ef+gh',
  /**
   * 3) multiple 'f' may be present
   * . http://localhost:3000/efgh
   * . http://localhost:3000/efffgh
   */

  '/e(fg)+hi',
  /**
   * 4) multiple 'fg' may be present
   * . http://localhost:3000/efghi
   * . http://localhost:3000/efgfgfghi
   */

  '/ij*kl',
  /**
   * 5) Anything may be present between ij and kl
   * . http://localhost:3000/ijkl
   * . http://localhost:3000/ij123kl
   */

  '/ij*k*l*m',
  /**
   * 6) Anything may be present after between (j and k) and/or (k and l) and/or (l and m)
   * . http://localhost:3000/ijklm
   * . http://localhost:3000/ij999k999l999m
   */

  '/a?b(cd)+ef*'
  /**
   * 7) Complex string pattern
   *    - 'a' may or may not be present
   *    - multiple 'cd' may be present
   *    - anything may be present at the end
   * . http://localhost:3000/abcdef
   * . http://localhost:3000/bcdcdef999
   */
];

//* Route paths based on regular expressions (REGEX):
const B = [
  /~/,
  /**
   * 1) '~' must be present
   * . http://localhost:3000/~
   * . http://localhost:3000/999~999
   */

  /api\/cars/,
  /**
   * 2) api/cars must be present (escaping forward slash)
   * . http://localhost:3000/api/cars
   * . http://localhost:3000/apiapi/carscars
   * . http://localhost:3000/999api/cars999
   */

  /.*fly$/,
  /**
   * 3) Must end with 'fly' (cannot be butterflies)
   * . http://localhost:3000/fly
   * . http://localhost:3000/butterfly
   */

  /a[z|r]/,
  /**
   * 4) Must have 'az' or 'ar'
   * . http://localhost:3000/azure
   * . http://localhost:3000/charcoal
   */

  /a[0-9]/,
  /**
   * 5) Must have 'a' followed by 0-9 (a0, a1, a2,......)
   * . http://localhost:3000/drama0
   * . http://localhost:3000/drama2
   */

  /c{2,3}/,
  /**
   * 6) Must have two or three 'c' consecutively (cc or ccc)
   * . http://localhost:3000/crocc
   */

  /[a-c]{2}/,
  /**
   * 7) Must have two consecutive characters from a to c
   * . http://localhost:3000/aca
   */

  /^\/[0-9]*$/,
  /**
   * 8) Must contain only numbers
   * Even no number from 0 - 9 (thus it will perform get on '/')
   * Thus we use '+' instead meaning there may be any number but at least 1 is required
   * . http://localhost:3000/54054
   * . http://localhost:3000/
   */

  /Hello[a-z]*OK$/,
  /**
   * Must have the following sequence :
   *  - has Hello, followed by
   *  - any number of characters from a to z, followed by
   *  - OK (at the end)
   * . http://localhost:3000/HelloejxnvcxfOK
   */
];

get(A);
get(B);

//* Setting up regex for route parameters (include in parentheses):
//. http://localhost:3000/user/ayush/7696842758
app.get("/user/:name([a-zA-Z]+)/:contact([6-9][0-9]{9})", (req, res) => {
	const { name, contact } = req.params;
	res.send({ name, contact });
});