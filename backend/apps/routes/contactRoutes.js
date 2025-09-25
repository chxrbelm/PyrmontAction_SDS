const router = require('express').Router();
const controller = require('../controller/contactController'); // Fixed path
const verifyContactForm = require('../middlewares/verifyContactForm');

router.post('/sendEmail', 
    verifyContactForm.inputValidation,
    controller.sendContactMail
);

module.exports = router;