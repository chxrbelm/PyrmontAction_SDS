const project = require('./projectModel');
module.exports = {
    async openProjects(req, res, db){
        try{
            const openProject = await project.getOpenProjects(db);

            // db.exec(
            //     ` INSERT INTO projects(project_id, project_name, project_description, project_type, project_image, project_date)
            //         VALUES
            //         (0, 'Metro West Station & 31 storey tower development', ' Pyrmont Metro Station (Union St and Pyrmont Bridge Road) is foreshadowed to revitalise the western gateway to the CBD. It is vital that the project also enhances the public amenity for Pyrmont residents and businesses.', 'open', 'image_1.png', '2024-05-15'),
                    
            //         (1, 'Project1', 'Project1', 'open', 'image_1.png', '2024-05-15'),
            //         (2, 'Project2', 'Project2', 'closed', 'image_2.png', '2024-05-15'),
            //         (3, 'Project3', 'Project3', 'planned', 'image_3.png', '2024-05-15'),
            //         (4, 'Project4', 'Project4', 'planned', 'image_4.png', '2024-05-15'),
            //         (5, 'Project5', 'Project5', 'open', 'image_5.png', '2024-05-15'),
            //         (6, 'Project6', 'Project6', 'planned', 'image_6.jpg', '2024-05-15'),
            //         (7, 'Project7', 'Project7', 'closed', 'image_1.png', '2024-05-15'),
            //         (8, 'Project8', 'Project8', 'closed', 'image_6.jpg', '2024-05-15'),
            //         (9, 'Project9', 'Project9', 'open', 'image_3.png', '2024-05-15');



            //      `)
            return res.status(200).json({projects: openProject, type: "open"});

        }
        catch(error){
            return res.status(403).json({error: 'Error with the projects page'});
        }
    },

    async closedProjects(req, res, db){
        try{
            const closedProject = await project.getClosedProjects(db);
            return res.status(200).json({projects: closedProject, type:"closed"});

        }
        catch(error){
            return res.status(403).json({error: 'Error with the projects page'});
        }
    }, 

    async getAllProjects(req, res, db) {
        try{
            const openProject = await project.getOpenProjects(db);
            const closedProject = await project.getClosedProjects(db);
            return res.status(200).json({openProjects: openProject, closedProjects: closedProject, plannedProjects: plannedProject});

        }
        catch(error){
            return res.status(400).json({error: 'Error with the projects page'});
        }
    },

    async getIndividualProjects(project_name, res, db) {
        try{
            const getProjectIndividual = await project.getProject(db, project_name);
            res.status(200).json({project: getProjectIndividual});
        }
        catch(error){
            return res.status(400).json({error: 'Error has occurred when retrieving project'});
        }
    },

    

}