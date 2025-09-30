const router = require('express').Router();
const controller = require('../controller/authController');
const validation = require('../validations/authValidation');


router.post('/join',
    validation.inputValidatorJoinUs, 
    controller.join);
router.post('/login', validation.inputValidatorLogin, controller.login);

module.exports = router;