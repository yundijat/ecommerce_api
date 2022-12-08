const express = require('express')
const router = express.Router()
const controller = require("./controller")

//User Routes
router.get('/', controller.getAllUser)
router.get('/:id', controller.getOneUser)

router.post('/register', controller.userRegister)
router.post('/login', controller.userLogin)

//router.patch('/:id', udateUser route will be added here)
router.delete('/:id', controller.userDelete)



module.exports = router