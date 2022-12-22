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
      attributes: ['id', 'message', 'dateCreated', 'userId', 'user.username'],
      where: {
        blogId: blogData.id
      },
      include: { model: User, attributes: [] },
      order: [['dateCreated', 'DESC']],
      raw: true,
    })

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
  const { userId } = req.session

  try {
    const blogData = await Blog.findAll({
      where: {
        userId
      },
      attributes: ['id', 'title', 'dateCreated'],
      order: [['dateCreated', 'DESC']],
      raw: true
    });
    const { username } = await User.findByPk(userId, {
      attributes: ['username'],
      raw: true
    })

    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      blogData,
      username
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
