const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/posts');


// Routes Posts
router.post('/', auth, multer, postsCtrl.createPost);
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);


// Routes Comments
router.post('/:id/comments', auth, postsCtrl.commentPost);
router.get('/:id/comments', postsCtrl.getAllComments);
router.get('/comments/:id', postsCtrl.getOneComment);
router.put('/comments/:id', auth, postsCtrl.updateComment);
router.delete('/comments/:id', auth, postsCtrl.deleteComment);


module.exports = router;