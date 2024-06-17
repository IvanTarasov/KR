const Router = require('express')
const router = new Router()
const producerController = require('../controllers/producerController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('admin'), producerController.create)
router.get('/', producerController.getAll)
router.get('/:id', producerController.getOne)
router.delete('/:id', checkRole('admin'), producerController.deleteOne)

module.exports = router