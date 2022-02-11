const express = require('express');
const router = express.Router();
const threadsCtrl = require('../../controllers/api/threads');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const checkBan = require('../../config/checkBan');

//all routes prefixed with /api/threads

//GET request to /api/threads/:id
router.get('/:id', threadsCtrl.show);

//POST request to /api/threads to create thread
router.post('/', ensureLoggedIn, checkBan, threadsCtrl.create);

//DELETE request to /api/threads/:id to delete thread
router.delete('/:id', ensureLoggedIn, checkBan, threadsCtrl.delete);

module.exports = router;