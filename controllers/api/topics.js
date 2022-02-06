const Topic = require('../../models/topic');

module.exports = {
    index,
};

async function index(req, res){
    const topics = await Topic.find({}).sort('sortOrder');
    console.log(topics);
    res.json(topics)
}