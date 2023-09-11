const { Router } = require('express');
const router = Router();

const auth = { username: 'ayush', password: 'hello' };

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send(`Username and password are required`);

  if (username !== auth.username || password !== auth.password)
    return res.status(401).send(`Invalid username and or password`);

  if (req.session.user)
    return res.status(400).send(`Already logged in as ${username}`);

  req.session.user = { username, password };

  res.send(`Logged in as ${username}`);
});

module.exports = router;
