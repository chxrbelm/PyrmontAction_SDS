const inputValidateContactForm  = require("./contactAuth")
const contactUsForm = require('./contactModel')
inputValidator = require("./contactAuth")


module.exports = {
    async sendContactMail(req, res){
        try{
            await inputValidateContactForm.inputValidateContactForm(req, res);
            const sender = await contactUsForm.createTransporter();
            const email = await contactUsForm.createEmail(req);
            sender.sendMail(email, function (error){
                if(error){
                    console.log(error)
                }
            });
            return res.status(200).json({message: 'Email sent'});

        }
        catch(error){
            return res.status(400).json({message:'Please try again', errors: error});
        }

        

    }
}
