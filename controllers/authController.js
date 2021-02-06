const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = { email: '', password: '' };

  if (11000 === err.code) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // Validation error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({id}, 'themostsecurethingintheworld', {
    expiresIn: maxAge
  })
};

module.exports.signup_get = (req, res) => {
  res.render('auth/signup', { title: 'Sign up!' });
};

module.exports.login_get = (req, res) => {
  res.render('auth/login', { title: 'Login!' });
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
  res.send('New signup');
};

module.exports.login_post = (req, res) => {
  res.send('Login post');
};
