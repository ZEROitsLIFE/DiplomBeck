const Router = require('express');
const historyController = require('../controllers/history-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/create',authMiddleware, checkRoleMidleware('ADMIN'), historyController.create);
router.get('/findAll', historyController.getAll);
// router.post('/findOne/:id', serviceController.getOneService);
router.post('/reserved', historyController.isReserved);
router.post('/reservednow', historyController.reserved);



module.exports = router
