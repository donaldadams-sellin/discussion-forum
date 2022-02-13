const Thread = require('../../models/thread');
const Topic = require('../../models/topic');

module.exports = {
    index,
    show,
    create,
    delete: deleteTopic
};

async function index(req, res) {
    const topics = await Topic.find({}).sort('sortOrder');
    res.json(topics)
}

async function show(req, res) {
    const threads = await Thread.find({ topic: req.params.id }).sort('-updatedAt').populate('user', 'name isAdmin isBanned');
    res.json(threads);
}

async function create(req, res) {
    try {
        const topic = await Topic.create({ name: req.body.name, description: req.body.description, sortOrder: req.body.sortOrder });
        const topics = await Topic.find({}).sort('sortOrder');
        res.json({ topic, topics });
    } catch {
        res.status(400).json('Topic Creation Failed');
    }
}

async function deleteTopic(req, res) {
    try {
        const topic = await Topic.findById(req.params.id);
        await topic.delete();
        const topics = await Topic.find({}).sort('sortOrder');
        res.json(topics);
    } catch {
        res.status(400).json('Topic Deletion Failed');
    }
}