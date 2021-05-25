// set all routes having to do with posts
import express from 'express';

import { getPosts, createPost } from '../controllers/posts.js';

// set up express as the router
const router = express.Router();

// get all posts route
router.get('/', getPosts);
router.post('/', createPost);

export default router;