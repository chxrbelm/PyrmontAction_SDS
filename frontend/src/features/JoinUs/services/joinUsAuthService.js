import api from "../../../services/api"


const joinUsAuthenticationService = {
    joinus(userDetails){
        return api.post("api/authentication/join", userDetails, "")
    }
}

export default joinUsAuthenticationService;