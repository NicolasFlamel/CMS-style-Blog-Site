const router = require('express').Router();
const { User } = require('../../models');

// create user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({ username, password });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      res.json({ newUser })
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username }
    });

    if (user && user.checkPassword(password)) {
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.loggedIn = true;
        res.json({ user })
      });
    }
    else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

// user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
