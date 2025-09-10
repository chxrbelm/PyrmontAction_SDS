import api from "../../../services/api"

const projectsAPI = {    
    viewClosedProjects(){
        return api.get("/api/getClosedProjects", "");
    },
    
    viewOpenProjects(){
        return api.get("/api/getOpenProjects", "");
    },
    getIndividualProjects(projectName){
        return api.get("/api/projects/" + projectName ,"");
    }
}

export default projectsAPI;