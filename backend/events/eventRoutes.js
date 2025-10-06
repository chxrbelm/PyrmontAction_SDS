const express = require('express');
const router = express.Router();
const ctrl = require('./eventController');
const verifyToken = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');

// Public
router.get('/', ctrl.getPublishedEvents);

// Protected
router.post('/', verifyToken, requireRole('Admin', 'ContentManager'), ctrl.createEvent);
router.put('/:id', verifyToken, requireRole('Admin', 'ContentManager'), ctrl.updateEvent);
router.delete('/:id', verifyToken, requireRole('Admin'), ctrl.deleteEvent);

module.exports = router;
