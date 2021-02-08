const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

// Create an express app
const app = express();

// Middleware and static files
app.use(
  sassMiddleware({
    src: __dirname + '/scss',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
  })
);

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Connect to mongodb
const url = 'mongodb://127.0.0.1:27017/blogs';
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

// Check user for every request
app.get('*', checkUser);

// Redirect
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Blog routes
app.use('/blogs', requireAuth, blogRoutes);

// Auth routes
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
});
