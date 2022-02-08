const Thread = require('../../models/thread');
const User = require('../../models/user');

module.exports = {
    create, 
    show,
    createReply
}

async function show(req, res){
    const thread = await Thread.findById(req.params.id).populate({path:'replies', populate:{path: 'user', select:'name'}})
    res.json(thread)
}

async function create(req, res) {
    const newThread = await Thread.makeThread(req.user._id, req.body.topicId, req.body.title, req.body.content);
    res.json(newThread);
}

async function createReply(req, res){
    const thread = await Thread.findById(req.params.id);
    await thread.addReply(req.user._id, req.body.content);
    await thread.populate({path:'replies', populate:{path: 'user', select:'name'}});
    res.json(thread);
}