const express = require('express');
const router = express.Router();
const threadsCtrl = require('../../controllers/api/threads');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//all routes prefixed with /api/threads

//GET request to /api/threads/:id
router.get('/:id', threadsCtrl.show);

//POST request to /api/threads to create thread
router.post('/', ensureLoggedIn, threadsCtrl.create);

//POST request to /api/threads/:id/replies to make reply
router.post('/:id/replies', threadsCtrl.createReply);

module.exports = router;