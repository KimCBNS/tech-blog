const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      userid: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    // Update the blog post with the provided data
    const updatedBlog = await Blog.update(
      {
        title: req.body.title, // Update title
        contents: req.body.contents, // Update contents
      },
      {
        where: {
          id: req.params.id, // The blog ID from the URL
       
        },
      }
    );
    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (err) {
    res.status(500).json(err); // Send a more specific error status
  }
});






router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        userid: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
