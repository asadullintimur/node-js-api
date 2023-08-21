const postModel = require('../models/postModel')

const postController = {
    async index(req, res) {
        const { params: { id: postId }} = req;

        const data = await (postId ? postModel.findById(postId) : postModel.find());

        res.sendJson(data);
    },

    async create(req, res) {
        const post = await postModel.create(req.body);

        res.sendJson(post);
    },

    async update(req, res) {
        const { params: { id: postId }, body } = req;

        const post = await postModel.findById(postId);

        const { title, description } = body;

        if (title) post.title = title;
        if (description) post.description = description;

        await post.save();

        res.sendJson(post);
    },

    async delete(req, res) {
        const { params: { id: postId }} = req;

        await postModel.findByIdAndDelete(postId)

        res.sendJson({
            message: `successfully deleted post with ${postId} _id`
        });
    },
}

module.exports = postController;