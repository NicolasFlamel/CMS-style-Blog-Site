const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'body', 'dateCreated', 'user.username'],
      include: { model: User, attributes: [] },
      order: [['dateCreated', 'DESC']],
      raw: true,
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
      attributes: ['id', 'title', 'body', 'dateCreated', 'user.username'],
      include: {
        model: User,
        attributes: ['username'],
      },
      raw: true,
    });

    const commentData = await Comment.findAll({
      attributes: ['id', 'message', 'dateCreated', 'userID', 'user.username'],
      where: {
        blogID: blogData.id
      },
      include: { model: User, attributes: [] },
      raw: true,
    })

    console.log(blogData);
    console.log(commentData);

    res.render('blog', {
      loggedIn: req.session.loggedIn,
      blogData,
      commentData
    })
  } catch (err) {
    console.error('error');
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  const { userID } = req.session
  try {
    const blogData = await Blog.findAll({
      where: {
        userID
      },
      attributes: ['id', 'title', 'dateCreated'],
      raw: true
    });

    console.log(blogData);

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      blogData
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
