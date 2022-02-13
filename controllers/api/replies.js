const Thread = require('../../models/thread');

module.exports = {
    create,
    delete: deleteReply,
    update
}

async function create(req, res) {
    try {
        const thread = await Thread.findById(req.params.id);
        await thread.addReply(req.user._id, req.body.content);
        await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name isAdmin isBanned' } });
        await thread.populate('topic', 'name');
        res.json(thread);
    } catch {
        res.status(400).json('Reply Failed')
    }

}

async function deleteReply(req, res) {
    try {
        const thread = await Thread.modifyReply(req, true);
        res.json(thread);
    } catch {
        res.status(400).json('Delete Failed')
    }
}

async function update(req, res) {
    try {
        const thread = await Thread.modifyReply(req, false);
        res.json(thread);
    } catch {
        res.status(400).json('Edit Failed')
    }
}