const express = require('express');
const newUserAuthController = require('../controllers/newUserAuth_controller');

const router = express.Router();

router.use('/', require('./home'));

router.use('/users', require('./users'));

router.use('/reset-password', require('./resetpass'));

router.get('/verification-mail', newUserAuthController.checkToken);

module.exports = router;