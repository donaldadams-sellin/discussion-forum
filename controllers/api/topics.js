const Thread = require('../../models/thread');
const Topic = require('../../models/topic');

module.exports = {
    index,
    detail
};

async function index(req, res){
    const topics = await Topic.find({}).sort('sortOrder');
    console.log(topics);
    res.json(topics)
}

async function detail(req, res){
    const threads = await Thread.find({id: req.body.id})
    console.log(threads);
    res.json(threads)
}