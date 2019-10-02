const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator')


// @route  GET api/portfolio/me
// @desc   Get current users pofile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'balance']);
        if (!portfolio) {
            return res.status(400).json({ msg: 'There is no portfolio for this user.' });
        }
        else res.json(portfolio);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route  POST api/portfolio
// @desc   Create or update user portfolio
// @access Private

router.post('/', auth,
    async (req, res) => {
        const { age, bio } = req.body;

        try {
            let portfolio = await Portfolio.findOne({ user: req.user.id });

            if (portfolio) {
                portfolio = await Portfolio.findOneAndUpdate({ user: req.user.id }, { $set: { age, bio } }, { new: true });
                return res.json(portfolio);
            }

            else if (!portfolio) {
                portfolio = new Portfolio({
                    user: req.user.id,
                    age: age,
                    bio: bio
                })

                await portfolio.save();
                res.json(portfolio);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route  DELETE api/portfolio
// @desc   Delete portfolio, user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
    try {
        //Remove portfolio
        await Portfolio.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: "User and portfolio deleted" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;