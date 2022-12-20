const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: { model: User },
      raw: true,
      nest: true
    });

    //console.log(blogData); // delete

    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      blogData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
