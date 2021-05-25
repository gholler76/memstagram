// create all handlers for post routes to keep logic out of routes file
import PostMessage from '../models/postMesage.js'

// async function gets all posts, needs await on the function call
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    }
    catch (error) {
        res.status(404).json({ message: error });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(409).json({ message: error });
    };
}