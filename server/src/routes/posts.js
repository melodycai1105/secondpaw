import express from 'express';
import { getPostsBySearch, getPost, getPosts, createPost, updatePost, deletePost, likePost, commentPost, getUser, getPostsByUser } from '../controllers/post.js' 
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/profile/:id', getUser);
router.get('/userid/:id', getPostsByUser);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); // update to existing post 
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;