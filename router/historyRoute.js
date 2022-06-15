const Router = require('express');
const historyController = require('../controllers/history-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/create',checkRoleMidleware('ADMIN'), historyController.create);
router.get('/findAll', historyController.getAll);
// router.post('/findOne/:id', serviceController.getOneService);
router.post('/reserved', historyController.isReserved);



module.exports = router