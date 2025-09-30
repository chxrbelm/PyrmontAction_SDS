const controller = require('../controller/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const { route } = require('./userRoutes');
const router = require('express').Router();

router.get('/me', jwtMiddleware.verifyToken, controller.getCurrentUser); // Get current user's profile

module.exports = router;
