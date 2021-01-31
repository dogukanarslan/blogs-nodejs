const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs.js');

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

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render('index', { title: 'Blogs', blogs: result }))
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { title: 'Blog Detail', blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Redirect
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blog/create', (req, res) => {
  res.render('newBlog', { title: 'New Blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Not found' });
});
