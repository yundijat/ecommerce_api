const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv/config')

const authJwt = require('./src/util/jwtAuth')
//DB Connection
require('./src/config/db')
//routes
const routes = require('./src/routes')

//Allow all request request sent to the node application from a different IP
app.use(cors())
app.options('*', cors())

//Middleware
app.use(express.json())
//Monitor log request sent to the server in 'tiny' format
app.use(morgan('tiny'))
app.use(authJwt())

app.use(routes)


const port = process.env.PORT || 3000
const api = process.env.API_URL

//App Port Listen
app.listen(port, () =>{
    console.log(api)
    console.log(`Server is now running on http://localhost:${port}`)
})
