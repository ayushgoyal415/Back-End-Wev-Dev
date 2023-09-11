// Router-level middleware works in the same way as application-level middleware, except
// it is bound to an instance of express.Router().

const express = require("express");
const app = express();
const router = express.Router();

// A middleware function with no mount path. This code is executed for every request to
// the router
router.use((req, res, next) => {
	console.log("Time:", Date.now());
	next();
});

// A middleware sub-stack that shows request info for any type of HTTP request to the
// /cars/:name path
router.use(
	"/cars/:name",
	(req, res, next) => {
		console.log("Request URL:", req.originalUrl);
		next();
	},
	(req, res, next) => {
		console.log("Request Type:", req.method);
		next();
	}
);

// A middleware sub-stack that handles GET requests to the /cars/:name path
router.get(
	"/cars/:name",
	(req, res, next) => (req.params.name.length <= 3 ? next("router") : next()), // using next('router')
	(req, res, next) => res.send("Regular Car")
);

// Route handler for the /cars/:name path, which renders a special page
router.get("/cars/:name", (req, res, next) => {
	res.send("Imported Car");
});

// Mount the router on the app
app.use("/", router);
