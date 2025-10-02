const controller = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = require('express').Router();

router.get('/me', jwtMiddleware.verifyToken, controller.getCurrentUser); // Get current user's profile

module.exports = router;
