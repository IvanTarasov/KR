const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole("admin"), typeController.create)
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne)
router.delete('/:id', checkRole('admin'), typeController.deleteOne)

module.exports = router