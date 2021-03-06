const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  //check if not token
  if (!token) {
    next({
      statusCode: 401,
      errors: [{ msg: `No token, authorization denied.` }],
    });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    next({
      statusCode: 401,
      errors: [{ msg: `Token is not valid.` }],
    });
  }
};
