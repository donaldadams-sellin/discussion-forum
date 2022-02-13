const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Thread = require('./thread');

const topicSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    sortOrder: { type: Number, required: true }
}, {
    timestamps: true
});

topicSchema.pre('remove', async function(next){
    await Thread.deleteMany({topic: this._id})
    next;
})

module.exports = mongoose.model('Topic', topicSchema);