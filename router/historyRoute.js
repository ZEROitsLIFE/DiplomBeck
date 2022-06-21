const Router = require('express');
const historyController = require('../controllers/history-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/create',authMiddleware, checkRoleMidleware('ADMIN'), historyController.create);
router.get('/findAll', historyController.getAll);
// router.post('/findOne/:id', serviceController.getOneService);
router.post('/reservedis', historyController.isReserved);
router.post('/reservednow', historyController.reserved);
router.post('/complitednow', historyController.complited);
router.post('/findByDate', historyController.findByDate);
router.post('/findByService', historyController.findByservice);



module.exports = router
