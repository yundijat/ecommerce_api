const express = require('express')
const router = express.Router()
const controller = require('./controller')



//getRoutes
router.get(`/`, controller.getAllOrder)
router.get(`/:id`, controller.getOneOrder)

router.post('/', controller.addOrder)
router.patch('/status/:id', controller.updateOderStatus)
router.delete('/:id', controller.deleteOrder)


module.exports = router