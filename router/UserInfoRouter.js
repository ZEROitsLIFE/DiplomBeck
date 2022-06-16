const Router = require('express');
const infoController = require('../controllers/user-info-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
// const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/getPhone', infoController.chekPhone);
router.post('/changeUserInfo',authMiddleware, infoController.chekPhone);


module.exports = router
