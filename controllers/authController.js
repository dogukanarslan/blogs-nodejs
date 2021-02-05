module.exports.signup_get = (req, res) => {
    res.render('auth/signup', {title: 'Sign up!'});
};

module.exports.login_get = (req, res) => {
    res.render('auth/login', {title: 'Login!'});
};

module.exports.signup_post = (req, res) => {
    res.send('New signup');
};

module.exports.login_post = (req, res) => {
    res.send('Login post');
};
