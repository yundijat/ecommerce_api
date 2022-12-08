const express = require('express')
const router = express.Router()
const controller = require('./controller')

//getRoutes
router.get(`/`, controller.getAllProduct)
router.get(`/:id`, controller.getOneProduct)

router.post(`/add`, controller.addProduct)
router.patch('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

module.exports = router