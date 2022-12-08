const mongoose = require('mongoose')


mongoose.connect(process.env.CONECTION_STRING)
.then(() =>{
    console.log('Database connected')
})
.catch((err) =>{
    console.log(err)
})