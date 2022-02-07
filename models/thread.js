const mongoose = require('mongoose');
const topic = require('./topic');
const Schema = mongoose.Schema;
const User = require('./user');

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

threadSchema.statics.makeThread = function(userId, topicId, title, content){
   return this.create({
        user: userId,
        topic: topicId,
        title: title,
        replies: [{user:userId, content:content}]
    });
}

module.exports = mongoose.model('Thread', threadSchema)