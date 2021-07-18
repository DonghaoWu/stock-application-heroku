const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = async function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  //check if not token
  if (!token) {
    next({
      statusCode: 401,
      errors: [{ msg: `Invalid token.` }],
    });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    const user = await User.findById(decoded.user.id).select('-password');
    req.user = user;
    next();
  } catch (error) {
    next({
      statusCode: 401,
      errors: [{ msg: `Invalid token.` }],
    });
  }
};
