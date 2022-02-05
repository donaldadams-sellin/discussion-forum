const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    sortOrder: { type: Number, required: true }
});

module.exports = mongoose.model('Topic', topicSchema);