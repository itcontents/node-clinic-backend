const express = require('express');
const router = express.Router();

// Define a route to get all posts
router.get('/', (req, res) => {
    // Handle logic to fetch and return all posts
    res.json([{ title: 'Post 1' }, { title: 'Post 2' }]);
});

// Define a route to create a new post
router.post('/', (req, res) => {
    // Handle logic to create a new post
    res.json({ message: 'Post created successfully' });
});

// Define a route to get a specific post by ID
router.get('/:postId', (req, res) => {
    const postId = req.params.postId;
    // Handle logic to fetch and return a specific post by ID
    res.json({ title: `Post ${postId}` });
});

module.exports = router;
