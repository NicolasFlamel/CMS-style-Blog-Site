const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ['id','title', 'body', 'dateCreated'],
      include: { model: User, attributes: ['username'] }, // {exclude: ['password']}
      order: [['dateCreated', 'DESC']],
      raw: true,
      nest: true
    });

    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      blogData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const blogData = await Blog.findByPk(id, {
      attributes: ['id','title', 'body', 'dateCreated'],
      include: { model: User, attributes: ['username'] }, // {exclude: ['password']}
      raw: true,
      nest: true
    });

    console.log(blogData);

    res.render('blog', {
      loggedIn: req.session.loggedIn,
      blogData
    })
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
