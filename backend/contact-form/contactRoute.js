const router = require('express').Router();
const contactForm = require('./contactController');

router.post('/api/sendEmail', function(req, res){
    contactForm.sendContactMail(req, res);
})




module.exports = router;