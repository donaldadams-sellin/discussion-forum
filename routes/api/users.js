const express = require('express');
const router = express.Router();
const usersCtrl =require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//POST to /api/users
router.post('/', usersCtrl.create);

//POST to /api/users/login
router.post('/login', usersCtrl.login);

//GET request to /api/users/:id/ban for admin banning user
router.get('/:id/ban', ensureLoggedIn, usersCtrl.ban);

module.exports = router;