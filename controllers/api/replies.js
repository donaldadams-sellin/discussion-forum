const Thread = require('../../models/thread');
const User = require('../../models/user');

module.exports = {
    create,
    delete: deleteReply,
    update
}

async function create(req, res) {
    try {
        const thread = await Thread.findById(req.params.id);
        await thread.addReply(req.user._id, req.body.content);
        await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name' } });
        await thread.populate('topic', 'name');
        res.json(thread);
    } catch {
        res.status(400).json('Reply Failed')
    }

}

async function deleteReply(req, res) {
    try {
        // const thread = await Thread.findOne({ 'replies._id': req.params.id });
        // const user = await User.findById(req.user._id);
        // if (user.equals(thread.user) || user.isAdmin) {
        //     await thread.replies.id(req.params.id).remove();
        //     await thread.save();
        // }
        // await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name' } });
        const thread = await Thread.modifyReply(req, true);
        await thread.populate('topic', 'name');
        res.json(thread);
    } catch {
        res.status(400).json('Delete Failed')
    }
}

async function update(req, res){
    try {
        // const thread = await Thread.findOne({ 'replies._id': req.params.id });
        // const user = await User.findById(req.user._id);
        // if (user.equals(thread.user) || user.isAdmin) {
        //     await thread.replies.id(req.params.id).set({content:req.body.content});
        //     await thread.save();
        // }
        // await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name' } });
        const thread = await Thread.modifyReply(req, false);
        await thread.populate('topic', 'name');
        res.json(thread);
    } catch {
        res.status(400).json('Edit Failed')
    }
}