const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);
router.post('/signupform', usersController.createid);
router.post('/signinform', passport.authenticate('local', { failureRedirect: '/users/signin' }), usersController.checkuser);
router.get('/signout', usersController.destroysession);

module.exports = router;