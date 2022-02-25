import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/post.js' 

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // update to existing post 
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;