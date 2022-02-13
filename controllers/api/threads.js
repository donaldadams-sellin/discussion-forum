const Thread = require('../../models/thread');
const User = require('../../models/user');

module.exports = {
    create,
    show,
    delete: deleteThread,
}


async function show(req, res) {
    const thread = await Thread.findById(req.params.id).populate({ path: 'replies', populate: { path: 'user', select: 'name isBanned isAdmin' } }).populate('topic', 'name');
    res.json(thread);
}

async function create(req, res) {
    try {
        const newThread = await Thread.makeThread(req.user._id, req.body.topicId, req.body.title, req.body.content);
        await newThread.populate('user', 'name')
        res.json(newThread);
    } catch (e) {
        console.log(e);
        res.status(400).json('Post Failed');
    }
}

async function deleteThread(req, res) {
    try {
        const thread = await Thread.findById(req.params.id).populate('user');
        const user = await User.findById(req.user._id);
        if (user.equals(thread.user) || user.isAdmin) {
            await thread.delete();
        }
        const threads = await Thread.find({ topic: thread.topic }).populate('user', 'name');
        res.json(threads);
    } catch {
        res.status(400).json('Delete Failed')
    }
}
