const express = require('express')
const router = express.Router()
require('dotenv/config')

const api = process.env.API_URL

const userRoutes = require('../domains/users')
const productRouter = require('../domains/products')
const oderRouter = require('../domains/orders')

router.use(`${api}/user`, userRoutes)
router.use(`${api}/product`, productRouter)
router.use(`${api}/order`, oderRouter)



module.exports = router