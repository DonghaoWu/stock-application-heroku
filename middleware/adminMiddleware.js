module.exports = function (req, res, next) {
  //check if admin === true
  if (!req.user.admin) {
    next({
      statusCode: 401,
      errors: [{ msg: `Admin authorization denied.` }],
    });
  }
  next();
};
