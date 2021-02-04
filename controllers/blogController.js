const Blog = require('../models/blogs.js');

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render('blogs/index', { title: 'Blogs', blogs: result }))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { title: 'Blog Detail', blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render('blogs/newBlog', { title: 'New Blog' });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_details,
  blog_index,
};
