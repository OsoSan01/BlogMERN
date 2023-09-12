const Post = require("../models/post");
const User = require('../models/user');
const mongoose = require('mongoose');



//GET ALL POSTS
exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find( {} );
      if (!posts) {
        return res.status(200).send({
          success: false,
          message: "No post Found",
        });
      };
      return res.status(200).send({
        success: true,
        postCount: posts.length,
        message: "All Posts",
        posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error WHile Getting Posts",
        error,
      });
    };
  };

//CREATE A NEW POST
exports.createPost = async(req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation, there most be all input data in order to proced
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide all Fields",
            });
        };
        const existingUser = await User.findById(user);
        //validation
        if(!existingUser){
            return res.status(404).send({
                succes: false,
                message: "Unable to Find User"
            });
        };
        const newPost = new Post({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPost.save({ session });
        existingUser.post.push(newPost);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newPost.save();
        return res.status(201).send({
            succes: true,
            message: "Post Created",
            newPost,
        });
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Creating New Post",
            error
        });
    };
};

//UPDATE A POST BY ITS ID
exports.updatePost = async(req, res) => {
    try {
        //search for a post by its ID
        const { id } = req.params;
        const { title, description, image } = req.body;
        const post = await Post.findByIdAndUpdate(
            id,
            //update and insert into the object the newly changed element
            { ...req.body },
            { new: true }
          );
        return res.status(200).send({
            succes: true,
            message: "Post Updated",
            post,
        });
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Updating Post",
            error
        });
    };
};

//GET ONE POST BY ITS ID
exports.getPostId = async(req, res) => {
    try {
        //look for the id of a post in order to show it
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post){
            return res.status(404).send({
                succes: false,
                message: "Post not found",
            });
        };
        return res.status(200).send({
            succes: true,
            message: "Single post",
            post,
        });
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Getting Requested Post",
            error
        });
    };
};

//DELETE ONE POST
exports.deletePost = async(req, res) => {
    try {
        await Post.findOneAndDelete(req.params.id)
        return res.status(200).send({
            succes: true,
            message: "Post Deleted"
        });
    }catch(error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Deleting the Requested Post",
            error
        });
    };
};