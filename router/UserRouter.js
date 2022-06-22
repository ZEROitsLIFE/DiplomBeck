const Router = require('express');
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/checkRoleMidleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users',authMiddleware("ADMIN"), userController.getUsers);
router.post('/user-info', userController.getUserInfo);
router.post('/findUser', userController.getUserById);



// 
module.exports = router
