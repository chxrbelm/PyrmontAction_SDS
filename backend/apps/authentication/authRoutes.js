const router = require('express').Router();
const controller = require('./authController');
// const authenticator = require('../../middlewares/verifyAuthentication');

router.post('/join', controller.join);
// router.post('/login', controller.login);

module.exports = router;