const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

// pages
router.get('/', passport.checkAuthentication, homeController.homePage);

module.exports = router;