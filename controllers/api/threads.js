const Thread = require('../../models/thread');
const User = require('../../models/user');

module.exports = {
    create, 
    show
}

async function show(req, res){
    const thread = await Thread.findById(req.params.id).populate({path:'replies', populate:{path: 'user', select:'name'}})
    res.json(thread)
}

async function create(req, res) {
    const newThread = await Thread.makeThread(req.user._id, req.body.topicId, req.body.title, req.body.content);
    res.json(newThread);
}