const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };
