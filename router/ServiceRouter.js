const Router = require('express');
const serviceController = require('../controllers/service-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/create',checkRoleMidleware('ADMIN'), serviceController.create);
router.get('/findAll', serviceController.getAll);



module.exports = router
