const express = require('express');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');

// @route  GET api/auth
// @desc   Load user info
// @access public
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (error) {
    console.log(error);
    if (!error.errors) {
      let defaultError = {
        statusCode: 500,
        errors: [{ msg: 'Load user failed.' }],
      };
      next(defaultError);
    } else next(error);
  }
});

// @route  POST api/auth
// @desc   Sign in User & get token
// @access public
router.post(
  '/',
  [
    check('email', 'Please includes a valid email').isEmail(),
    check(
      'password',
      'Please enter a password (six or more characters).'
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

      const { email, password } = req.body;

      //See if a user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'Invalid Credentials' }],
        };
        throw err;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'Invalid Credentials' }],
        };
        throw err;
      }

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
      console.log(error);
      if (!error.errors) {
        let defaultError = {
          statusCode: 500,
          errors: [{ msg: 'User sign in failed.' }],
        };
        next(defaultError);
      } else next(error);
    }
  }
);

module.exports = router;
