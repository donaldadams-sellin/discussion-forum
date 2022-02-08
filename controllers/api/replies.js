const Thread = require('../../models/thread');

module.exports ={
    create
}

async function create(req, res){
    const thread = await Thread.findById(req.params.id);
    await thread.addReply(req.user._id, req.body.content);
    await thread.populate({path:'replies', populate:{path: 'user', select:'name'}});
    res.json(thread);
}