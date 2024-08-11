const router = require('express').Router();
const { Comment } = require('../../models');  // import the comment model


// POST route to add a new comment
router.post('/', async (req, res) => {
  try {
    const { userid, blogid, comments } = req.body;  // 'comments' refers to the field in the Comment model
    
    if (!userid || !blogid || !comments) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    // Create the new comment in the database
    const newComment = await Comment.create({
      userid: userid,  
      blogid: blogid,  
      comments: comments, 
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

module.exports = router;