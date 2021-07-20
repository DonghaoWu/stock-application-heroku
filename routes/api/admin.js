const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');

const User = require('../../models/User');

const router = express.Router();

// @route  POST api/auth
// @desc   Create a user
// @access Private & Admin
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
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
    const { admin, balance, email, password, name } = req.body;
    try {
      if (!errors.isEmpty()) {
        let err = {
          statusCode: 400,
          errors: errors.array(),
        };
        throw err;
      }
      if (typeof admin !== 'boolean') {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'Admin should be a boolean value.' }],
        };
        throw err;
      }
      if (balance < 0) {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'Balance should not be less than 0.' }],
        };
        throw err;
      }

      let user = await User.findOne({ email: email });
      if (user) {
        let err = {
          statusCode: 400,
          errors: [{ msg: 'User already exists.' }],
        };
        throw err;
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const salt = await bcrypt.genSalt(10);

      const encryptedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name: name,
        email: email,
        password: encryptedPassword,
        avatar: avatar,
        balance: balance,
        admin: admin,
      });
      await user.save();
      res.send('Create user success.');
    } catch (error) {
      if (!error.errors) {
        let defaultError = {
          statusCode: 500,
          errors: [{ msg: `User ${email} created failed.` }],
        };
        next(defaultError);
      } else next(error);
    }
  }
);

// @route  GET api/admin
// @desc   Fetch all user
// @access Private & Admin
router.get('/', authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.find(
      {},
      { email: 1, balance: 1, admin: 1, _id: 1, name: 1, date: 1 }
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    let err = {
      statusCode: 500,
      errors: [{ msg: 'Fetching all users failed.' }],
    };
    next(err);
  }
});

// @route  DELETE api/admin/:id
// @desc   Delect a user by _id
// @access Private & Admin
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    let id = req.params.id;
    try {
      if (id === req.user.id) {
        let err = {
          statusCode: 403,
          errors: [{ msg: `You can not delete your own account.` }],
        };
        throw err;
      }
      const response = await User.deleteOne({ _id: id });
      if (response.deletedCount === 0) {
        let err = {
          statusCode: 500,
          errors: [{ msg: `Delete failed: User not found.` }],
        };
        throw err;
      }
      res.send('Delete user success.');
    } catch (error) {
      if (!error.errors) {
        let defaultError = {
          statusCode: 500,
          errors: [{ msg: `Delete user failed.` }],
        };
        next(defaultError);
      } else next(error);
    }
  }
);

// @route  PUT api/auth
// @desc   Update a user
// @access Private & Admin
router.put('/', authMiddleware, adminMiddleware, async (req, res, next) => {
  const { admin, balance, email } = req.body;
  try {
    if (email === req.user.email && admin === false) {
      let err = {
        statusCode: 403,
        errors: [{ msg: `You can not change your privilege.` }],
      };
      throw err;
    }
    if (typeof admin !== 'boolean') {
      let err = {
        statusCode: 400,
        errors: [{ msg: 'admin should be a boolean value.' }],
      };
      throw err;
    }
    if (balance < 0) {
      let err = {
        statusCode: 400,
        errors: [{ msg: 'balance should not be less than 0.' }],
      };
      throw err;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { balance: balance, admin: admin } },
      { returnNewDocument: true }
    );

    if (!updatedUser) {
      let err = {
        statusCode: 400,
        errors: [{ msg: `Update failed: User not found.` }],
      };
      throw err;
    }
    res.send(`Update user '${email}' success.`);
  } catch (error) {
    if (!error.errors) {
      let defaultError = {
        statusCode: 500,
        errors: [{ msg: `Update user ${email} failed.` }],
      };
      next(defaultError);
    } else next(error);
  }
});

module.exports = router;
