const Thread = require('../../models/thread');
const Topic = require('../../models/topic');

module.exports = {
    index,
    detail
};

async function index(req, res){
    const topics = await Topic.find({}).sort('sortOrder');
    res.json(topics)
}

async function detail(req, res){
    const threads = await Thread.find({topic: req.params.id}).populate('user');
    res.json(threads)
}