require('dotenv').config();
require('./config/database');

const Topic = require('./models/topic');

(async function(){

    await Topic.deleteMany({});
    const topics = await Topic.create([
        {name: 'Topic154', description:'Test description should be brief', sortOrder:1},
        {name: 'Topic2534', description:'Test description test test', sortOrder:2},
        {name: 'Topic3435', description:'Test description test', sortOrder:3},
        {name: 'Topic454 Word2', description:'Test description want variable lengths', sortOrder:4},
    ]);
    console.log(topics)

    process.exit();

})();