// handlers
import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8; //number of posts per page
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const { name, email, phone, postsid } = await User.findById(id);
        const posts = await PostMessage.find().where('_id').in(postsid)
        res.json({ name, email, phone, posts })
    }
    catch (error) {
        res.status(418).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        const { _id } = await newPost.save();
        //console.log(req.userId)
        const userobj = await User.findById(req.userId);
        userobj.posts.push(_id);
        console.log(userobj)
        res.status(201).json(newPost);
    }
    catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
    // res.send("Post Created");
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate( id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with that id ${id}`);
    }
    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Not logged in!" });
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export default router;
