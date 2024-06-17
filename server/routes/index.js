const Router = require('express')
const router = new Router()

const itemRouter = require('./itemRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const producerRouter = require('./producerRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/producer', producerRouter)
router.use('/item', itemRouter)

module.exports = router