const projectController = require('./projectController') 
const router = require('express').Router();

router.get('/api/getOpenProjects', function(req, res){
    projectController.openProjects(req, res, req.db);
})

router.get('/api/getClosedProjects', function(req, res){
    projectController.closedProjects(req, res, req.db);
})



router.get('/api/projects/:projectId', function(req, res){
    
    projectController.getIndividualProjects(req.params['projectId'], res, req.db)

})

    


module.exports = router;
