const express = require('express');
const router = express.Router();
const ctrl = require('./galleryController');
const verifyToken = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// Public
router.get('/', ctrl.getGallery);

// Protected
router.post('/', verifyToken, requireRole('Admin', 'ContentManager'), ctrl.addImage);
router.delete('/:id', verifyToken, requireRole('Admin'), ctrl.deleteImage);

module.exports = router;
