const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("admin"), itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.delete('/:id', checkRole('admin'), itemController.deleteOne)

module.exports = router