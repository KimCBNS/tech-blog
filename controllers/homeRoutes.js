



const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all blogs for the homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err); // Added logging for better debugging
    res.status(500).json({ message: 'Unable to load blogs' });
  }
});

// Route to get the profile page for the logged-in user
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err); // Added logging for better debugging
    res.status(500).json({ message: 'Unable to load profile' });
  }
});

// Route to get the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Route to get a single blog and comments
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name', 'id'] },
        { model: Comment, include: [User] }
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });
    const currentUser = req.session.user;


    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
      currentUser // Make sure req.session.user contains the current user data
    });
  } catch (err) {
    console.error(err); // Added logging for better debugging
    res.status(500).json({ message: 'Unable to load blog' });
  }
});



// build a project id route to use a separate page for editing/updating . This is a duplicate but for now it will work
// Route to get a single blog and comments
router.get('/project/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name', 'id'] },
        { model: Comment, include: [User] }
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });
    const currentUser = req.session.user;


    res.render('update', {
      ...blog,
      logged_in: req.session.logged_in,
      currentUser // Make sure req.session.user contains the current user data
    });
  } catch (err) {
    console.error(err); // Added logging for better debugging
    res.status(500).json({ message: 'Unable to load blog' });
  }
});




module.exports = router;