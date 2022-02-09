const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./user');

const replySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true }
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
    toJSON:{
        virtuals: true
    },
    toObject:{virtuals: true}
});

//creates new thread from request
threadSchema.statics.makeThread = function(userId, topicId, title, content){
   return this.create({
        user: userId,
        topic: topicId,
        title: title,
        replies: [{user:userId, content:content}]
    });
}

//creates new reply to specific thread based on request
threadSchema.methods.addReply = async function(userId, content){
    this.replies.push({user:userId, content: content});
    await this.save();
    return this;
    
}

module.exports = mongoose.model('Thread', threadSchema)