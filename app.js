const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const {requireAuth} = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

// Create an express app
const app = express();

// Connect to mongodb
const url = 'mongodb://127.0.0.1:27017/blogs';
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

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
