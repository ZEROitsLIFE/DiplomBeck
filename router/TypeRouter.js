const Router = require('express');
const typeController = require('../controllers/type-controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMidleware = require('../middlewares/checkRoleMidleware');

router.post('/create',checkRoleMidleware('ADMIN'), typeController.create);
router.get('/findAll', typeController.getAll);


module.exports = router
