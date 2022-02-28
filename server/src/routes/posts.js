import express from 'express';

import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/post.js' 
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); // update to existing post 
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;