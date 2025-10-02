const galleryController = require('../controllers/galleryController'); // Fixed path
const router = require('express').Router();

router.get('/', galleryController.getAllGalleryImage)

module.exports = router;
