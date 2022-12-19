const router = require('express').Router();
const { User } = require('../../models');

// create user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  try {
    res.json({message: 'complete'})
  } catch (err) {
    res.status(400).json(err);
  }
});

// user login
router.post('/login', async (req, res) => {
  try {


  } catch (err) {
    res.status(400).json(err);
  }
});

// user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
