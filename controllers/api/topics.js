const Thread = require('../../models/thread');
const Topic = require('../../models/topic');

module.exports = {
    index,
    show
};

async function index(req, res){
    const topics = await Topic.find({}).sort('sortOrder');
    res.json(topics)
}

async function show(req, res){
    const threads = await Thread.find({topic: req.params.id}).populate('user', 'name');
    res.json(threads)
}