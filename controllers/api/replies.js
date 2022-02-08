const Thread = require('../../models/thread');
const User = require('../../models/user');

module.exports = {
    create,
    delete: deleteReply
}

async function create(req, res) {
    const thread = await Thread.findById(req.params.id);
    await thread.addReply(req.user._id, req.body.content);
    await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name' } });
    res.json(thread);
}

async function deleteReply(req, res) {
    const thread = await Thread.findOne({ 'replies._id': req.params.id });
    const user = await User.findById(req.user._id);
    if (user.equals(thread.user) || user.isAdmin) {
        await thread.replies.id(req.params.id).remove();
        await thread.save();
    }
    await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name' } });
    res.json(thread);
}