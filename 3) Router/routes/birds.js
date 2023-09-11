//. Can also destructure Router -> const {Router} = require("express");
const express = require('express');
const router = express.Router();

//. middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

//. defining '/' route
router.get('/', (req, res) => res.send('Birds home page'));

//. defining 'about' route
router.get('/about', (req, res) => res.send('About birds'));

module.exports = router;
