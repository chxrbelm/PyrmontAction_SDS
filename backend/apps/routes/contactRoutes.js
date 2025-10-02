const router = require('express').Router();
const controller = require('../controllers/contactController'); // Fixed path
const validation = require('../validations/contactFormValidation');

router.post('/sendEmail', 
    validation.inputValidation,
    controller.sendContactMail
);

module.exports = router;