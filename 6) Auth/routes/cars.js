const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  const { cars } = req.session;
  if (cars === undefined) return res.sendStatus(404);
  res.send(cars);
});

router.post('/', (req, res) => {
  req.session.cars = req.session.cars || [];
  req.session.cars.push(req.body);
  res.sendStatus(201);
});

module.exports = router;
