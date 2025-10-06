const express = require('express');
const router = express.Router();
const ctrl = require('./meetingMinutesController');
const { upload } = require('./upload');
const verifyToken = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// Public
router.get('/', ctrl.listPublic);

// Protected
router.post('/upload', verifyToken, requireRole('Admin'), upload.single('pdf'), ctrl.uploadMinutes);
router.patch('/:id/publish', verifyToken, requireRole('Admin'), ctrl.publishMinutes);

module.exports = router;
