const express = require('express');
const router = express.Router();
const topicsCtrl = require('../../controllers/api/topics');

//All routes prefixed with /api/topics

//GET request to /api/topics
router.get('/', topicsCtrl.index);


module.exports =router;