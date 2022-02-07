const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
},{
    timestamps: true
});

module.exports = mongoose.model('Thread', threadSchema)