const express = require('express');
const router = express.Router();
const topicsCtrl = require('../../controllers/api/topics');
const ensureLoggedIn =require('../../config/ensureLoggedIn');
const checkAdmin =require('../../config/checkAdmin');

//All routes prefixed with /api/topics

//GET request to /api/topics
router.get('/', topicsCtrl.index);

//GET request to show specific topic page
router.get('/:id', topicsCtrl.show);

//POST request to create topic
router.post('/', ensureLoggedIn, checkAdmin, topicsCtrl.create);

//DELETE request to remove topic
router.delete('/:id', ensureLoggedIn, checkAdmin, topicsCtrl.delete)


module.exports = router;