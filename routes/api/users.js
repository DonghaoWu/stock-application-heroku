const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')
const User = require('../../models/Users');

// @route  POST api/users
// @desc   Register User
// @access public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please includes a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { name, email, password } = req.body;

    try {
        //See if a user exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }
        //Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })


        //Encrypt password
        const salt = await bcrypt.genSalt(10);

        const encryptedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name: name,
            email: email,
            password: encryptedPassword,
            avatar: avatar
        })

        await user.save();
        //Return jsonwebtiken
        console.log(user);
        res.send('After 4 await functions, user register success');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;