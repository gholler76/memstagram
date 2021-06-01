// set all routes having to do with posts
import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
// set up express as the router
const router = express.Router();

// get all posts route
router.get( '/', getPosts );
router.post( '/', auth, createPost );
router.patch( '/:id', auth, updatePost );
router.delete( '/:id', auth, deletePost );
router.patch( '/:id/likePost', auth, likePost );

export default router;