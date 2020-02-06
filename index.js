const express = require('express')
const setupDB = require('./config/databse')
const {userRouter} = require('./app/controllers/usersController')
const router = require('./config/router')

const app = express()
setupDB()
const port = 3025



app.use(express.json())

app.use('/users', userRouter)
app.use('/', router)



app.listen(port, () => {
    console.log('listening on the port', port)
})