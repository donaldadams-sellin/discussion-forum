const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const replySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, maxlength: 5000 }
}, {
    timestamps: true
});

const threadSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    title: { type: String, required: true, maxLength: 50 },
    replies: [replySchema]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: { virtuals: true }
});

//creates new thread from request
threadSchema.statics.makeThread = async function (userId, topicId, title, content) {
    return this.create({
        user: userId,
        topic: topicId,
        title: title,
        replies: [{ user: userId, content: content }]
    });
}

//either deletes or edits reply, depending on del parameter
threadSchema.statics.modifyReply = async function (req, del) {
    const thread = await this.findOne({ 'replies._id': req.params.id });
    const user = await User.findById(req.user._id);
    if (user.equals(thread.replies.id(req.params.id).user) || user.isAdmin) {
        console.log('test2');
        if (del) {
            await thread.replies.id(req.params.id).remove();
            if (thread.replies.length === 0) {
                await thread.delete();
                return null;
            }
        } else {
            await thread.replies.id(req.params.id).set({ content: req.body.content });

        }
        await thread.save();
    }
    await thread.populate({ path: 'replies', populate: { path: 'user', select: 'name isAdmin isBanned' } });
    await thread.populate('topic', 'name');
    return thread;
}

//creates new reply to specific thread based on request
threadSchema.methods.addReply = async function (userId, content) {
    this.replies.push({ user: userId, content: content });
    await this.save();
    return this;

}

module.exports = mongoose.model('Thread', threadSchema)