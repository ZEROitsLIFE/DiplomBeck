const Router = require('express');
const userRouter = require('./UserRouter')
const typeRouter = require('./TypeRouter')
const serviceRouter = require('./ServiceRouter')
const historyRouter = require('./historyRoute')
const basketRouter = require('./basketRoute')
const infoRouter = require('./UserInfoRouter')


const router = new Router();



router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/service', serviceRouter)
router.use('/history', historyRouter)
router.use('/basket', basketRouter)
router.use('/userinfo', infoRouter)




module.exports = router
