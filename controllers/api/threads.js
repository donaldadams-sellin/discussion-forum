const Thread = require('../../models/thread');
const User = require('../../models/user');

module.exports = {
    create
}

async function create(req, res) {
    const newThread = await Thread.makeThread(req.user._id, req.body.topicId, req.body.title, req.body.content);
    newThread.userName = await User.findById(req.user._id).name;
    res.json(newThread);
}