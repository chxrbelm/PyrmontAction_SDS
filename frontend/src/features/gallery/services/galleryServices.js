import api from "../../../services/api"


const galleryServices = {
    getAllImages(){
        return api.get("api/getAllImages", "")
    }
}

export default galleryServices;