const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator')


// @route  GET api/profile/me
// @desc   Get current users pofile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'balance']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }
        else res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

router.post('/', [auth, [
    check('age', 'Age is required').not().isEmpty(),
    check('bio', "Bio is not empty.").not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { age, bio } = req.body;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: { age, bio } }, { new: true });
                return res.json(profile);
            }

            else if (!profile) {
                profile = new Profile({
                    user: req.user.id,
                    age: age,
                    bio: bio
                })

                await profile.save();
                res.json(profile);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
    try {
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: "User and profile deleted" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;