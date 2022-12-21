const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create comment
router.post('/', withAuth, async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
});

// update comment
router.put('/:id', withAuth, async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;