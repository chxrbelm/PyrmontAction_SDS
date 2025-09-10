import api from "../../../services/api"

const contactUsServices = {    
    sendInquiry(contactUsData){
        return api.post("api/sendEmail", contactUsData, "");
    },
    

}

export default contactUsServices;