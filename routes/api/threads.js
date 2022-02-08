const express = require('express');
const router = express.Router();
const threadsCtrl = require('../../controllers/api/threads');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//all routes prefixed with /api/threads

//GET request to /api/threads/:id
router.get('/:id', threadsCtrl.show);

//POST request to /api/threads
router.post('/', ensureLoggedIn, threadsCtrl.create);

module.exports = router;