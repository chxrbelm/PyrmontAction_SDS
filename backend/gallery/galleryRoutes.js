const galleryController = require('./galleryController') 
const router = require('express').Router();

router.get('/api/getAllImages', function(req, res){
    galleryController.getAllGalleryImage(req, res, req.db);
})



module.exports = router;
