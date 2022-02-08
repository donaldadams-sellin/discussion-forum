const express = require('express');
const router = express.Router();
const repliesCtrl = require('../../controllers/api/replies');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//routes only prefixed with /api

//POST request to /api/threads/:id/replies to make reply
router.post('/threads/:id/replies', ensureLoggedIn, repliesCtrl.create);

module.exports = router;