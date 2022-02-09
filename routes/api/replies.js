const express = require('express');
const router = express.Router();
const repliesCtrl = require('../../controllers/api/replies');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//routes only prefixed with /api

//POST request to /api/threads/:id/replies to make reply
router.post('/threads/:id/replies', ensureLoggedIn, repliesCtrl.create);

//DELETE request to /api/replies/:id to delete reply
router.delete('/replies/:id', ensureLoggedIn, repliesCtrl.delete);

//PUT request to /api/replies/:id to edit reply
router.put('/replies/:id', ensureLoggedIn, repliesCtrl.update)

module.exports = router;