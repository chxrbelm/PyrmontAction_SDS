import api from "../../../services/api"

const projectsAPI = {    
    viewClosedProjects(){
        return api.get("api/projects/closed", "");
    },
    
    viewOpenProjects(){
        return api.get("api/projects/open", "");
    },
    getIndividualProjects(projectName){
        return api.get("api/projects/" + projectName , "");
    }
}

export default projectsAPI;