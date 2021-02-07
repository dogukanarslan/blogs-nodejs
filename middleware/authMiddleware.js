const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check json web token exists & is verified
  if (!!token) {
    jwt.verify(token, 'themostsecurethingintheworld', (err, decodedtoken) => {
      if (!!err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedtoken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!!token) {
    jwt.verify(
      token,
      'themostsecurethingintheworld',
      async (err, decodedToken) => {
        if (!!err) {
          console.log(err);
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken);
          const user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
