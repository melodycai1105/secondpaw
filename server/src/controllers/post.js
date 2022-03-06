// handlers
import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page, sortType } = req.query;
    console.log(req.query);
    try {
        console.log(sortType);
        const LIMIT = 8; //number of posts per page
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
        const total = await PostMessage.countDocuments({});

        let searchTerm = { _id: -1 };
        switch (sortType) {
            case "Sort By Price":
                searchTerm = { price: -1 };
                break;
            case "Sort By Popularity":
                searchTerm = { likeCount: -1 };
        }

        // let searchTerm = sortType === "Sort By Price" ? { likeCount: -1 } : { _id: -1 };
        const posts = await PostMessage.find().sort(searchTerm).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const makePurchase = async (req, res) => {
    const userId = req.query.uid;
    const postId = req.query.pid;
    try {
        const post = await PostMessage.findById(postId);
        post.buyer = userId;
        await PostMessage.findByIdAndUpdate(postId, post);
        const user = await User.findById(userId);
        user.purchased.push(postId);
        await User.findByIdAndUpdate(userId, user);
        res.status(200).json({ data: post });
    }
    catch (error) {
        res.status(413).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const { name, email, phone, posts } = await User.findById(id);
        res.status(200).json({ name, email, phone, posts })
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

        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { posts } = await User.findById(id);
        const postsobj = await PostMessage.find({ '_id': { $in: posts } });
        res.status(200).json({ data: postsobj })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        const { _id } = await newPost.save();
        const userUpdated = await User.findById(req.userId);
        userUpdated.posts.push(_id);
        await User.findByIdAndUpdate(req.userId, userUpdated)
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

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with that id ${id}`);
    }
    await PostMessage.findByIdAndRemove(id);
    const userUpdated = await User.findById(userId);
    userUpdated.posts = userUpdated.posts.filter((postid) => postid !== id)
    await User.findByIdAndUpdate(userId, userUpdated);

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
        post.likeCount = post.likes.length;
        console.log(post.likeCount)
        console.log(post.likes.length)
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
