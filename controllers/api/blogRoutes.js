const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// create blog
router.post('/', withAuth, async (req, res) => {
  const { title, body } = req.body;
  const { userId } = req.session;

  try {
    const blogData = await Blog.create({ title, body, userId });
    res.json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update blog
router.put('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;
  const { title, body } = req.body;

  try {
    const blogData = await Blog.findByPk(id);

    if (userId === blogData.userId) {
      blogData.update({ title, body });
    } else {
      throw 'user and poster does not match'
    }

    res.json(blogData)
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete blog
router.delete('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;

  try {
    const blogData = await Blog.findByPk(id)

    if (userId === blogData.userId) {
      blogData.destroy();
    } else {
      throw 'user and poster does not match'
    }

    res.json(blogData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
