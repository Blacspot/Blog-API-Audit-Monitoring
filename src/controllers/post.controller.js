const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({ ...req.body, author: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.getPosts = async (req, res) => {
    try {
        const filter = req.user.role === 'admin'
            ? {}
            : { author: req.user.id };
        const posts = await Post.find(filter).populate('author', 'firstName lastName username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'firstName lastName username');
        if (!post) {
            return res.status(404).json({ message: "Post not found"});
        }

        const isOwner = post.author._id.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';
        if(!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) 
            return res.status(404).json({ message: "Post not found"});

            const isOwner = post.author.toString() === req.user.id;
            const isAdmin = req.user.role === 'admin';
            if(!isOwner && !isAdmin) return res.status(403).json({ message: 'Not authorized' });

            const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true});
        
        res.status(200).json({ message: "Post updated successfully", post: updated });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) 
            return res.status(404).json({ message: "Post not found"});
        const isOwner = post.author.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';
        if(!isOwner && !isAdmin) return res.status(403).json({ message: 'Not authorized' });

        await Post.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: "Post deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}