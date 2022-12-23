const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create comment
router.post('/', withAuth, async (req, res) => {
  const { userId } = req.session;
  const { message, blogId } = req.body;

  try {
    const comment = await Comment.create({ message, userId, blogId });

    res.json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update comment
router.put('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const { userId } = req.session;

  try {
    const comment = await Comment.findByPk(id);

    if (comment.userId == userId) {
      await comment.update({ message });
      res.json(comment);
    } else {
      throw 'user and commenter does not match';
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session;

  try {
    const comment = await Comment.findByPk(id);

    if (comment.userId == userId) {
      await comment.destroy();
      res.json(comment);
    } else {
      throw 'user and commenter does not match';
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
