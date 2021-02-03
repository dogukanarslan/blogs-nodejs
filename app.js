const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Redirect
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
});
