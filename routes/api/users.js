const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register User
// @access public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please includes a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        let err = {
          statusCode: 400,
          errors: errors.array(),
        };
        throw err;
      }

      const { name, email, password } = req.body;

      //See if a user exists
      let user = await User.findOne({ email: email });
      if (user) {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'User already exists.' }],
        };
        throw err;
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      const encryptedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name: name,
        email: email,
        password: encryptedPassword,
        avatar: avatar,
      });
      //After above, a new user with id is created, but not saved yet.
      //In mongoose, you can access the id by user.id, not user._id
      await user.save();

      //Return jsonwebtiken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          res.status(401).json({
            type: 'error',
            message: [{ msg: 'Generated web token failed.' }],
          });
          return;
        }
        res.json({ token });
      });
    } catch (error) {
      if (!error.errors) {
        let defaultError = {
          statusCode: 500,
          errors: [{ msg: 'User register failed.' }],
        };
        next(defaultError);
      } else next(error);
    }
  }
);

module.exports = router;
