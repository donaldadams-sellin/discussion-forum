// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Topic = require('./models/topic');
const Thread = require('./models/thread');

// Local variables will come in handy for holding retrieved documents
