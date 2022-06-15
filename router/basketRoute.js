const Router = require('express');
const basketController = require('../controllers/basket-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/create',checkRoleMidleware('ADMIN'), basketController.create);
router.post('/add',authMiddleware, basketController.add);
router.post('/findAll', basketController.findAllHistoryUser);
router.post('/findUser', basketController.getUserById);



module.exports = router
