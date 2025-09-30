import api from "../../../services/api"

const memberServices = {    
    getCurrentUserDetails(token){
        return api.get("api/users/me", token);
    },
    

}

export default memberServices;