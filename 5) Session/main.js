const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => console.log(`Listening on port 3000...`));

const session = require('express-session');
app.use(
  session({
    secret: 'ayush',
    resave: false,
    saveUninitialized: false
  })
);

// + Sessions and cookies
/*
	* Importing express-session module:
	- express-session is an external module (npm i express-session)
	
	* Setting session:
	- We pass in the session middleware into app.use.
	- We can pass session options as an object inside the session middleware.
	
	* How does session work:
	- When a session is created, all the data associated with it saved on the server
	  side. The client is sent a cookie containing the session ID which the server
	  later use to validate the user. Each time when the client posts a request, the
	  server matches the session ID and returns the response accordingly.
	- Note that the session on the server side is stored inside memory. When the session
	  ends, all the memory associated with the session gets deallocated.

	* Sessions v/s cookies:
	- In cookies all of the data is stored on the client side. Cookies are thus not
	  as safe as sessions are. With sessions, the client is sent back a cookie
	  containing only the session ID and not the complete data. This id can later be
	  used to validate the user.

	* Accessing session data in a different client (eg Edge)
	- As the session data is stored in server, it can be used from any client from
	  where the user wants to access the server from. But for such access, session
	  id is required to validate the user. We can set a cookie containing session id
	  manually (ie copying a cookie from one client(eg Rest client) to another (eg.
	  microsoft edge)).
	- After posting a car using rest client, copy the session id from the cookie
	- Then go to localhost:3000/api/cars
	- Then go to inspect -> Application tab -> select cookies from sidebar -> add
	  the data manually. eg. for copying the following cookie :
	
	cspell:disable

	+ connect.sid=s%3AgIxpb_yBTH7jSsh0tB_cVrEc8tSaJbl6.nV5CshjAXq1WPCqmZuVI6H0oBvF3RRjs01%2FuI5ZrhJg; Path=/; HttpOnly 
	name : connect.sid
	Value : s%3AgIxpb_yBTH7jSsh0tB_cVrEc8tSaJbl6.nV5CshjAXq1WPCqmZuVI6H0oBvF3RRjs01%2FuI5ZrhJg
	Path : /
	HttpOnly : true

	cspell:enable

*/

// + Arguments accepted by express-session middleware
/*

	- express-session middleware accepts an object containing following options :

	.'cookie'
	The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }
	Other options can be sent eg. domain, expires, sameSite

	.'genid'
	a function to be used to generate session id (make sure to make it unique)

	.'name'
	set a custom name (default is connect.sid)

	.'resave'
	Forces the session to be saved back to the session store, even if the session
	was never modified during the request. Depending on your store this may be
	necessary. The default value is true. The best way to know is to check with your
	store if it implements the touch method. If it does, then you can safely set
	resave: false. If it does not implement the touch method and your store sets an
	expiration date on stored sessions, then you likely need resave: true.

	.'rolling'
	Force the session identifier cookie to be set on every response. The expiration is
	reset to the original maxAge, resetting the expiration countdown. Default : false.

	.'saveUninitialized'
	Forces a session that is "uninitialized" to be saved to the store. A session is
	uninitialized when it is new but not modified. Choosing false is useful for
	implementing login sessions, reducing server storage usage, or complying with laws
	that require permission before setting a cookie. Default : true

	.'secret'
	+ it is a required option
	This is the secret used to sign the session ID cookie. This can be either a string
	for a single secret, or an array of multiple secrets. If an array of secrets is provided,
	only the first element will be used to sign the session ID cookie, while all the elements
	will be considered when verifying the signature in requests.
	
	A best practice may include:
	- The use of environment variables to store the secret
	- Periodic updates of the secret, while ensuring the previous secret is in the array.

	Changing the secret value will invalidate all existing sessions. In order to rotate the
	secret without invalidating sessions, provide an array of secrets, with the new secret as
	first element of the array, and including previous secrets as the later elements.

	.'store'
	The session store instance, defaults to a new MemoryStore instance.

	.'unset'
	Control the result of unsetting req.session (through delete, setting to null, etc.).
	The default value is 'keep'.
	- 'destroy' The session will be destroyed (deleted) when the response ends.
	- 'keep' The session in the store will be kept, but modifications made during
	  the request are ignored and not saved.

	.'proxy'
	Not understood very well

*/

// + Accessing session and related properties from 'req' object
/*
	.'req.session'
	Session object can simply be accessed using req.session
	
	.'req.sessionID'
	It helps to access the unique ID associated with session. It cannot be modified.

	.'req.sessionStore'
	It helps to access the session store

*/

// + Accessing session properties from 'req.session' object
/*

	* Functional properties

	.'req.session.regenerate(?callback)'
	Generates a new SID and Session instance.
	Accepts a callback function to be invoked after a new session id gets generated

	.'req.session.destroy(?callback)'
	Destroys the session and will unset the req.session property.
	Accepts a callback function to be invoked after the session gets destroyed

	.'req.session.reload(?callback)'
	Reloads the session data from the store and re-populates the req.session object.
	Accepts a callback function to be invoked after the session gets reloaded.

	.'req.session.save(?callback)'
	Save the session back to the store, replacing the contents on the store with the
	contents in memory (though a store may do something else--consult the store's
	documentation for exact behavior)
	
	This method is automatically called at the end of the HTTP response if the session
	data has been altered (though this behavior can be altered with various options in
	the middleware constructor). Because of this, typically this method does not need
	to be called.

	There are some cases where it is useful to call this method, for example, redirects,
	long-lived requests or in WebSockets.
	
	Accepts a callback function to be invoked after the session gets saved.

	.'req.session.touch()'
	Updates the .maxAge property. Typically this is not necessary to call, as the session
	middleware does this for you.
	

	* Other properties
	
	.'req.session.id'
	It is an alias for req.sessionID

	.'req.session.cookie'
	Each session has a unique cookie object accompany it. This allows you to alter the session
	cookie per visitor. For example we can set req.session.cookie.expires to false to enable
	the cookie to remain for only the duration of the user-agent. We can also access all other
	cookie options described above.

*/

// + Understanding session store
/*

	~ Warning The default server-side session storage used is MemoryStore
	- Express-session by default is purposely not designed for a production.
	- It will leak memory under most conditions, does not scale past a single
	  process, and is meant for debugging and developing.
	- Use other session stores in production environment

	* Implementing session store

	Every session store must be an EventEmitter and implement specific methods.
	The following methods are the list of required, recommended, and optional :
	- Required methods are ones that this module will always call on the store.
	- Recommended methods -> the module will call on the store if available.
	- Optional methods -> the module does not call at all, but helps present
	  uniform stores to users.

	.'store.all(callback)' -> Optional
	This optional method is used to get all sessions in the store as an array.
	The callback should be called as callback(error, sessions).

	.store.destroy(sid, callback) -> Required
	This required method is used to destroy/delete a session from the store given
	a session ID (sid). The callback should be called as callback(error) once the
	session is destroyed.
		
	.store.clear(callback) -> Optional
	This optional method is used to delete all sessions from the store. The callback
	should be called as callback(error) once the store is cleared.
		
	.store.length(callback) -> Optional
	This optional method is used to get the count of all sessions in the store. The
	callback should be called as callback(error, len).
		
	.store.get(sid, callback) -> Required
	This required method is used to get a session from the store given a session ID
	(sid). The callback should be called as callback(error, session).
		
	The session argument should be a session if found, otherwise null or undefined
	if the session was not found (and there was no error). A special case is made
	when error.code === 'ENOENT' to act like callback(null, null).
		
	.store.set(sid, session, callback) -> Required
	This required method is used to upsert a session into the store given a session
	ID (sid) and session (session) object. The callback should be called as
	callback(error) once the session has been set in the store.
		
	.store.touch(sid, session, callback) -> Recommended
	This recommended method is used to "touch" a given session given a session ID
	(sid) and session (session) object. The callback should be called as
	callback(error) once the session has been touched.
		
	This is primarily used when the store will automatically delete idle sessions
	and this method is used to signal to the store the given session is active,
	potentially resetting the idle timer.

*/

/*

	http://localhost:3000/api/cars
	
	POST http://localhost:3000/api/cars
	content-type: application/json
	
	{
		"name": "zen",
		"speed": 100,
		"average": 23,
		"main_features": ["Compact", "Cheap"]
	}

*/

//. Adding posted car to req.session
app.post('/api/cars', (req, res) => {
  req.session.cars = req.session.cars || [];
  req.session.cars.push(req.body);
  res.sendStatus(201);
});

//. Getting car from req.session
app.get('/api/cars', (req, res) => {
  const { cars } = req.session;
  if (cars === undefined) return res.sendStatus(404);
  res.send(cars);
});
