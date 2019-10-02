const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const { check, validationResult } = require('express-validator')

// @route  GET api/portfolio/me
// @desc   Get current users pofile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { shareholding } = user;
        res.json(shareholding);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;