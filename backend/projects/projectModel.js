module.exports = {
    async getAllProject(db){
        return new Promise((resolve, reject) => {
          query = "SELECT * FROM projects"
          db.all(query, [], (error, result) => {
            if (error) reject("Issues with retrieving all projects: " + error);
            console.log(result);
            resolve(result);
          });
        })
      },

    async getProject(db, project_name){
      return new Promise((resolve, reject) => {
        query = "SELECT project_id, project_name, project_description, project_type, project_image, project_date FROM projects WHERE project_id = ?;"
        db.get(query, [project_name], (error, result) => {
          if (error) reject("Issues with retrieving " + project_name + ": "+ error);
            resolve(result);
          });
        })
      },

      async getOpenProjects(db){
        return new Promise((resolve, reject) => {
          query = "SELECT project_id, project_name, project_description, project_image, project_type, project_date FROM projects WHERE project_type = 'open';"
          db.all(query, [], (error, result) => {
            if (error) reject("Issues with retrieving " + project_name + ": "+ error);
            resolve(result);
          });
        })
      },

      async getClosedProjects(db){
        return new Promise((resolve, reject) => {
          query = "SELECT project_id, project_name, project_description, project_image, project_type, project_date FROM projects WHERE project_type = 'closed';"
          db.all(query, [], (error, result) => {
            if (error) reject("Issues with retrieving " + project_name + ": "+ error);
            resolve(result);
          });
        })
      },



    
};